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
