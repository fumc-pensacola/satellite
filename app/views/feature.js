import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'feature',
  classNames: ['item', 'feature'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});
