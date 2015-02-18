import Ember from 'ember';

export default Ember.ArrayController.extend({
  
  sortAscending: false,
  sortProperties: ['id'],
  modalURL: null,
  showingModal: false,
  
  showModal: function () {
    if (this.get('modalURL')) {
      this.set('showingModal', true);
    }
  }.observes('modalURL'),
  
  actions: {
    hideModal: function () {
      this.set('showingModal', false);
    }
  }
  
});
