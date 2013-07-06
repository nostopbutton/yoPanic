'use strict';

angular.module('panicApp.Controllers')
  .controller('DressCollectionCtrl', ['$scope', 'Range',
    '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Dress Collection data into page scope
      $scope.dresses = Range.itemCollection();

    }]);
