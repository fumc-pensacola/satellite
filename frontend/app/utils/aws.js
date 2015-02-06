/* global AWS */

export default {
  init: function (token) {
    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::885099591831:role/content-managers',
      ProviderId: 'www.amazon.com',
      WebIdentityToken: token
    });
  },

  s3: new AWS.S3({
    params: {
      Bucket: 'fumcappfiles'
    }
  })
};
