'use strict';

angular.module('panicApp.Controllers')
  .controller('ShopItemCtrl', ['$scope', 'Range', 'ReferenceDataCache', 'CatalogueService',
    '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range, ReferenceDataCache, CatalogueService,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Style data into page scope
//      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
//      ReferenceDataCache.getItemById($routeParams.itemId, $scope);

        CatalogueService.getItemPromise( $routeParams.styleId, $routeParams.itemId ).then(function(result) {  // this is only run after $http completes
            $scope.item = angular.copy(result);
        });



    }]);
