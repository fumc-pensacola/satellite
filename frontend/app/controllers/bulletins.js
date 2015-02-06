/* global moment */

import Ember from 'ember';

export default Ember.ArrayController.extend({

	//itemController: 'bulletin',

	modal: null,

	sortAscending: false,
	sortProperties: ['id'],

	actions: {

		newBulletin: function () {
			this.store.createRecord('bulletin', {
				date: moment().startOf('week').add(1, 'week')
			});
		},

		registerModal: function (modal) {
			this.set('modal', modal);
		}

	}
});
