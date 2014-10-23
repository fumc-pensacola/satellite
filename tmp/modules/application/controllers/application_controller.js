Fumc.ApplicationController = Ember.Controller.extend({

  token: localStorage.token,
  name: localStorage.name,
  email: localStorage.email,

  tokenChanged: function() {
    localStorage.token = this.get('token');
    localStorage.name = this.get('name');
    localStorage.email = this.get('email');

    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::885099591831:role/content-managers',
      ProviderId: 'www.amazon.com',
      WebIdentityToken: this.get('token')
    });
    AWS.config.region = 'us-east-1';

    Fumc.s3 = new AWS.S3({
      params: {
        Bucket: 'fumcappfiles'
      }
    });

  }.observes('token')

});
