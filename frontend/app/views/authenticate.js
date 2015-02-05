Fumc.AuthenticateView = Ember.View.extend({
  templateName: 'authenticate',
  didInsertElement: function () {
    $('.ui.basic.modal').modal('setting', 'closable', false).modal('show');
  },
  willDestroyElement: function () {
    $('.ui.basic.modal').modal('hide');
  }
});
