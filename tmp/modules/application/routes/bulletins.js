Fumc.BulletinsRoute = Fumc.AuthenticatedRoute.extend({
	model: function () {
		return this.store.find('bulletin');
	}
});
