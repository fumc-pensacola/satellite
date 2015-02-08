/* global moment */

import Ember from 'ember';
import BulletinController from './bulletin';
import FileUpload from '../models/file-upload';
import AWS from '../utils/aws';

export default BulletinController.extend({

  needs: ['application', 'witnesses'],

  modal: Ember.computed.alias('controllers.witnesses.modal'),

  formattedDateRange: function () {
    return moment(this.get('from')).format('MMMM D') + " – " + moment(this.get('to')).format('MMMM D, YYYY');
  }.property('from', 'to'),

  updateVolume: function () {
    this.set('volume', moment(this.get('from')).year() - 1820);
  }.observes('from'),

  updateTo: function () {
    this.set('to', moment(this.get('from')).add(1, 'weeks').endOf('week').startOf('day'));
  }.observes('from'),

  actions: {

    save: function () {

      var fileUpload = this.get('fileUpload'),
          model = this.get('model'),
          oldFile = this.get('file'),
          saved = function () {
            setTimeout(function () { this.set('editing', false); }.bind(this), 600);
          }.bind(this);

      if (fileUpload && fileUpload.isUploading) {
        return false;
      }

      this.set('from', new Date(this.get('from')));
      this.set('to', new Date(this.get('to')));

      if (fileUpload) {
        if (fileUpload.name !== oldFile) {
          AWS.s3.deleteObject({ Key: oldFile }).send();
        }
        fileUpload.uploadFile().then(function (key) {
          this.set('file', key);
          model.save().then(saved);
        }.bind(this));
      } else {
        model.save().then(saved);
      }
    },

    fileSelected: function (file) {
      if (!file) {
        this.set('fileUpload', null);
        return;
      }

      this.set('currentFile', file.name);

      var date = new Date(file.name
        .replace(/[-–—_]/g, '/')
        .replace(/[^0-9\/]/g, '')
        .replace(/^\//, '')
        .replace(/\/$/, '')
      );


      if (!isNaN(date.getDate()) && date.getFullYear() - new Date().getFullYear() <= 1) {
        this.set('from', date);
      }

      this.set('fileUpload', FileUpload.create({
        fileToUpload: file
      }));
    }

  }

});
