/*global window,define*/
define( [
	'angular',
	'underscore',
	'qlik'
], function ( angular, _, qlik ) {

	var $injector = angular.injector( ['ng'] );
	var $q = $injector.get( "$q" );

	var app = qlik.currApp();

	// ****************************************************************************************
	// Helper Promises
	// ****************************************************************************************

	// Todo: probably easier if we added some sorting for the apps
	function getAppList() {
		var defer = $q.defer();

		qlik.getAppList( function ( items ) {
			defer.resolve( items.map( function ( item ) {
					return {
						value: item.qDocId,
						label: item.qTitle
					}
				} )
			);
		} );

		return defer.promise;
	}

	// Todo: Add sorting for the list of bookmarks
	function getBookmarkList() {
		var defer = $q.defer();

		app.getList( 'BookmarkList', function ( items ) {
			defer.resolve( items.qBookmarkList.qItems.map( function ( item ) {
					return {
						value: item.qInfo.qId,
						label: item.qData.title
					};
				} )
			);
		} );
		return defer.promise;
	}

	function getFieldList() {
		var defer = $q.defer();


		return defer.promise;
	}


	//Todo: Check if sorting really works by qData.rank
	function getSheetList() {

		var defer = $q.defer();

		app.getAppObjectList( function ( data ) {
			var sheets = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
			return defer.resolve( sheets );
		} );

		return defer.promise;
	}

	function getStoryList() {

		var defer = $q.defer();

		app.getList( 'story', function ( data ) {
			var stories = [];
			if ( data && data.qAppObjectList && data.qAppObjectList.qItems ) {
				data.qAppObjectList.qItems.forEach( function ( item ) {
					stories.push( {
						value: item.qInfo.qId,
						label: item.qMeta.title
					} );
				} )
			}
			return defer.resolve( _.sortBy( stories, function ( item ) {
				return item.label;
			} ) );

		} );

		return defer.promise;

	}

	// ****************************************************************************************
	// Return Values
	// ****************************************************************************************
	return {
		getAppList: getAppList,
		getBookmarkList: getBookmarkList,
		getFieldList: getFieldList,
		getSheetList: getSheetList,
		getStoryList: getStoryList
	};

} );
