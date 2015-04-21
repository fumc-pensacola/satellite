/* global moment */

import PDFController from './pdf';

export default PDFController.extend({

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
      this.set('from', new Date(this.get('from')));
      this.set('to', new Date(this.get('to')));
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

      if (!isNaN(date.getDate()) && date.getFullYear() - new Date().getFullYear() <= 1) {
        this.set('from', date);
      }

      this._super(file);
    }

  }

});
