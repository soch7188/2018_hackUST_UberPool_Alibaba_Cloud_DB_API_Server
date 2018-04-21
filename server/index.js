/**
 * Server Index
 *
 * @date 2018-01-13
 * @author 김지원
 * @updated 2018-01-13
 */

'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	syncDatabase = require('./database'),
	morgan = require('morgan');

module.exports = function() {
	let
		server = express(),
		create,
		start;

	create = function(config) {
		let routes = require('./routes');

		// Server settings
		server.set('env', config.env);
		server.set('port', config.port);
		server.set('hostname', config.hostname);

		// Returns middleware that parses json
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({ extended: false })); // Extended: Support nested json

		console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
		server.use(morgan('dev'));      // MW: log requests to console
		
		// Set up routes
		routes.init(server);
	};

	start = function() {
		let
			hostname = server.get('hostname'),
			port = server.get('port');

		server.listen(process.env.PORT || port, function (){
			console.log('Express server listening on - http(s)://' + hostname + ':' + port + '. Environment (config.env): ' + server.get('env'));
			console.log('process.env.PORT || server.get(\'port\') || 3000: ' + (process.env.PORT || port || 3000));
			syncDatabase().then(() => {console.log('Database sync');})
		})
	};

	return {
		create: create,
		start: start
	};
};

