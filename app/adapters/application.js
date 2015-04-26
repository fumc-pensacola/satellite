/* global Cookies */

import JsonApiAdapter from 'ember-json-api/json-api-adapter';

export default JsonApiAdapter.extend({

  namespace: 'api/v2',

  headers: function () {
    return {
      token: Cookies.get('token')
    };
  }.property().volatile()

});
