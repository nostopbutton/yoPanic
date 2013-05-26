'use strict';

angular.module('panicApp.Controllers')
  .controller('SilhouetteCtrl', ['$scope', 'Range',
              '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Design Catalogue data into page scope
      $scope.silhouettes = Range.designCatalogue();

    }]);
