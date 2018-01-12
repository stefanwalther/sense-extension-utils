const config = require('./../requirejs-config');
const requirejs = require('requirejs');
const chai = require('chai');
const expect = chai.expect();

describe('variable-utils', function () {

  var VariableUtils = null;
  beforeEach(function (done) {
    requirejs(['variable-utils'], function (variableUtils) {
      VariableUtils = variableUtils;
      done();
    })
  });

  it('has a method updateEngineVars', function () {
    expect(VariableUtils).to.have.a.property('updateEngineVars');
  })

});
