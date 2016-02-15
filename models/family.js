"use strict";

let mongoose = require('mongoose'),
    request = require('request'),
    Stream = require('highland'),
    sequence = require('../utils/sequence'),
    unary = require('lodash/unary'),
    flatten = require('lodash/flatten'),
    compose = require('lodash/flowRight'),
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
  members: { type: [mongoose.Schema.Types.ObjectId], ref: 'Member' },
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
  }]
});

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
  return new Promise((resolve, reject) => {
    console.log('Removing any members not in the list...');
    Member
      .find()
      .where('acsId')
      .nin(individuals.map(get('IndvId')))
      .remove()
      .exec(err => {
        if (err) return reject(err);
        resolve(individuals);
      });
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

const listedNotDeleted = x => x.Listed && !x.Delete;
function toMember(individual) {
  return {
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
      value: p.PhoneNumber
    })),
    emails: individual.Emails.filter(listedNotDeleted).map(e => ({
      label: e.EmailType,
      value: e.Email
    }))
  };
}

function toFamily(member) {
  return { acsId: member.acsFamilyId };
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

function upsertMember(member) {
  return new Promise((resolve, reject) => {
    console.log(`Saving ${member.firstName} ${member.lastName}...`);
    let query = { acsId: member.acsId };
    let options = { upsert: true, new: true };
    Member.findOneAndUpdate(query, member, options, (err, record) => {
      if (err) return reject(err);
      resolve(record);
    });
  });
}

function upsertFamily(family) {
  return new Promise((resolve, reject) => {
    console.log(`Saving family with ${family.members.length} members...`);
    Family.update({ acsId: family.acsId }, family, { upsert: true }, err => {
      if (err) return reject(err);
      console.log(`Saved family ${family.acsId}.`);
      resolve(family);
    });
  });
}

function removeEmptyFamilies() {
  return new Promise((resolve, reject) => {
    Family.find().where('members').equals([]).remove().exec(err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

schema.statics.scrape = () => {
  let startTime = Date.now();
  console.log('Starting individuals scrape...');
  let logErrorStack = compose(console.error, get('stack'));
  
  gatherIndividuals().then(_individuals => {
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
          .map(toFamily)
          .uniqBy(getIdOfArgs(eq))
          .map(withMembers(members))
          .map(withAddresses(addresses))
          .map(upsertFamily)
          .map(Stream).merge()
          .errors(logErrorStack)
          .done(() => {
            removeEmptyFamilies()
              .then(() => console.log(`Finished scraping directory info after ${Math.round((Date.now() - startTime) / 1000 / 60)} minutes.`))
              .catch(logErrorStack);
          });
      });
  }).catch(logErrorStack);
};

const Family = mongoose.models.Family || mongoose.model('Family', schema);
module.exports = Family;