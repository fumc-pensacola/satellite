/* global moment */

import Ember from 'ember';
import PDFSController from './pdfs';

export default PDFSController.extend({
	
	needs: ['pdfs'],
	modalURL: Ember.computed.alias('controllers.pdfs.modalURL'),
	showingModal: Ember.computed.alias('controllers.pdfs.showingModal'),

	actions: {

		newBulletin: function () {
			this.store.createRecord('bulletin', {
				date: moment().startOf('week').add(1, 'week')
			});
		}

	}
});
