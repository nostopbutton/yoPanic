'use strict';

describe('Controller: HomeCarouselCtrl', function () {

  // load the controller's module
  beforeEach(module('panicApp.Controllers'));

  var HomeCarouselCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    HomeCarouselCtrl = $controller('HomeCarouselCtrl', {
      $scope: scope
    });
  }));


  it('should attach an interval timer of 5000 scope', function () {
    expect(scope.myInterval).to.equal(5000);
  });

  it('should attach a list of slides to the scope', function () {
    expect(scope.slides.length).to.equal(3);
  });
});
