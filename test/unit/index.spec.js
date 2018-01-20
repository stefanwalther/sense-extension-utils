/* global describe, it */
'use strict';

define(['chai', './../../src/index'], function (chai, index) {
  var expect = chai.expect;
  describe('general-utils', function () {
    it('should expose functions', function () {

      // general-utils
      expect(index).to.have.a.property('addStyleToHeader').to.be.a('function');
      expect(index).to.have.a.property('addStyleLinkToHeader').to.be.a('function');
      expect(index).to.have.a.property('getBasePath').to.be.a('function');
      expect(index).to.have.a.property('getExtensionInfo').to.be.a('function');
      expect(index).to.have.a.property('getExtensionPath').to.be.a('function');
      expect(index).to.have.a.property('getProductVersion').to.be.a('function');
      expect(index).to.have.a.property('getBasePath').to.be.a('function');

      // ppHelper
      expect(index).to.have.a.property('getAppList').to.be.a('function');
      expect(index).to.have.a.property('getBookmarkList').to.be.a('function');
      expect(index).to.have.a.property('getFieldList').to.be.a('function');
      expect(index).to.have.a.property('getSheetList').to.be.a('function');
      expect(index).to.have.a.property('getFirstSheet').to.be.a('function');
      expect(index).to.have.a.property('getLastSheet').to.be.a('function');

      // variable-utils
      expect(index).to.have.a.property('updateEngineVars').to.be.a('function');
      expect(index).to.have.a.property('ensureEngineVarExists').to.be.a('function');
      expect(index).to.have.a.property('createEngineSessionVar').to.be.a('function');
      expect(index).to.have.a.property('engineVarExists').to.be.a('function');
      expect(index).to.have.a.property('getEngineVarListValues').to.be.a('function');
      expect(index).to.have.a.property('getEngineVarValue').to.be.a('function');
    });
    it('should not expose the following functions', function() {
      expect(index).to.not.have.a.property('does-not-exist');
    })
  });
});
