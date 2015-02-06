var ACS = require('./acs');

module.exports = function (server) {

	require('./controllers/authentication')(server);
	require('./controllers/orm')(server);
	require('./controllers/calendars')(server, new ACS());
	require('./controllers/notifications')(server);
	require('./controllers/url')(server);

};
