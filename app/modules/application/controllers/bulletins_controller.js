Fumc.BulletinsController = Ember.ArrayController.extend({
	itemController: 'bulletin',

	sortAscending: false,
	sortProperties: ['date', 'service'],

	modal: null,

	actions: {

		newBulletin: function () {
			var bulletin = this.store.createRecord('bulletin', {
				date: moment().startOf('week').add(1, 'week')
			});
		},

		registerModal: function (modal) {
			this.set('modal', modal);
		}

	}
});
