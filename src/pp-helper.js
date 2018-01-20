/*global window,define*/
define([
  'angular',
  'underscore',
  'qlik'
], function (angular, _, qlik) {

  var $injector = angular.injector(['ng']);
  var $q = $injector.get("$q");

  var app = qlik.currApp();

  /**
   * Collection of helpers to retrieve data which can be easily used in the property panel
   * of visualization extensions.
   */
  var PPHelper = function () {

    // Todo: probably easier if we added some sorting for the apps
    this.getAppList = function () {
      var defer = $q.defer();

      qlik.getGlobal().getAppList(function (items) {
        defer.resolve(items.map(function (item) {
            return {
              value: item.qDocId,
              label: item.qTitle
            }
          })
        );
      });

      return defer.promise;
    };

    // Todo: Add sorting for the list of bookmarks
    this.getBookmarkList = function () {
      var defer = $q.defer();

      app.getList('BookmarkList', function (items) {
        defer.resolve(items.qBookmarkList.qItems.map(function (item) {
          return {
            value: item.qInfo.qId,
            label: item.qData.title
          };
        }));
      });
      return defer.promise;
    };

    this.getFieldList = function () {
      var defer = $q.defer();

      app.getList("FieldList", function (items) {
        // console.log( 'fieldList', items );

        defer.resolve(items.qFieldList.qItems.map(function (item) {
          return {
            value: item.qName,
            label: item.qName
          };
        }));
      });

      return defer.promise;
    };

    //Todo: Check if sorting really works by qData.rank
    this.getSheetList = function () {

      var defer = $q.defer();

      app.getAppObjectList(function (data) {
        var sheets = [];
        var sortedData = _.sortBy(data.qAppObjectList.qItems, function (item) {
          return item.qData.rank;
        });
        _.each(sortedData, function (item) {
          sheets.push({
            value: item.qInfo.qId,
            label: item.qMeta.title
          });
        });
        return defer.resolve(sheets);
      });

      return defer.promise;
    };

    this.getFirstSheet = function() {
      var defer = $q.defer();

      app.getAppObjectList(function(data) {
        var sortedData = _.sortBy(data.qAppObjectList.qItems, function (item) {
          return item.qData.rank;
        });
        if (sortedData.length > 0) {
          return defer.resolve({
            id: sortedData[0].qInfo.qId,
            title: sortedData[0].qMeta.title
          })
        }
      });

      return defer.promise;
    };

    this.getLastSheet = function() {
      var defer = $q.defer();

      app.getAppObjectList(function(data) {
        var sortedData = _.sortBy(data.qAppObjectList.qItems, function (item) {
          return item.qData.rank;
        });
        if (sortedData.length > 0) {
          return defer.resolve({
            id: sortedData[sortedData.length -1].qInfo.qId,
            title: sortedData[sortedData.length -1].qMeta.title
          })
        }
      });

      return defer.promise;
    };

    this.getStoryList = function () {

      var defer = $q.defer();

      app.getList('story', function (data) {
        var stories = [];
        if (data && data.qAppObjectList && data.qAppObjectList.qItems) {
          data.qAppObjectList.qItems.forEach(function (item) {
            stories.push({
              value: item.qInfo.qId,
              label: item.qMeta.title
            });
          })
        }
        return defer.resolve(_.sortBy(stories, function (item) {
          return item.label;
        }));

      });

      return defer.promise;

    }
  };

  // ****************************************************************************************
  // Return Value
  // ****************************************************************************************
  return new PPHelper();

});
