import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'authenticate',
  didInsertElement: function () {
    this.$('.ui.basic.modal').modal('setting', 'closable', false).modal('show');
  },
  willDestroyElement: function () {
    this.$('.ui.basic.modal').modal('hide');
  }
});
