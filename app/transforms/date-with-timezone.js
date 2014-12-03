Fumc.DateWithTimezoneTransform = DS.Transform.extend({
  serialize: function (value) {
    // Database ignores timezone, make UTC
    return value ? moment(value).toISOString() : null;
  },
  deserialize: function (value) {
    return value ? new Date(value) : null;
  }
});
