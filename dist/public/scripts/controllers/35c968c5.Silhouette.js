'use strict';

angular.module('panicApp.Controllers')
  .controller('SilhouetteCtrl', ['$scope', 'Range',
              '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Style Catalogue data into page scope
      $scope.styles = Range.styleCatalogue(
        function (data) {   //success
          console.log("$scope.styles.length: "+$scope.styles.length);

        }
      );


    }]);
