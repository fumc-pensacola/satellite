"use strict";

let mongoose = require('mongoose'),
    request = require('request'),
    t = require('transducers-js'),
    sequence = require('../utils/sequence'),
    Video = require('./video');

const TOKEN = process.env.VIMEO_TOKEN;
const BASE = process.env.VIMEO_API_BASE;
const map = t.map,
      filter = t.filter,
      comp = t.comp,
      into = t.into;

let schema = new mongoose.Schema({
  name: { type: String, required: true },
  uri: { type: String, required: true },
  description: String,
  link: { type: String, required: true },
  videosURI: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  visible: { type: String, required: true, default: true },
  featured: { type: String, required: true, default: false }
});

function fetch(url, token, query) {
  return new Promise((resolve, reject) => {
    request.get({
      url: url,
      json: true,
      auth: { bearer: token },
      qs: query
    }, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      
      resolve({ url, token, query, body });
    });
  });
}

function verifyResponse(response) {
  let body = response.body;
  let valid = body
    && body.data
    && typeof body.data.length === 'number'
    && body.paging;
  if (!valid) {
    throw new Error('Vimeo API response body was not as expected.');
  }

  return response;
}

function aggregatePages(response) {
  let body = response.body,
      otherPages = sequence(2, Math.ceil(body.total / body.per_page));

  return Promise.all([
    response
  ].concat(otherPages.map(page => {
    return fetch(
      response.url,
      response.token,
      Object.assign({}, response.query, { page })
    ).then(verifyResponse);
  })));
}

function extractData(bodies) {
  return bodies.reduce((data, aggregate) => {
    return data.concat(aggregate.body.data);
  }, []);
}

function isValidAlbum(album) {
  return album.privacy
    && album.privacy.view === 'anybody'
    && album.metadata
    && album.metadata.connections
    && album.metadata.connections.videos
    && album.metadata.connections.videos.uri;
}

function isValidVideo(video) {
  return video.privacy
    && video.privacy.view === 'anybody'
    && video.status === 'available'
    && video.files.some(f => f.quality === 'hd' && f.link);
}

function pickAlbumFields(album) {
  return {
    name: album.name,
    description: album.description,
    uri: album.uri,
    link: album.link,
    videosURI: album.metadata.connections.videos.uri
  };
}

function pickVideoFields(video) {
  return {
    name: video.name,
    date: video.created_time,
    description: video.description,
    uri: video.uri,
    link: video.link,
    duration: video.duration,
    width: video.width,
    height: video.height,
    pictures: video.pictures.sizes,
    fileHD: video.files.find(f => f.quality === 'hd').link
  };
}

function getVideos(album) {
  return fetch(BASE + album.videosURI, TOKEN, { "per_page": 50 })
    .then(verifyResponse)
    .then(aggregatePages)
    .then(extractData)
    .then(videos => {
      return Promise.all(
        into([], comp(
          filter(isValidVideo),
          map(pickVideoFields),
          map(upsert.bind(Video))
        ), videos)
      );
    });
}

function associateVideos(album, videos) {
  return new Promise((resolve, reject) => {
    album.videos = videos.map(v => v._id);
    album.save(err => {
      if (err) {
        return reject(err);
      }
      
      resolve(album);
    });
  });
}

function upsert(doc) {
  let Model = this,
      query = { uri: doc.uri },
      options = { upsert: true, new: true };
      
  return new Promise((resolve, reject) => {
    Model.findOneAndUpdate(query, doc, options, (err, record) => {
      if (err) {
        return reject(err);
      }

      resolve(record);
    });
  });
}

function remove(docs, Model) {
  return new Promise((resolve, reject) => {
    Model.find()
      .where('uri').nin(docs.map(d => d.uri))
      .remove().exec(err => {
        if (err) {
          return reject(err);
        }
        
        resolve(docs);
      });
  });
}

schema.statics.scrape = function() {
  let VideoAlbum = this;
  return fetch(`${BASE}/me/albums`, TOKEN)
    .then(verifyResponse)
    .then(aggregatePages)
    .then(extractData)
    .then(albums => {
      let upserted = Promise.all(
        into([], comp(
          filter(isValidAlbum),
          map(pickAlbumFields),
          map(upsert.bind(VideoAlbum))
        ), albums)
      );
      
      let removed = remove(albums, VideoAlbum);
      return Promise.all([upserted, removed]);
    }).then(resolutions => {
      let albums = resolutions[0];
      return Promise.all(albums.map(a => {
        return getVideos(a).then(associateVideos.bind(this, a));
      }));
    });
};

module.exports = mongoose.models.VideoAlbum || mongoose.model('VideoAlbum', schema);
