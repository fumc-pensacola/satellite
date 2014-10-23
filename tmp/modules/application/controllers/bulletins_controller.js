Fumc.BulletinsController = Ember.ArrayController.extend({
	itemController: 'bulletin',
	sortProperties: ['date'],
	sortAscending: false,

	modal: null,
	showBulletingUrl: null,

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
