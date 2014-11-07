Fumc.CalendarsController = Ember.Controller.extend({

  calendarURL: function () {
    return 'webcal://fumc.herokuapp.com/api/calendars/' + (this.get('calendarName') || '').replace(/[^A-Za-z0-9]/g, '');
  }.property('calendarName')

});
