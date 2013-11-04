'use strict';

angular.module('panicApp.Controllers')
  .controller('StaticPageCtrl', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
      function ($scope, $rootScope, $window, $location, $routeParams) {
        trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
  }]);