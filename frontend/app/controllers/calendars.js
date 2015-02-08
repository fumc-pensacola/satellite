import Ember from 'ember';

export default Ember.Controller.extend({

  calendarURL: function () {
    return 'webcal://fumc.herokuapp.com/api/calendars/' + (this.get('calendarName') || '').replace(/[^A-Za-z0-9]/g, '') + '.ics';
  }.property('calendarName')

});
