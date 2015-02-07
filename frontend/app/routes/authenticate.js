import Ember from 'ember';

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
        } else {
          this.transitionTo('unauthorized');
        }
      }.bind(this), function () {
        this.transitionTo('unauthorized');
      }.bind(this));
    }
  }
});
