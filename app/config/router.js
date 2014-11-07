Fumc.Router.map(function () {
	this.route('login');
	this.route('authenticate');
	this.resource('bulletins');
	this.resource('witnesses');
	this.route('calendars');
	this.route('error404', { path: '*:' });
});
