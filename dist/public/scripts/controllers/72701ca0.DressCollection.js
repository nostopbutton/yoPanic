'use strict';

angular.module('panicApp.Controllers')
    .controller('DressCollectionCtrl', ['$scope', 'Range', 'CatalogueService',
        '$rootScope', '$window', '$location', '$routeParams',
        function ($scope, Range, CatalogueService, $rootScope, $window, $location, $routeParams) {

            trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

            // Put Dress Collection data into page scope
            var stylesPromise = CatalogueService.getStyleListPromise();
            var styles = [];

            stylesPromise.then(function (result) {  // this is only run after $http completes
                styles = result;

                var itemsPromise = CatalogueService.getItemCollectionWithStyleDataPromiseForStyles(
                    ['sheath', 'swing', 'flare', 'doloman', 'swoosh'
                        , 'shift', 'shirt', 'shirt-maxi']);
                var items = [], itemIds = [];

                itemsPromise.then(function (result) {  // this is only run after $http completes
                    $scope.dresses = angular.copy(result);
                    ;
                });

            });

//      var silhouettes_reset, types_reset;

            $scope.silhouettes = [
                { id: '', label: '-- All silhouettes --'},
                { id: 'sheath', label: 'COCO (Sheath)'},
                { id: 'swing', label: 'AUDREY (Swing)'},
                { id: 'flare', label: 'ALEXA (Flare)'},
                { id: 'doloman', label: 'CHRISTINA (Doloman)'},
                { id: 'swoosh', label: 'KATE (Swoosh)'},
                { id: 'shift', label: 'EDDIE (Shift)'},
                { id: 'shirt', label: 'ELLE (Shirt)'},
                { id: 'maxi-shirt', label: 'CLAUDIA (Maxi-shirt)'}
            ];

            $scope.types = [
                { id: '', label: '-- All dresses --'},
                { id: 'dress', label: 'Dress'},
                { id: 'skirt', label: 'Skirt'},
                { id: 'top', label: 'Top'}
            ];

            $scope.colours = [
                { id: '', label: '-- All colours --'},
                { id: 'red', label: 'Red'},
                { id: 'blue', label: 'Blue'},
                { id: 'black', label: 'Black'}
            ];

            $scope.silhouetteFilter = $scope.silhouettes[0].id;
            $scope.typeFilter = $scope.types[0].id;
            $scope.colourFilter = $scope.colours[0].id;

//            $scope.silFilter = { id: '', label: 'All'};

//            $scope.updateSilFilter = function(val){
//                alert (val);
//                $scope.silFilter = val;
//                alert (val);
//            }

//      $scope.search = function (item){
//        var found = false;
//        for(var i = 0; i < $scope.silhouettes.length; i++) {
//          if ($scope.silhouettes[i].id == item.styleId) {
//            console.log("Found dress: "+ item.styleId + " checked: "+ $scope.silhouettes[i].checked)
//            if ($scope.silhouettes[i].checked) {
//              for(var i = 0; i < $scope.types.length; i++) {
//                if ($scope.types[i].id == item.catId) {
//                  console.log("Found type: "+ item.catId + " checked: " + $scope.types[i].checked)
//                  if ($scope.types[i].checked)
//                    found = true;
//                }
//              }
//            }
//            break;
//          }
//        }
//        return found;
//      };

            $scope.reset = function () {
                $scope.silhouetteFilter = $scope.silhouettes[0].id;
                $scope.typeFilter = $scope.types[0].id;
                $scope.colourFilter = $scope.colours[0].id;
            }

//      $scope.reset();

        }]);
