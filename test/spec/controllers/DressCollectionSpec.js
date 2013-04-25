'use strict';

describe('Controller: DressCollectionCtrl', function () {

  // load the controller's module
  beforeEach(angular.module('panicApp.Controllers'));

  var CollectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    CollectionCtrl = $controller('DressCollectionCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
