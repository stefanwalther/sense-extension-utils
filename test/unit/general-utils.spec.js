/* global describe, it */
'use strict';

define(['chai', './../../src/general-utils'], function (chai, generalUtils) {
  var expect = chai.expect;
  describe('general-utils', function () {
    it('should expose functions', function () {
      expect(generalUtils).to.have.a.property('addStyleToHeader').to.be.a('function');
      expect(generalUtils).to.have.a.property('addStyleLinkToHeader').to.be.a('function');
      expect(generalUtils).to.have.a.property('getBasePath').to.be.a('function');
      expect(generalUtils).to.have.a.property('getExtensionInfo').to.be.a('function');
      expect(generalUtils).to.have.a.property('getExtensionPath').to.be.a('function');
      expect(generalUtils).to.have.a.property('getProductVersion').to.be.a('function');
      expect(generalUtils).to.have.a.property('getBasePath').to.be.a('function');
    });

    it('dummy', function () {
      let a = generalUtils.dummy();
      expect(a).to.be.equal(1);
    });
  });
});
