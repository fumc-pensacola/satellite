import Ember from 'ember';
import config from '../config/environment';
var TEST = config.environment === 'test';

export default Ember.Component.extend({

  oldFile: null,
  currentFile: null,
  input: null,


  didInsertElement: function () {
    var component = this,
        input = component.get('element').querySelector('input[type=file]');

    if (!this.get('currentFile')) {
      component.set('currentFile', this.get('oldFile'));
    }
    
    var change = function (event) {
      var file = TEST ? event.detail.file : this.files[0];
      component.set('currentFile', file.name);
      component.sendAction('change', file);
    };

    input.addEventListener('change', change, false);
    if (TEST) {
      input.addEventListener('test.file', change, false);
    }

    this.set('input', input);
  },

  actions: {
    replace: function () {
      this.set('currentFile', null);
      this.sendAction('change', null);
    },
    triggerClick: function () {
      this.get('input').click();
    }
  }
});
