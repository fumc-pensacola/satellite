Fumc.ApplicationController = Ember.Controller.extend({
  
  token: null,
  name: null,
  email: null,

  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token')

});
