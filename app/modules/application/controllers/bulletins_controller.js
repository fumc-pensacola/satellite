Fumc.BulletinsController = Ember.ArrayController.extend({
	itemController: 'bulletin',
	sortProperties: ['date'],
	sortAscending: false,
	actions: {
		newBulletin: function () {
			var bulletin = this.store.createRecord('bulletin', {
				date: moment().startOf('week').add(1, 'week')
			});
		}
	}
});
