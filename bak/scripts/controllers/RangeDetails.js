'use strict';

angular.module('panicApp.Controllers')
  .controller('RangeDetailsCtrl', ['$scope', '$routeParams', 'Range',
              '$rootScope', '$window', '$location',
      function ($scope, $routeParams, Range,
                $rootScope, $window, $location) {

    // Fire Google Analytics on Angular page load
    $rootScope.$on('$viewContentLoaded',  track($window, $location, $routeParams));

    // Put Design Collection data into page scope
    $scope.ranges = Range.query();
    $scope.range = Range.get({rangeId : $routeParams.rangeId});

  }]);
