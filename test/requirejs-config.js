'use strict';
var requirejs = require( 'requirejs' );
requirejs.config( {
	baseUrl: './src',
	nodeRequire: require,
	paths: {
		"angular": "./../node_modules/angular-mocks/angular-mocks"
	}
} );
