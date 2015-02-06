/* global Cookies */

import Ember from 'ember';

export default Ember.Controller.extend({

  token: Cookies.get('token') === 'null' ? null : Cookies.get('token'),
  name: Cookies.get('name') === 'null' ? null : Cookies.get('name'),
  email: Cookies.get('email') === 'null' ? null : Cookies.get('email'),

  loggedIn: function () {
    return this.get('token') && this.get('name') && this.get('email');
  }.property('token', 'name', 'email'),

  init: function () {
    this.setupAWS();
  },

  tokenChanged: function () {
    Cookies.set('token', this.get('token'), { expires: 3600 });
    Cookies.set('name', this.get('name'), { expires: 3600 });
    Cookies.set('email', this.get('email'), { expires: 3600 });
    this.setupAWS();
  }.observes('token'),

  setupAWS: function () {
    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::885099591831:role/content-managers',
      ProviderId: 'www.amazon.com',
      WebIdentityToken: this.get('token')
    });

    Fumc.s3 = new AWS.S3({
      params: {
        Bucket: 'fumcappfiles'
      }
    });
  },

  actions: {
    logout: function () {
      amazon.Login.logout();
      this.set('token', null);
      this.set('name', null);
      this.set('email', null);
      Cookies.expire('token');
      Cookies.expire('name');
      Cookies.expire('email');
      this.transitionToRoute('index');
    }
  }

});
