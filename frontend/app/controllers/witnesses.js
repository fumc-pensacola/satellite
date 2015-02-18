/* global moment */

import Ember from 'ember';
import PDFSController from './pdfs';

export default PDFSController.extend({
  
  needs: ['pdfs'],
  modalURL: Ember.computed.alias('controllers.pdfs.modalURL'),
  showingModal: Ember.computed.alias('controllers.pdfs.showingModal'),
  
  actions: {

    newWitness: function () {
      this.store.createRecord('witness', {
        from: moment().add(1, 'weeks').startOf('week'),
        to: moment().add(1, 'weeks').endOf('week').startOf('day'),
        volume: moment().add(1, 'weeks').startOf('week').year() - 1820
      });
    }

  }

});
