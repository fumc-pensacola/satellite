import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'bulletin',
  classNames: ['item', 'bulletin'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});
