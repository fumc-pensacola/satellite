/* global Cookies */

import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  namespace: 'api',

  headers: function () {
    return {
      token: Cookies.get('token')
    };
  }.property().volatile(),

});
