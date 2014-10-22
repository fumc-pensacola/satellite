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
