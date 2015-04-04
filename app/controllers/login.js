/* global amazon */

import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['application'],
  queryParams: ['access_token'],
  access_token: null,

  token: Ember.computed.alias('controllers.application.token'),
  name: Ember.computed.alias('controllers.application.name'),
  email: Ember.computed.alias('controllers.application.email'),

  actions: {
    login: function () {
      var options = { scope: 'profile' };
      amazon.Login.authorize(options, '/#/authenticate');
    }
  }

});
