'use strict';

angular.module('panicApp.Controllers')
  .controller('ShopItemCtrl', ['$scope', 'Range', 'ReferenceDataCache',
    '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range, ReferenceDataCache,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Style data into page scope
      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
      ReferenceDataCache.getItemById($routeParams.itemId, $scope);

    }]);
