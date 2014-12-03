Fumc.NotificationsController = Ember.ObjectController.extend({

  init: function () {
    window.controller = this;
  },

  expirationDateIsValid: function () {
    var exp = this.get('expirationDate');
    return exp && moment(exp).isValid() && exp > Date.now();
  }.property('expirationDate'),

  messageIsValid: function () {
    return (this.get('message') || '').trim().length;
  }.property('message'),

  urlIsValid: true,

  testURL: function () {
    Ember.run.debounce(this, function () {
      var url = this.get('url'),
          self = this;
      if (!url) {
        this.set('urlIsValid', true);
        return;
      }

      $.get('/api/url/test', {
        url: url
      }).done(function (response) {
        self.set('urlIsValid', response.found);
      });
    }, 500);
  }.observes('url'),

  isValid: Ember.computed.and('expirationDateIsValid', 'messageIsValid', 'urlIsValid'),

  actions: {
    test: function () {

    },

    send: function () {
      var self = this;
      this.set('loading', true);
      if (this.get('isValid') && confirm('This will be sent immediately to every person who has downloaded the app and accepted push notifications, and cannot be undone.')) {
        this.set('sendDate', new Date());
        var model = this.get('model');
        model.save().then(function () {
          $.ajax({
            url: '/api/notify/everyone',
            type: 'POST',
            data: { notification: model.toJSON({ includeId: true }) },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('token', Cookies.get('token'));
            }
          }).done(function () {
            alert('Notification sent.');
          }).fail(function () {
            alert('Notification failed to send. Deleting from server.');
            model.destroyRecord();
          }).always(function () {
            self.send('refresh');
          });
        }, function (reason) {
          alert('Notification failed to send. Will not attempt to save to server.');
          console.error(reason);
          self.send('refresh');
        });
      }
    }
  }

});
