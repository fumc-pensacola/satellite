"use strict";

const noop = require('lodash/noop');
const scopes = require('./scopes');
const warn = process.env.NODE_ENV !== 'test' ? console.warn : noop;

module.exports = {
  [scopes.directory.fullReadAccess]: (user, member) => {
    if (member) {
      if (!member.phones || !member.phones.some(p => p.value === user.phone)) {
        warn(`User ${user._id} phone out of sync with member ${member._id}`);
      }

      return true;
    }

    return false;
  }
};
