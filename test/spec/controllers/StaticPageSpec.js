'use strict';

describe('Controller: StaticPageCtrl', function () {

  var scope, rootScope, win, location, routeParams, ctrl, _gaqArrayLength,
    path = 'path';

  // load the controller's module
  beforeEach(angular.mock.module('panicApp.Controllers'));

  beforeEach(angular.mock.inject(function($rootScope, $window, $location, $routeParams, $controller) {
    rootScope = $rootScope;
    win = $window;
    location = $location;
    routeParams = $routeParams;
    ctrl = $controller;

    _gaqArrayLength = win._gaq.length;

    expect(rootScope.$$listeners.hasOwnProperty('$viewContentLoaded')).to.equal(false);
    console.log('creating controller');

  }));

  describe('StaticPageCtrl', function () {
    beforeEach(function(){
      console.log('creating StaticPageCtrl controller');
      ctrl('StaticPageCtrl',
        {
          $rootScope: rootScope
          , $window: win
          , $location:location.path(path)
          , $routeParams:routeParams
        });
    });


    it('should add a $viewContentLoaded listener to the $rootScope', function() {
      checkForViewContentLoadedListener();
    });

    it('should add a _trackPageview to the Google Analytics Queue on the window', function() {
      checkForTrackPageviewOnWindow();
    });
  });

  //--------------------
  // Test Helper Methods
  //--------------------
  var checkForViewContentLoadedListener = function() {
    expect(rootScope.$$listeners.hasOwnProperty('$viewContentLoaded')).to.equal(true);
  }

  var checkForTrackPageviewOnWindow = function() {
    expect(win._gaq.length).to.equal(_gaqArrayLength + 1);
    var _gaq_array = win._gaq.pop();
    expect(_gaq_array.indexOf('_trackPageview')).to.equal(0);
    expect(_gaq_array.indexOf('/' + path)).to.equal(1);
  }
});