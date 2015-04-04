/* global moment */

import PDFController from './pdf';

export default PDFController.extend({

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

    save: function () {
      this.set('date', new Date(this.get('date')));
      this._super();
    },

    fileSelected: function (file) {
      if (!file) {
        this.set('fileUpload', null);
        return;
      }

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

      this._super();
    }
  }
});
