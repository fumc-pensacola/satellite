Fumc.FeaturedRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.find('feature');
  }
});
