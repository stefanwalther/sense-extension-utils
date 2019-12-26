/* global describe, it */
'use strict';

define(['chai', './../../src/variable-utils'], function (chai, variableUtils) {
  const expect = chai.expect;
  describe('general-utils', function () {
    it('should expose functions', function () {
      expect(variableUtils).to.have.a.property('updateEngineVars').to.be.a('function');
      expect(variableUtils).to.have.a.property('ensureEngineVarExists').to.be.a('function');
      expect(variableUtils).to.have.a.property('createEngineSessionVar').to.be.a('function');
      expect(variableUtils).to.have.a.property('engineVarExists').to.be.a('function');
      expect(variableUtils).to.have.a.property('getEngineVarListValues').to.be.a('function');
      expect(variableUtils).to.have.a.property('getEngineVarValue').to.be.a('function');
    });
    it('should not expose the following functions', function() {
      expect(variableUtils).to.not.have.a.property('does-not-exist');
    })
  });
});
