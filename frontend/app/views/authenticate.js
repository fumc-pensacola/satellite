import Ember from 'ember';
var modal;

export default Ember.View.extend({
  templateName: 'authenticate',
  didInsertElement: function () {
    modal = this.$('.ui.basic.modal');
    modal.modal('setting', 'closable', false).modal('show');
  },
  willDestroyElement: function () {
    if (modal) {
      modal.modal('hide');
    }
  }
});
