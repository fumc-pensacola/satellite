Fumc.BasicModalComponent = Ember.Component.extend({

  classNames: ['ui', 'basic', 'modal'],

  didInsertElement: function () {
    this.sendAction('initialize', this);
    this.$().addClass(this.get('class'));
  },

  show: function () {
    this.$().modal('show');
  }

});
