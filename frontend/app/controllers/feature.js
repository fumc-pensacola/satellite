import Ember from 'ember';
import AWS from '../utils/aws';
import FileUpload from '../models/file-upload';

export default Ember.ObjectController.extend({

  needs: ['application', 'featured'],

  editing: false,
  iphoneFiveFileUpload: null,
  initialDate: null,
  isKindOfDirty: false,
  devices: ['iphoneFour', 'iphoneFive', 'iphoneSix', 'iphoneSixPlus'],

  featuredController: Ember.computed.alias('controllers.featured'),

  iphoneFourShowingImage: Ember.computed.or('iphoneFourFileUpload', 'iphoneFourImage'),
  iphoneFiveShowingImage: Ember.computed.or('iphoneFiveFileUpload', 'iphoneFiveImage'),
  iphoneSixShowingImage: Ember.computed.or('iphoneSixFileUpload', 'iphoneSixImage'),
  iphoneSixPlusShowingImage: Ember.computed.or('iphoneSixPlusFileUpload', 'iphoneSixPlusImage'),

  isUploading: Ember.computed.or('iphoneFourFileUpload.isUploading', 'iphoneFiveFileUpload.isUploading', 'iphoneSixFileUpload.isUploading', 'iphoneSixPlusFileUpload.isUploading'),
  isControllerDirty: Ember.computed.or('isDirty', 'isKindOfDirty'),

  urlIsValid: true,

  _setImageURL: function (device, key) {
    AWS.s3.getSignedUrl('getObject', { Key: this.get(device + 'Image') }, function (err, url) {
      if (!err) {
        this.set(device + 'ImageURL', url);
      }
    }.bind(this));
  },

  setIphoneFourImageURL: function (key) {
    window.controller = this;
    this._setImageURL('iphoneFour', key);
  }.observes('iphoneFourImage').on('init'),

  setIphoneFiveImageURL: function (key) {
    this._setImageURL('iphoneFive', key);
  }.observes('iphoneFiveImage').on('init'),

  setIphoneSixImageURL: function (key) {
    this._setImageURL('iphoneSix', key);
  }.observes('iphoneSixImage').on('init'),

  setIphoneSixPlusImageURL: function (key) {
    this._setImageURL('iphoneSixPlus', key);
  }.observes('iphoneSixPlusImage').on('init'),

  toggledActive: function () {
    var self = this;
    if (this.get('active')) {
      this.get('featuredController').forEach(function (f) {
        if (f !== self.get('model')) {
          f.set('active', false);
        }
      });
    }
  }.observes('active'),

  _fileSelected: function (device, file) {
    if (!file) {
      this.set(device + 'FileUpload', null);
      return;
    }

    if (file.name !== this.get(device + 'Image')) {
      this.set('isKindOfDirty', true);
    }

    this.set(device + 'CurrentFile', file.name);
    this.set(device + 'FileUpload', FileUpload.create({
      fileToUpload: file
    }));
  },

  actions: {

    iphoneFourFileSelected: function (file) {
      this._fileSelected('iphoneFour', file);
    },

    iphoneFiveFileSelected: function (file) {
      this._fileSelected('iphoneFive', file);
    },

    iphoneSixFileSelected: function (file) {
      this._fileSelected('iphoneSix', file);
    },

    iphoneSixPlusFileSelected: function (file) {
      this._fileSelected('iphoneSixPlus', file);
    },

    save: function () {

      if (this.get('isUploading') || !this.get('urlIsValid')) {
        return false;
      }

      var self = this,
          model = this.get('model'),
          devices = this.get('devices'),
          uploads = [];

      for (var i = 0; i < devices.length; i++) {
        var device = devices[i],
            fileUpload = this.get(device + 'FileUpload'),
            oldFile = this.get(device + 'Image');

        if (fileUpload) {
          if (fileUpload.name !== oldFile) {
            AWS.s3.deleteObject({ Key: oldFile }).send();
          }
          uploads.push(new Ember.RSVP.Promise(function (resolve, reject) {
            fileUpload.uploadFile().then(function (d) {
              return function (key) {
                self.set(d + 'Image', key);
                resolve();
              };
            }(device));
          }));
        }
      }

      Ember.RSVP.Promise.all(uploads).then(function () {
        model.save().then(function () {
          self.set('isKindOfDirty', false);
          setTimeout(function () {
            for (var j = 0; j < devices.length; j++) {
              self.set(devices[j] + 'FileUpload', null);
            }
          }, 500);
        });
      });
    }

  }

});
