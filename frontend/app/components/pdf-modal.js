import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['ui', 'basic', 'modal', 'pdf-modal'],

  didInsertElement: function () {
    // Initialize
    this.$().modal({
      onHide: function () {
        this.sendAction('close');
      }.bind(this)
    });
  },

  toggle: function () {
    if (this.get('visible')) {
      this.$().modal('show');
    } else {
      this.$().modal('hide');
    }
  }.observes('visible'),
  
  updateContent: function () {
    this.$('.content').html('<object class="pdf" type="application/pdf" data="' + this.get('url') + '"></object>');
  }.observes('url')

});
