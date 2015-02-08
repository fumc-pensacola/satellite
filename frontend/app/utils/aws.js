/* global AWS */
var s3 = new AWS.S3({
  params: {
    Bucket: 'fumcappfiles'
  }
});

export default {
  setup: function (token) {
    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::885099591831:role/content-managers',
      ProviderId: 'www.amazon.com',
      WebIdentityToken: token
    });

    s3.config.credentials = AWS.config.credentials;

  },

  s3: s3
};
