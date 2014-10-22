(function() {

window.Fumc = Ember.Application.create();
Fumc.ApplicationAdapter = DS.FixtureAdapter.extend();

// These requires will be appended to this file using grunt-neuter


})();

(function() {

Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		Ember.FEATURES['ember-routing-drop-deprecated-action-style'] = true;
	}
});


})();

(function() {

Fumc.FileUploadComponent = Ember.Component.extend({
  didInsertElement: function () {
    var component = this;
    component.get('element').querySelector('input[type=file]').addEventListener('change', function() {
      var file = this.files[0];
      component.sendAction('change', file);
    }, false);
  }
});


})();

(function() {

Fumc.Bulletin = DS.Model.extend({
  date: DS.attr('date'),
  service: DS.attr('string'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});

Fumc.Bulletin.FIXTURES = [{
  id: 1,
  date: moment().startOf('week').subtract(1, 'weeks'),
  service: 'ICON',
  visible: true
}];


})();

(function() {

Fumc.FileUploadModel = Ember.Object.extend({

  // Name is used for the upload property
  name: '',

  // {Property} Human readable size of the selected file
  size: "0 KB",

  // {Property} Raw file size of the selected file
  rawSize: 0,

  // {Property} Will be an HTML5 File
  fileToUpload: null,

  // {Property} Will be a $.ajax jqXHR
  uploadJqXHR: null,

  // {Property} Promise for when a file was uploaded
  uploadPromise: null,

  // {Property} Upload progress 0-100
  uploadProgress: null,

  // {Property} If a file is currently being uploaded
  isUploading: false,

  // {Property} If the file was uploaded successfully
  didUpload: false,

  init: function() {
    this._super();
    Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
    this.set('uploadPromise', Ember.Deferred.create());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');

    this.set('name', fileToUpload.name);
    this.set('rawSize', fileToUpload.size);
    // this.set('size', App.humanReadableFileSize(fileToUpload.size));

  }.on('init'),

  uploadFile: function() {
    if (this.get('isUploading') || this.get('didUpload') || this.get('didError')) {
      return this.get('uploadPromise');
    }

    var fileToUpload = this.get('fileToUpload');
    var name = this.get('name');
    var key = "public-uploads/" + (new Date).getTime() + '-' + name;
    var fd = new FormData();
    var self = this;

    fd.append('key', key);
    fd.append('acl', 'public-read-write');
    fd.append('success_action_status', '201');
    fd.append('Content-Type', fileToUpload.type);
    fd.append('file', fileToUpload);

    this.set('isUploading', true);

    $.ajax({
      url: 'http://s3.amazonaws.com/fumcappfiles',
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      xhr: function () {
        var xhr = $.ajaxSettings.xhr();
        // set the onprogress event handler
        xhr.upload.onprogress = function (evt) {
          self.set('progress', (evt.loaded / evt.total * 100));
        };
        return xhr;
      }
    }).then(function (data, textStatus, jqXHR) {
      var value = '';
      try {
        value = data.getElementsByTagName('Location')[0].textContent;
      } catch (e) {}
      self.set('isUploading', false);
      self.set('didUpload', true);
      self.get('uploadPromise').resolve(value);
    }, function (jqXHR, textStatus, errorThrown) {
      self.set('isUploading', false);
      self.set('didError', true);
      self.get('uploadPromise').reject(errorThrown);
    });

    return this.get('uploadPromise');
  },

  showProgressBar: Ember.computed.or('isUploading', 'didUpload'),

  progressStyle: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress')

});


})();

(function() {

Fumc.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function (transition) {
    if (!this.controllerFor('application').get('token')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function (transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

});


})();

(function() {

Fumc.BulletinsRoute = Fumc.AuthenticatedRoute.extend({
	model: function () {
		return this.store.find('bulletin');
	}
});


})();

(function() {

Fumc.ApplicationController = Ember.Controller.extend({

  token: localStorage.token,
  name: localStorage.name,
  email: localStorage.email,

  tokenChanged: function() {
    localStorage.token = this.get('token');
    localStorage.name = this.get('name');
    localStorage.email = this.get('email');
  }.observes('token')

});


})();

(function() {

Fumc.BulletinController = Ember.ObjectController.extend({

  editing: false,
  fileUpload: null,

  init: function () {
    if (~this.get('currentState.stateName').indexOf('uncommitted')) {
      this.set('editing', true);
    }
  },

  formattedDate: function () {
    return moment(this.get('date')).format('dddd, MMMM Do YYYY');
  }.property('date'),

  actions: {

    toggleEditing: function () {
      this.toggleProperty('editing');
    },

    save: function () {

      var fileUpload = this.get('fileUpload'),
          model = this.get('model'),
          saved = function () {
            this.set('editing', false);
          }.bind(this);

      this.set('date', new Date(this.get('date')));

      if (fileUpload) {
        fileUpload.uploadFile().then(function (url) {
          this.set('file', url);
          model.save().then(saved);
        })
      } else {
        model.save().then(saved);
      }
    },

    cancel: function () {
      var bulletin = this.get('model');
      bulletin.rollback();
      this.set('editing', false);
    },

    remove: function () {
      console.log(this);
    },

    fileSelected: function (file) {
      this.set('fileUpload', Fumc.FileUploadModel.create({
        fileToUpload: file
      }));
    }
  }
})


})();

(function() {

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


})();

(function() {

Fumc.LoginController = Ember.Controller.extend({

  needs: ['application'],
  queryParams: ['access_token'],
  access_token: null,
  attemptedTransition: null,

  token: Ember.computed.alias('controllers.application.token'),
  name: Ember.computed.alias('controllers.application.name'),
  email: Ember.computed.alias('controllers.application.email'),

  init: function () {

  },

  actions: {
    login: function () {
      options = { scope: 'profile' };
      amazon.Login.authorize(options, '/#/authenticate');
    }
  }

});

Fumc.AuthenticateRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    var token = transition.queryParams.access_token;
    if (token) {
      Ember.$.post('/authenticate', { access_token: token }).then(function (response) {
        if (response.success) {

          var loginController = this.controllerFor('login'),
              attemptedTransition = loginController.get('attemptedTransition');
          loginController.set('token', response.token);
          loginController.set('name', response.name);
          loginController.set('email', response.email);

          if (attemptedTransition) {
            attemptedTransition.retry();
            loginController.set('attemptedTransition', null);
          } else {
            this.transitionTo('index');
          }
        }
      }.bind(this));
    }
  }
})


})();

(function() {

Fumc.ApplicationView = Ember.View.extend({

});


})();

(function() {

Fumc.BulletinsView = Ember.View.extend({
  didInsertElement: function () {
    this.$().find('.ui.checkbox').checkbox();
  }
});


})();

(function() {

Fumc.DateField = Ember.TextField.extend({
  picker: null,

  updateValue: function() {
    var date = moment(this.get('date'));
    if (date.isValid()) {
      this.set('value', date.format('L'));
      this.get('picker').setDate(date.format('L'));
    } else {
      this.set('value', null);
    }
  }.observes('date'),

  updateDate: function() {
    var date = moment(this.get('value'));
    if (date.isValid()) {
      this.set('date', date.toDate());
    } else {
      this.set('date', null);
    }
  }.observes('value'),

  didInsertElement: function() {
    var picker = new Pikaday({
      field: this.$()[0],
      format: 'MM/DD/YYYY'
    });
    this.set('picker', picker);
    this.updateValue();
  },

  willDestroyElement: function(){
    var picker = this.get('picker');
    if (picker) {
      picker.destroy();
    }
    this.set('picker', null);
  }
});


})();

(function() {

Fumc.ApplicationAdapter = DS.RESTAdapter.extend({

	namespace: 'api',

	headers: function () {
		return {
			token: localStorage.token
		};
	}.property().volatile(),

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
	this.route('login');
	this.route('authenticate');
	this.resource('bulletins');
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});


})();