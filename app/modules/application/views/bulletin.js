Fumc.BulletinView = Ember.View.extend({

  templateName: 'bulletin',
  classNames: ['item', 'bulletin'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});
