'use strict';

describe('Controller: DesignBuildCtrl', function () {

  // load the controller's module
  beforeEach(module('panicApp.Controllers'));

  var DesignBuildCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    DesignBuildCtrl = $controller('DesignBuildCtrl', {
      $scope: scope
    });
  }));

  // Need a test for analytics

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
