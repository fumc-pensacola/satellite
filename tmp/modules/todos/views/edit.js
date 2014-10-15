Fumc.TodosEditView = Ember.View.extend({

	classNames: ['ui', 'modal'],

	didInsertElement: function () {
		var view = this;
		this.$().modal('setting', {
			closable: false
		}).modal('show');
	}

});
