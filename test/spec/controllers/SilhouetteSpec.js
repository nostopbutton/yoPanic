'use strict';

describe('Controller: SilhouetteCtrl', function () {

  var scope, range, rootScope, win, location, routeParams, ctrl, _gaqArrayLength,
    path = 'path';

  // Load the controllers module
  beforeEach(angular.mock.module('panicApp.Controllers'));
  beforeEach(angular.mock.module('mock.referenceDataServices'));


  beforeEach(angular.mock.inject(function($rootScope, Range, $window, $location, $routeParams, $controller) {
    scope = $rootScope.$new;
    range = Range;
    rootScope = $rootScope;
    win = $window;
    location = $location;
    routeParams = $routeParams;
    ctrl = $controller;

    _gaqArrayLength = win._gaq.length;

    expect(rootScope.$$listeners.hasOwnProperty('$viewContentLoaded')).to.equal(false);

  }));

  describe('SilhouetteCtrl', function () {
    beforeEach(function(){
      console.log('creating SilhouetteCtrl controller');

      ctrl('SilhouetteCtrl',
        {
          $scope: scope
          , Range: range
          , $rootScope: rootScope
          , $window: win
          , $location:location.path(path)
          , $routeParams:routeParams
        });
    });

    it('should change add a $viewContentLoaded listener to the $rootScope', function() {
      checkForViewContentLoadedListener();
    });

    it('should change add a _trackPageview to the Google Analytics Queue on the window', function() {
      checkForTrackPageviewOnWindow();
    });

    it('should attach Design Category data into page scope', function () {
      expect(scope.silhouettes).to.equal(range.designCategories());
    });
  });

  //--------------------
  // TODO - how to extract these to common file
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
  //--------------------
  // Create a mock reference Data Service
  //--------------------
  angular.module('mock.referenceDataServices', [])
    .factory('Range', function() {
      return {
        designCategories : function() { return "designCategories";},
        dressCollection : function() { return "dressCollection";}
      }});
});