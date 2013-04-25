'use strict';

describe('Controller: RangeDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('panicApp.Controllers'));

  var RangeDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    RangeDetailsCtrl = $controller('RangeDetailsCtrl', {
      $scope: scope
    });
  }));

  // Need a test for analytics

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
