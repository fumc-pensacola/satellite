import Ember from 'ember';
import AWS from '../utils/aws';

export default Ember.Object.extend({

  name: '',
  size: "0 KB",
  rawSize: 0,
  fileToUpload: null,
  uploadJqXHR: null,
  uploadPromise: null,
  uploadProgress: null,
  isUploading: false,
  didUpload: false,
  base64Image: null,

  init: function() {
    this._super();
    Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
    this.set('uploadPromise', new Ember.RSVP.defer());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');
    var isImage = fileToUpload.type.indexOf('image') === 0;

    if (isImage) {
      var reader = new FileReader();
      reader.onload = function(e) {
        self.set('base64Image', e.target.result);
      };

      // Read in the image file as a data URL.
      reader.readAsDataURL(fileToUpload);
    }

    this.set('name', fileToUpload.name);
    this.set('rawSize', fileToUpload.size);
    // this.set('size', App.humanReadableFileSize(fileToUpload.size));

  }.on('init'),

  uploadFile: function() {
    if (this.get('isUploading') || this.get('didUpload') || this.get('didError')) {
      return this.get('uploadPromise');
    }

    var fileToUpload = this.get('fileToUpload');
    var self = this;

    this.set('isUploading', true);
    var key = this.get('name').replace(/(\..+?)$/, '_' + Date.now() + '$1');

    AWS.s3.putObject({
      Key: key,
      ContentType: fileToUpload.type,
      CacheControl: 'max-age=31536000',
      Body: fileToUpload
    }, function (err, data) {
      if (err) {
        self.set('isUploading', false);
        self.set('didError', true);
        self.get('uploadPromise').reject(err);
      }

      self.set('isUploading', false);
      self.set('didUpload', true);
      self.get('uploadPromise').resolve(key);
    }).on('httpUploadProgress', function (progress, response) {
      self.set('progress', progress.loaded / progress.total * 100);
    });

    return this.get('uploadPromise').promise;
  },

  showProgressBar: Ember.computed.or('isUploading', 'didUpload'),

  progressStyle: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress')

});
