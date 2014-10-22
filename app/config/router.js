Fumc.Router.map(function () {
	this.route('login');
	this.route('authenticate');
	this.resource('bulletins');
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});
