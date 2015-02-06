import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortAscending: false,
  sortProperties: ['id'],

  actions: {

    newFeature: function () {
      this.store.createRecord('feature');
    }

  }
});
