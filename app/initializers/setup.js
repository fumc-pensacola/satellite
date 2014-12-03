Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		Ember.FEATURES['ember-routing-drop-deprecated-action-style'] = true;

		Fumc.DateWithTimezoneTransform = DS.Transform.extend({
			serialize: function (value) {
				return value ? moment(value).format() : null;
			},
			deserialize: function (value) {
				return value ? new Date(value) : null;
			}
		});
		
	}
});
