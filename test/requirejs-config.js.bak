const requirejs = require('requirejs');

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;

requirejs.config({
  baseUrl: './src',
  nodeRequire: require,
  paths: {
    "angular": "./../node_modules/angular-mocks/angular-mocks"
  }
});
