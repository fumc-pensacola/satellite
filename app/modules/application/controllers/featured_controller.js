Fumc.FeaturedController = Ember.ArrayController.extend({

  sortAscending: false,
  sortProperties: ['id'],

  actions: {

    newFeature: function () {
      var feature = this.store.createRecord('feature');
    }

  }
});
