'use strict';

angular.module('panicApp.Controllers')
  .controller('StaticPageCtrl', ['$scope', '$rootScope', '$window', '$location', '$routeParams', '$anchorScroll',
      function ($scope, $rootScope, $window, $location, $routeParams, $anchorScroll) {
        trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

        $scope.scrollTo = function(id) {
          $location.hash(id);
          $anchorScroll();
        }

      }]);