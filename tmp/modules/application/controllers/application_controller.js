Fumc.ApplicationController = Ember.Controller.extend({

  token: Cookies.get('token'),
  name: Cookies.get('name'),
  email: Cookies.get('email'),

  init: function () {
    this.setupAWS();
  },

  tokenChanged: function () {
    Cookies.set('token', this.get('token'), { expires: 3600 });
    Cookies.set('name', this.get('name'));
    Cookies.set('email', this.get('email'));
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
