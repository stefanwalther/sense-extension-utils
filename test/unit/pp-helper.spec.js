/* global describe, it */
'use strict';

define(['chai', './../../src/pp-helper'], function (chai, ppHelper) {
  var expect = chai.expect;
  describe('general-utils', function () {
    it('should expose functions', function () {
      expect(ppHelper).to.have.a.property('getAppList').to.be.a('function');
      expect(ppHelper).to.have.a.property('getBookmarkList').to.be.a('function');
      expect(ppHelper).to.have.a.property('getFieldList').to.be.a('function');
      expect(ppHelper).to.have.a.property('getSheetList').to.be.a('function');
      expect(ppHelper).to.have.a.property('getFirstSheet').to.be.a('function');
      expect(ppHelper).to.have.a.property('getLastSheet').to.be.a('function');
    });
    it('should not expose the following functions', function() {
      expect(ppHelper).to.not.have.a.property('does-not-exist');
    })
  });
});
