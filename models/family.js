"use strict";

let mongoose = require('mongoose'),
    request = require('request'),
    t = require('transducers-js'),
    sequence = require('../utils/sequence'),
    unary = require('lodash/unary'),
    flatten = require('lodash/flatten'),
    compose = require('lodash/flowRight'),
    get = require('lodash/fp').get,
    uniqBy = require('lodash/fp').uniqBy;

const map = t.map,
      filter = t.filter,
      into = t.into;
      
const ACS_USERNAME = process.env.ACS_USERNAME,
      ACS_PASSWORD = process.env.ACS_PASSWORD,
      ACS_SITENUMBER = process.env.ACS_SITENUMBER,
      BASE = `https://secure.accessacs.com/api_accessacs_mobile/v2/${ACS_SITENUMBER}`,
      LETTERS = sequence(97, 122).map(unary(String.fromCharCode));

let schema = new mongoose.Schema({
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
// upsert all members
// find any members without a family, create one

function fetch(url, query) {
  console.log(`Starting fetch for ${query.q}`);
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

function verifyResponse(response) {
  let body = response.body;
  let valid = body
    && body.Page
    && typeof body.Page.length === 'number'
    && typeof body.PageCount === 'number';
  if (!valid) {
    throw new Error('ACS API response body was not as expected.', body);
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
    ).then(verifyResponse))
  ]);
}

function extractData(bodies) {
  return bodies.reduce((data, aggregate) => {
    return data.concat(aggregate.body.Page);
  }, []);
}

function gatherIndividuals() {
  return Promise.all(LETTERS.map(q => 
    fetch(`${BASE}/individuals`, { pageSize: 500, q })
      .then(verifyResponse)
      .then(aggregatePages).then(x => (console.log(`got all for ${q}`), x))
      .then(extractData)
    )).then(compose(uniqBy('IndvId'), flatten))
      .catch(get('stack'));
}

schema.statics.scrape = function() {
  console.log('Starting individuals scrape...');
  gatherIndividuals().then(individuals => {
    console.log(individuals.find(i => i.IndvId === 5304))
    console.log(individuals.length);
  });
  // let VideoAlbum = this;
  // return fetch(`${BASE}/individuals`, { pageSize: 500, q:  })
  //   .then(verifyResponse)
  //   .then(aggregatePages)
  //   .then(extractData)
  //   .then(albums => {
  //     let upserted = Promise.all(
  //       into([], comp(
  //         filter(isValidAlbum),
  //         map(pickAlbumFields),
  //         map(upsert.bind(VideoAlbum))
  //       ), albums)
  //     );
  //     
  //     let removed = remove(albums, VideoAlbum);
  //     return Promise.all([upserted, removed]);
  //   }).then(resolutions => {
  //     let albums = resolutions[0];
  //     return Promise.all(albums.map(a => {
  //       return getVideos(a).then(associateVideos.bind(this, a));
  //     }));
  //   });
};

module.exports = mongoose.models.Family || mongoose.model('Family', schema);
