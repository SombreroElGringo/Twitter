/**
 * Module dependencies.
 */
const expressStatusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('morgan');

module.exports = function(app) {

	app.set('port', process.env.PORT || 5000);
	app.set('json spaces', 2);
	app.use(expressStatusMonitor());
	app.use(logger('dev'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(methodOverride());
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();  
	});

	return app;
};