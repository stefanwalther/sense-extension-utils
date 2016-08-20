/**
 * @public
 */
/*global define,_*/
define( [
		'angular'
	],
	function ( angular ) {
		'use strict';

		var $injector = angular.injector( ['ng'] );
		var $q = $injector.get( "$q" );

		/**
		 * @name variable-utils
		 *
		 * Bla bla bla
		 *
		 * @api public
		 */
		var varUtils = function () {

			var self = this;

			/**
			 * Update the defined Qlik Sense variables based on the values of the slider.
			 *
			 * @todo Handle non existing variables
			 *
			 *
			 * @param {object} app -
			 * @param {Array<VariableDefinition>} `varDefs` -
			 * @return {*}
			 *
			 * @api public
			 */
			this.updateEngineVars = function ( app, varDefs ) {

				var defer = $q.defer();

				varDefs.forEach( function ( varDef ) {
					console.log( 'updateEngineVars:setvalue', varDef );

					// Todo: double-check if this is really necessary, what does `setContent` return if the variable does not exist?
					self.ensureEngineVarExists( app, varDef.name )
						.then( function ( isVarExisting ) {
							app.variable.setContent( varDef.name, varDef.value )
								.then( function ( reply ) {

									angular.noop();
									console.log( 'Value set for variable ' + varDef.name + '. ', 'Return: ', reply );
								} );
						} )
						.catch( function ( err ) {
							window.console.error( 'updateEngineVars:error', err );
						} );

				} );

				return defer.promise;

			};

			/**
			 * Checks if a (Qlik Engine) variable exists or not, if not a session variable will be created.
			 *
			 * @todo Resolved return variable is not consistent, but shouldn't be
			 *
			 * @param app
			 * @param varName
			 * @returns {Promise}
			 *
			 * @api public
			 */
			this.ensureEngineVarExists = function ( app, varName ) {

				var defer = $q.defer();
				this.engineVarExists( app, varName )
					.then( function ( result ) {
						if ( result ) {
							defer.resolve( true );
						} else {
							return self.createEngineSessionVar( app, varName );
						}
					} )
					.catch( function ( err ) {
						defer.reject( err );
					} );
				return defer.promise;
			};

			/**
			 *
			 * @todo Use sessionvar ;-)
			 *
			 * @param app
			 * @param varName
			 * @returns {Suite|*|Object}
			 */
			this.createEngineSessionVar = function ( app, varName ) {
				return app.variable.create( {qName: varName} );
			};

			/**
			 * Returns a promise containing the information whether a variable exists.
			 *
			 * @param {object} `app` - The current app.
			 * @param {string} `varName` - The variable name.
			 * @returns {Promise} - A promise containing the model of the variable, otherwise null..
			 *
			 * @api public
			 */
			this.engineVarExists = function ( app, varName ) {
				var defer = $q.defer();

				app.variable.getByName( varName )
					.then( function ( model ) {
						defer.resolve( model );
					}, function ( errorObject ) {
						window.console.error( 'engineVarExists: ', errorObject );
						defer.resolve( null );
					} );

				return defer.promise;
			};

			/**
			 * Retrieve the values of a list of variables.
			 *
			 * Since $q.all fails on the first error, we have to resolve all first
			 *
			 * @param {string[]} `varList` - The variable names.
			 * @param {object} `app` - The (Qlik Sense) app.
			 *
			 * @returns {Promise}
			 *
			 * @api public
			 */
			this.getEngineVarListValues = function ( app, varList ) {

				if ( varList && Array.isArray( varList ) ) {
					var promises = [];
					varList.forEach( function ( variable ) {
						promises.push( self.getEngineVarValue( app, variable ) )
					} );
					return $q.all( promises );
				}
				return $q.reject( new Error( 'getEngineVarListValues variable list passed.' ) );
			};

			/**
			 * @typedef {object} VariableValueResult
			 *
			 * @example
			 * {
			 * 		"success": true,
			 * 		"varName": "vVar1",
			 * 		"result": [object]
			 * }
			 *
			 * @property {boolean} `success` - Whether retrieving the variable was successful or not.
			 * @property {string} `varName` - The name of the variable.
			 * @property {object} `result` - The model of the variable, in case `success` is true.
			 * @property {Error} `err` - The error, in case `success` equals false.
			 *
			 */

			/**
			 * Retrieve the value of a variable.
			 *
			 * Retrieves the promises of a model of a variable.
			 * Instead of returning a rejected promise in case of any error, an object will be returned containing the information
			 * whether retrieving the variable's model succeeded or not.
			 * By doing so, getVariableValue can be used in $q.all scenarios
			 *
			 * @todo Rename to getVariableValue
			 *
			 * @param {object} `app` - The current Qlik Sense app instance.
			 * @param {string} `varName` - The variable name.

			 * @returns {Promise<VariableValueResult,VariableValueError>} - Always returns a resolved promise, to be used in a $q.all scenario, which
			 * shouldn't fail if one of the variables doesn't exist.

			 * @api public
			 */
			this.getEngineVarValue = function ( app, varName ) {
				var defer = $q.defer();

				app.variable.getByName( varName )
					.then( function ( result ) {
						defer.resolve( {
							success: true,
							varName: varName,
							result: result
						} )
					} )
					.catch( function ( err ) {
						defer.resolve( {
							success: false,
							varName: varName,
							err: err
						} );
					} );
				return defer.promise;
			};

		};

		return new varUtils();

	} );
