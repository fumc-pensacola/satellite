import Ember from 'ember';

export default Ember.Route.extend({

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

  actions: {
    error: function (error, transition) {
      if (error && error.status === 401) { // Invalid token, probably expired
        this.redirectToLogin(transition);
      }
    }
  }

});
