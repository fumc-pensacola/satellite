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
            console.log('Retrying transition');
            attemptedTransition.retry();
            loginController.set('attemptedTransition', null);
          } else {
            console.log('Transitioning to index');
            this.transitionTo('index');
          }
        }
      }.bind(this));
    }
  }
})
