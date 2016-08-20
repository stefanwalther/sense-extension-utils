'use strict';

var config = require( './../requirejs-config' );
var requirejs = require( 'requirejs' );
var chai = require( 'chai' );
var expect = chai.expect();

describe( 'variable-utils', function () {

	var VariableUtils = null;
	beforeEach( function ( done ) {
		requirejs(['variable-utils'], function ( variableUtils ) {
			VariableUtils = variableUtils;
			done();
		})
	} );

	it('has a method updateEngineVars', function() {
		expect( VariableUtils).to.have.a.property('updateEngineVars');
	})

} );
