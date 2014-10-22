Fumc.BulletinsView = Ember.View.extend({
  didInsertElement: function () {
    this.$().find('.ui.checkbox').checkbox();
  }
});
