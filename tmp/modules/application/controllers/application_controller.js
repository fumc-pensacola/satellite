Fumc.ApplicationController = Ember.Controller.extend({

  token: localStorage.token,
  name: localStorage.name,
  email: localStorage.email,

  init: function () {
    this.setupAWS();
  },

  tokenChanged: function () {
    localStorage.token = this.get('token');
    localStorage.name = this.get('name');
    localStorage.email = this.get('email');
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
  }

});
