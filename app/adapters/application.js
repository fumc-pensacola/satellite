/* global Cookies */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  namespace: 'api',

  headers: function () {
    return {
      token: Cookies.get('token')
    };
  }.property().volatile(),

  ajaxError: function(jqXHR) {
    var error = this._super(jqXHR);

    if (jqXHR && jqXHR.status === 422) {
      var errors = Ember.$.parseJSON(jqXHR.responseText)["errors"];

      return new DS.InvalidError(errors);
    } else {
      return error;
    }
  }
});
