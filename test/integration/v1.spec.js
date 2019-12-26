const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');
const v1 = require('./../../src/v1');

describe('foo', () => {
  it('boo', () => {
    expect(true).to.be.false;
  });

  it.only('expose some functions', () => {
    expect(v1).to.have.a.property('getAppList').to.be.a('function');
  });

  it('appList returns something', () => {

  })
});
