Fumc.FeatureView = Ember.View.extend({

  templateName: 'feature',
  classNames: ['item', 'feature'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});
