Fumc.NotificationsRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.createRecord('notification', {
      expirationDate: moment().add(1, 'weeks')
    });
  }
});
