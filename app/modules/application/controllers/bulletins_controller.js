Fumc.BulletinsController = Ember.ArrayController.extend({
	itemController: 'bulletin',
	sortProperties: ['date', 'service'],
	sortAscending: false,

	modal: null,
	showBulletingUrl: null,

	pdfChanged: function () {
		this.get('modal').$('object.pdf').trigger('change');
	}.observes('showBulletinUrl'),

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
