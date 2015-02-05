Fumc.ValidatedUrlComponent = Ember.Component.extend({

  classNames: ['ui', 'input'],
  classNameBindings: ['isValid::error'],

  isValid: true,

  testURL: function () {
    var self = this;
    Ember.run.debounce(this, function () {
      var url = self.get('value');
      if (!url) {
        self.set('isValid', true);
        return;
      }

      $.get('/api/url/test', {
        url: url
      }).done(function (response) {
        self.set('isValid', response.found);
      });
    }, 500);
  }.observes('value'),

  didInsertElement: function () {
    console.log(this.get('isValid'));
  }

});
