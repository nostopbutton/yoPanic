'use strict';

angular.module('panicApp.Controllers')
  .controller('StaticPageCtrl', ['$rootScope', '$window', '$location', '$routeParams',
      function ($rootScope, $window, $location, $routeParams) {

        trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
  }]);