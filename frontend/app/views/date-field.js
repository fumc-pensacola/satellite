/* global moment, Pikaday */

import Ember from 'ember';

export default Ember.TextField.extend({
  picker: null,

  updateValue: function () {
    var date = moment(this.get('date'));
    if (date.isValid() && !this.$().is(':focus')) {
      this.set('value', date.format('L'));
      this.get('picker').setDate(date.format('L'));
    }
  }.observes('date'),

  updateDate: function () {
    var date = moment(new Date(this.get('value')));
    if (date.isValid()) {
      this.set('date', date.toDate());
    } else {
      this.set('date', null);
    }
  }.observes('value'),

  didInsertElement: function () {
    var picker = new Pikaday({
      field: this.$()[0],
      format: 'MM/DD/YYYY'
    });
    this.set('picker', picker);
    this.updateValue();
  },

  willDestroyElement: function (){
    var picker = this.get('picker');
    if (picker) {
      picker.destroy();
    }
    this.set('picker', null);
  }
});
