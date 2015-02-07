import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('authenticate');
  this.resource('bulletins');
  this.resource('witnesses');
  this.resource('featured');
  this.resource('notifications');
  this.route('calendars');
  this.route('unauthorized');

  this.route('error404', {
    path: '*:'
  });
});

export default Router;
