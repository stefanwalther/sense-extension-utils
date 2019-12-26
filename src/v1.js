(function () {
  return {
    getAppList: (qlik) => {

      const promise = qlik.Promise;

      qlik.getGlobal().getAppList(function (items) {
        promise.resolve(items.map(function (item) {
            return {
              value: item.qDocId,
              label: item.qTitle
            }
          })
        );
      });

      return promise;
    }
  }
});


// ,
// getSheetList: function () {
//
// },
// getStoryList: function () {
//
// },
// getBookmarkList: function () {
//
// },
// getFieldList: function () {
//
// }
