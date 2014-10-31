Fumc.WitnessesRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.find('witness');
  }
});
