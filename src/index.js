define([
  'qlik',
  'jquery',
  'underscore',
  './general-utils',
  './pp-helper',
  './variable-utils'
], function (qlik, $, _, generalUtils, ppHelper, varUtils) {

  return {
    addStyleToHeader: generalUtils.addStyleToHeader,
    addStyleLinkToHeader: generalUtils.addStyleLinkToHeader,
    getExtensionInfo: generalUtils.getExtensionInfo,
    getExtensionPath: generalUtils.getExtensionPath,
    getProductVersion: generalUtils.getProductVersion,
    getBasePath: generalUtils.getBasePath,

    getAppList: ppHelper.getAppList,
    getBookmarkList: ppHelper.getBookmarkList,
    getFieldList: ppHelper.getFieldList,
    getSheetList: ppHelper.getSheetList,
    getFirstSheet: ppHelper.getFirstSheet,
    getLastSheet: ppHelper.getLastSheet,
    getStoryList: ppHelper.getStoryList,

    updateEngineVars: varUtils.updateEngineVars,
    ensureEngineVarExists: varUtils.ensureEngineVarExists,
    createEngineSessionVar: varUtils.createEngineSessionVar,
    engineVarExists: varUtils.engineVarExists,
    getEngineVarListValues: varUtils.getEngineVarListValues,
    getEngineVarValue: varUtils.getEngineVarValue

  }


});