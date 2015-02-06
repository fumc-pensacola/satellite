export default Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.createRecord('notification', {
      expirationDate: moment().add(1, 'weeks')
    });
  },
  actions: {
    refresh: function () {
      this.refresh();
    }
  }
});
