"use strict";

let mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    request = require('request'),
    Stream = require('highland'),
    hash = require('object-hash'),
    tryFormatPhone = require('../utils/try-format-phone'),
    toString = require('lodash/toString'),
    sequence = require('../utils/sequence'),
    unary = require('lodash/unary'),
    flatten = require('lodash/flatten'),
    compose = require('lodash/flowRight'),
    identity = require('lodash/identity'),
    get = require('lodash/fp').get,
    uniqBy = require('lodash/fp').uniqBy,
    not = require('lodash/fp').negate,
    eq = require('lodash/fp').eq,
    overArgs = require('lodash/fp').overArgs,
    Member = require('./member');

const ACS_USERNAME = process.env.ACS_USERNAME,
      ACS_PASSWORD = process.env.ACS_PASSWORD,
      ACS_SITENUMBER = process.env.ACS_SITENUMBER,
      RATELIMIT = process.env.MEMBER_REQUEST_RATELIMIT,
      BASE = `https://secure.accessacs.com/api_accessacs_mobile/v2/${ACS_SITENUMBER}`,
      LETTERS = sequence(97, 122).map(unary(String.fromCharCode));

let schema = new mongoose.Schema({
  acsId: { type: Number, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  photo: String,
  addresses: [{
    label: String,
    country: String,
    company: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String
  }],
  isDeleted: { type: Boolean, required: true, default: false },
  hash: { type: String, required: true }
});

schema.plugin(timestamps);

// get all pages for /individuals?q=A
// add each member to a list
// repeat for B-Z
// delete any database members not in the list
// delete any empty families
// get member details for each member and upsert
// find any members without a family, create one

function fetch(url, query) {
  return new Promise((resolve, reject) => {
    request(url, {
      json: true,
      auth: {
        user: ACS_USERNAME,
        pass: ACS_PASSWORD
      },
      qs: query
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve({ url, query, body });
    });
  });
}

function verifyFamilyResponse(response) {
  let body = response.body;
  let valid = body
    && body.Page
    && typeof body.Page.length === 'number'
    && typeof body.PageCount === 'number';
  if (!valid) {
    throw new Error('ACS API individual query response body was not as expected.', body);
  }

  return response;
}

function aggregatePages(response) {
  let body = response.body,
      otherPages = sequence(1, body.PageCount - 1);

  return Promise.all([
    response,
    ...otherPages.map(pageIndex => fetch(
      response.url,
      Object.assign({}, response.query, { pageIndex })
    ).then(verifyFamilyResponse))
  ]);
}

function extractData(bodies) {
  return bodies.reduce((data, aggregate) => {
    return data.concat(aggregate.body.Page);
  }, []);
}

function gatherIndividuals() {
  return new Promise((resolve, reject) => {
    Stream(LETTERS).ratelimit(1, RATELIMIT).map(q =>
      fetch(`${BASE}/individuals`, { pageSize: 500, q })
        .then(verifyFamilyResponse)
        .then(aggregatePages)
        .then(extractData)
    ).map(Stream).merge().stopOnError(reject).toArray(resolve)
  }).then(compose(uniqBy('IndvId'), flatten));
}

function purgeMembers(individuals) {
  console.log('Removing any members not in the list...');
  return Member.find({
    isDeleted: false,
    acsId: { $nin: individuals.map(get('IndvId')) }
  }).update({
    isDeleted: true
  }).exec().then(() => {
    return individuals;
  });
}

function verifyIndividualResponse(response) {
  let body = response.body;
  let valid = body
    && body.IndvId
    && body.FirstName
    && body.LastName; // that seems like enough

  if (!valid) {
    throw new Error('ACS API individual details response was not as expected.', body);
  }

  return response;
}

function getIndividualDetails(individual) {
  console.log(`Getting details for ${individual.FirstName} ${individual.LastName}...`)
  return fetch(`${BASE}/individuals/${individual.IndvId}`).then(
    verifyIndividualResponse
  );
}

function isNotUnlisted(individual) {
  let records = individual.Phones.concat(individual.Emails);
  return !(records.length && records.every(x => x.Listed === false));
}

const listedNotDeleted = x => x.Listed && !x.Delete;
function toMember(individual) {
  let member = {
    acsId: individual.IndvId,
    acsFamilyId: individual.PrimFamily,
    firstName: individual.FirstName,
    lastName: individual.LastName,
    title: individual.Title,
    suffix: individual.Suffix,
    goesBy: individual.GoesbyName,
    isChild: individual.FamilyPosition === 'Child',
    phones: individual.Phones.filter(listedNotDeleted).map(p => ({
      label: p.PhoneType,
      value: tryFormatPhone(p.PhoneNumber)
    })),
    emails: individual.Emails.filter(listedNotDeleted).map(e => ({
      label: e.EmailType,
      value: e.Email
    })),
    isDeleted: false
  };
  member.hash = hash.sha1(member);
  return member;
}

function toFamily(member) {
  return { acsId: member.acsFamilyId, isDeleted: false };
}

const withMembers = members => family => Object.assign({}, family, {
  members: members.filter(compose(
    eq(family.acsId),
    get('acsFamilyId')
  )).map(get('_id'))
});

const withAddresses = addresses => family => Object.assign({}, family, {
  addresses: addresses[family.acsId].filter(not(get('Delete'))).map(a => ({
    label: a.AddrType,
    country: a.Country,
    company: a.Company,
    street1: a.Address,
    street2: a.Address2,
    city: a.City,
    state: a.State,
    zip: a.Zipcode
  }))
});

const withHash = family => Object.assign({}, family, {
  hash: hash(family, {
    algorithm: 'sha1',
    replacer: x => {
      if (x instanceof mongoose.Types.ObjectId) {
        return x.toString();
      }
      return x;
    }
  })
});

function upsertMember(member) {
  console.log(`Saving ${member.firstName} ${member.lastName}...`);
  let query = { acsId: member.acsId };
  let options = { upsert: true, new: true };
  return Member.findOne(query).exec().then(m => {
    if (m && m.hash === member.hash) return m;
    return Member.findOneAndUpdate(query, member, options).exec();
  });
}

function upsertFamily(family) {
  console.log(`Saving family with ${family.members.length} members...`);
  let query = { acsId: family.acsId };
  return Family.findOne(query).exec().then(f => {
    if (f && f.hash === family.hash) return family;
    return Family.update(query, family, { upsert: true }).exec().then(() => {
      console.log(`Saved family ${family.acsId}.`);
      return family;
    });
  });
}

function removeEmptyFamilies() {
  return Family.find({
    isDeleted: false
  }).populate({
    path: 'members',
    match: { isDeleted: false }
  }).exec().then(families => {
    return Promise.all(families
      .filter(f => !f.members.length)
      .map(f => {
        f.isDeleted = true;
        return f.save();
      })
    )
  });
}

schema.statics.scrape = () => {
  let startTime = Date.now();
  console.log('Starting individuals scrape...');
  let logErrorStack = compose(console.error, get('stack'));

  return gatherIndividuals().then(_individuals => {
    return new Promise((resolve, reject) => {
      console.log('Finished getting individuals overview.');
      console.log('Getting detailed information about each individual...');
      let individuals = Stream(_individuals);
      let rateLimited = individuals.ratelimit(1, RATELIMIT);

      purgeMembers(_individuals)
        .then(() => console.log('Finished removing any extraneous members.'))
        .catch(logErrorStack)

      let detailedIndividuals = rateLimited
        .map(getIndividualDetails)
        .map(Stream).merge()
        .map(get('body'));

      let addresses = {};
      detailedIndividuals
        .filter(isNotUnlisted)
        .tap(i => addresses[i.PrimFamily] = i.Addresses)
        .map(toMember)
        .map(upsertMember)
        .map(Stream).merge()
        .errors(logErrorStack)
        .toArray(members => {
          console.log('Finished saving members.');
          let getId = get('acsId');
          let getIdOfArgs = overArgs([getId, getId]);
          Stream(members)
            .filter(identity)
            .map(toFamily)
            .uniqBy(getIdOfArgs(eq))
            .map(withMembers(members))
            .map(withAddresses(addresses))
            .map(withHash)
            .map(upsertFamily)
            .map(Stream).merge()
            .errors(logErrorStack)
            .done(() => {
              removeEmptyFamilies()
                .then(() => console.log(`Finished scraping directory info after ${Math.round((Date.now() - startTime) / 1000 / 60)} minutes.`))
                .then(resolve)
                .catch(logErrorStack);
            });
        });
    }).catch(logErrorStack);
  });
};

const Family = mongoose.models.Family || mongoose.model('Family', schema);
module.exports = Family;
