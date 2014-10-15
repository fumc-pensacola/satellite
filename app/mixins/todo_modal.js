Fumc.TodoModalMixin = Ember.Mixin.create({
	closeModal: function (modal) {
		var controller = this;
		
		controller.transitionToRoute('todos.index');
		
	}
});
