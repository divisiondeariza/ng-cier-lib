'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('ngCierLib');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('ngCierLib.config')).to.be.ok;
  });

  
  it('should load filters module', function() {
    expect(hasModule('ngCierLib.filters')).to.be.ok;
  });
  

  
  it('should load directives module', function() {
    expect(hasModule('ngCierLib.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('ngCierLib.services')).to.be.ok;
  });
  

});