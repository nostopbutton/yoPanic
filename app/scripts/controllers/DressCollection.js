'use strict';

angular.module('panicApp.Controllers')
  .controller('DressCollectionCtrl', ['$scope', 'Range',
    '$rootScope', '$window', '$location', '$routeParams',
    function ($scope, Range,
              $rootScope, $window, $location, $routeParams) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Dress Collection data into page scope
      $scope.dresses = Range.itemCollection();

      var silhouettes_reset, types_reset;

      silhouettes_reset = [
        { id: 'sheath', label:'COCO (Sheath)',   checked: true },
        { id: 'swing', label: 'AUDREY (Swing)',   checked: true },
        { id: 'flare', label: 'ALEXA (Flare)',   checked: true },
          { id: 'doloman', label: 'CHRISTINA (Doloman)',   checked: true },
          { id: 'swoosh', label: 'KATE (Swoosh)',   checked: true },
          { id: 'shift', label: 'EDDIE (Shift)',   checked: true },
          { id: 'shirt', label: 'ELLE (Shirt)',   checked: true },
          { id: 'maxi-shirt', label: 'CLAUDIA (Maxi-shirt)',   checked: true }
      ];

        types_reset = [
        { id: 'dress', label: 'Dress',   checked: true },
        { id: 'skirt', label:'Skirt',   checked: true }
      ];

      $scope.search = function (item){
        var found = false;
        for(var i = 0; i < $scope.silhouettes.length; i++) {
          if ($scope.silhouettes[i].id == item.silId) {
            console.log("Found dress: "+ item.silId + " checked: "+ $scope.silhouettes[i].checked)
            if ($scope.silhouettes[i].checked) {
              for(var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].id == item.catId) {
                  console.log("Found type: "+ item.catId + " checked: " + $scope.types[i].checked)
                  if ($scope.types[i].checked)
                    found = true;
                }
              }
            }
            break;
          }
        }
        return found;
      };

      $scope.reset = function (){
        $scope.silhouettes = angular.copy(silhouettes_reset);
        $scope.types = angular.copy(types_reset);
      }

      $scope.reset();

    }]);
