/* global amazon */

import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['application'],
  queryParams: ['access_token'],
  access_token: null,
  attemptedTransition: null,

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

export default Ember.Route.extend({
  beforeModel: function (transition) {
    var token = transition.queryParams.access_token;
    if (token) {
      Ember.$.post('/authenticate', { access_token: token }).then(function (response) {
        if (response.success) {

          var loginController = this.controllerFor('login'),
              attemptedTransition = loginController.get('attemptedTransition');
          loginController.setProperties({
            name: response.name,
            email: response.email,
            token: response.token
          });

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
});
