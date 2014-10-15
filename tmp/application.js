(function() {

window.Fumc = Ember.Application.create();

// These requires will be appended to this file using grunt-neuter


})();

(function() {

Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		
	}
});


})();

(function() {

Fumc.TodoModalMixin = Ember.Mixin.create({
	closeModal: function (modal) {
		var controller = this;
		
		controller.transitionToRoute('todos.index');
		
	}
});


})();

(function() {

Fumc.TodoItemComponent = Ember.Component.extend({

	classNames: ['item'],	

	classNameBindings: ['todo.done']
});


})();

(function() {

Fumc.Todo = DS.Model.extend({
	title: DS.attr('string'),
	done: DS.attr('boolean'),

	// Update the database immediately upon checking done
	doneDidChange: function () {
		if (this.get('isDirty')) this.save();
	}.observes('done')
});


})();

(function() {

Fumc.IndexRoute = Ember.Route.extend({
	model: function (params) {
		return this.store.find('todo');
	}
});


})();

(function() {

Fumc.TodosNewRoute = Ember.Route.extend({
	model: function () {
		return this.store.createRecord('todo');
	},
	actions: {
		error: function () {
			console.log('error', arguments);
		}
	}
});


})();

(function() {

Fumc.TodosRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('todo');
	}
});


})();

(function() {

Fumc.TodosEditController = Ember.ObjectController.extend(Fumc.TodoModalMixin, {
	actions: {
		save: function (modal) {
			var controller = this,
				person = this.get('model');

			person.save().then(function () {
				controller.closeModal(modal);
			});
		},

		cancel: function (modal) {
			var person = this.get('model');

			person.rollback();

			this.closeModal(modal);
		}
	}
});


})();

(function() {

Fumc.TodosNewController = Ember.ObjectController.extend(Fumc.TodoModalMixin, {
	actions: {
		save: function (modal) {
			var controller = this,
				person = this.get('model');

			person.save().then(function () {
				controller.closeModal(modal);
			});
		},

		cancel: function (modal) {
			var person = this.get('model');

			person.deleteRecord();

			this.closeModal(modal);
		}
	}
});



})();

(function() {

Fumc.TodosController = Ember.ArrayController.extend({
	actions: {
		removeDone: function () {
			var doneTodos = this.filterBy('done');
			doneTodos.invoke('deleteRecord');
			doneTodos.invoke('save');
		}
	}
});


})();

(function() {

Fumc.ApplicationView = Ember.View.extend({

});


})();

(function() {

Fumc.TodosEditView = Ember.View.extend({

	classNames: ['ui', 'modal'],

	didInsertElement: function () {
		var view = this;
		this.$().modal('setting', {
			closable: false
		}).modal('show');
	}

});


})();

(function() {

Fumc.TodosNewView = Fumc.TodosEditView.extend({
	templateName: 'todos/edit',
});


})();

(function() {

Fumc.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api',
	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);

		if (jqXHR && jqXHR.status === 422) {
			var errors = Ember.$.parseJSON(jqXHR.responseText)["errors"];

			return new DS.InvalidError(errors);
		} else {
			return error;
		}
	}
});

Fumc.ApplicationSerializer = DS.RESTSerializer.extend({
	extractSingle: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[type.typeKey] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	extractArray: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[Ember.String.pluralize(type.typeKey)] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	serializeIntoHash: function(data, type, record, options) {
		var serializedData = this.serialize(record, options);
		for (var key in serializedData) {
			if (Ember.isArray(serializedData[key]) && !serializedData[key].length) {

			} else {
				data[key] = serializedData[key];
			}
		}
	},

	keyForRelationship: function(key, kind) {

		key = Ember.String.decamelize(key);
		if (kind === "belongsTo") {
			return key + "_id";
		} else {
			return key;
		}
	},

	normalizeRelationships: function(type, hash) {
		var payloadKey, key, objList, idList = [];

		if (this.keyForRelationship) {
			type.eachRelationship(function(key, relationship) {
				payloadKey = this.keyForRelationship(key, relationship.kind);

				objList = hash[payloadKey] || [];

				objList.forEach(function(item) {
					idList.push(Ember.get(item, 'id'));
				});

				hash[key] = idList;
				delete hash[payloadKey];
			}, this);
		}
	}
});


})();

(function() {

Fumc.Router.map(function () {
	this.resource('todos', function () {
		this.route('new');
		this.route('edit', {
			path: '/:todo_id'
		});
	});
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});


})();