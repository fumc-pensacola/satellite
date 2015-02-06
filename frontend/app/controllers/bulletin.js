/* global moment */

import Ember from 'ember';
import FileUpload from '../models/file-upload';

export default Ember.ObjectController.extend({

  needs: ['application', 'bulletins'],

  editing: false,
  fileUpload: null,
  initialDate: null,

  s3: Ember.computed.alias('controllers.application.s3'),
  modal: Ember.computed.alias('controllers.bulletins.modal'),

  init: function () {
    this.set('initialDate', this.get('date'));
    if (~this.get('currentState.stateName').indexOf('uncommitted')) {
      this.set('editing', true);
    }
    this._super();
  },

  formattedDate: function () {
    return moment(this.get('date')).format('MMMM D, YYYY');
  }.property('date'),

  actions: {

    toggleEditing: function () {
      this.toggleProperty('editing');
    },

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

      this.set('date', new Date(this.get('date')));

      if (fileUpload) {
        if (fileUpload.name !== oldFile) {
          Fumc.s3.deleteObject({ Key: oldFile }).send();
        }
        fileUpload.uploadFile().then(function (key) {
          this.set('file', key);
          model.save().then(saved);
        }.bind(this));
      } else {
        model.save().then(saved);
      }
    },

    cancel: function () {
      var model = this.get('model');
      if (~this.get('currentState.stateName').indexOf('created.uncommitted')) {
        model.destroyRecord();
      } else {
        model.rollback();
        this.set('editing', false);
      }
    },

    remove: function () {
      var file = this.get('file');
      if (file) {
        Fumc.s3.deleteObject({ Key: file }).send();
      }
      this.get('model').destroyRecord();
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

      if (moment(this.get('initialDate')).isSame(this.get('date'), 'day')) { // Only do it if it hasn't been changed manually
        if (!isNaN(date.getDate()) && date.getFullYear() - new Date().getFullYear() <= 1) {
          this.set('date', date);
        }
      }

      if (!this.get('service')) {
        if (~file.name.toLowerCase().indexOf('icon')) {
          this.set('service', 'ICON');
        } else if (date.getDay() === 0) {
          this.set('service', 'Traditional services');
        }
      }

      this.set('fileUpload', FileUpload.create({
        fileToUpload: file
      }));
    },

    viewFile: function () {
      var modal = this.get('modal');
      modal.show();
      Fumc.s3.getSignedUrl('getObject', { Key: this.get('file') }, function (err, url) {
        // TODO make this not suck so hard
        modal.$('.content').html('<object class="pdf" type="application/pdf" data="' + url + '"></object>');
      }.bind(this));
    }
  }
});
