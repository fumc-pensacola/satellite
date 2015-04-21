/* global Cookies */

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'fumc/tests/helpers/start-app';

var application;

module('Acceptance: Bulletin', {
  beforeEach: function () {
    application = startApp();
  },

  afterEach: function () {
    Ember.run(application, 'destroy');
  }
});

test('visiting /bulletins', function (assert) {
  Cookies.set('token', 'abcdefg');
  visit('/bulletins');

  andThen(function () {
    assert.equal(currentPath(), 'bulletins');
  });
});

test('adding a bulletin', function (assert) {
  var numberOfBulletins = document.querySelectorAll('.pdf-item').length;
  click('#new-bulletin');
  andThen(function () {
    assert.equal(document.querySelectorAll('.pdf-item').length, numberOfBulletins + 1);
  });
});
