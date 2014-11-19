Fumc.Router.map(function () {
	this.route('login');
	this.route('authenticate');
	this.resource('bulletins');
	this.resource('witnesses');
	this.resource('featured');
	this.route('calendars');
	this.route('error404', { path: '*:' });
});
