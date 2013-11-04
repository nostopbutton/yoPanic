'use strict';

angular.module('panicApp.Controllers', ['ngSocial'])
  .controller('StaticPageCtrl', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
      function ($scope, $rootScope, $window, $location, $routeParams) {
        $scope.current_title = 'Test';
        $scope.current_desc = 'Test desc';
        trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
  }]);