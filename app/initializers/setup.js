Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		Ember.FEATURES['ember-routing-drop-deprecated-action-style'] = true;
	}
});
