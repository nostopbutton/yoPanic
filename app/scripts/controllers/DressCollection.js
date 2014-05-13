'use strict';

angular.module('panicApp.Controllers')
    .controller('DressCollectionCtrl', ['$scope', 'Range', 'CatalogueService',
        '$rootScope', '$window', '$location', '$routeParams',
        function ($scope, Range, CatalogueService, $rootScope, $window, $location, $routeParams) {

            trackPageInGoogleAnalytics($rootScope,  $scope, $window, $location, $routeParams);

            // Put Dress Collection data into page scope
            var stylesPromise = CatalogueService.getStyleListPromise();
            var styles = [];

            stylesPromise.then(function (result) {  // this is only run after $http completes
                styles = result;

                var itemsPromise = CatalogueService.getItemCollectionWithStyleDataPromiseForStyles(
                    ['sheath', 'doloman', 'swing', 'swoosh'
                        , 'shift', 'shirt', 'shirt-maxi', 'flare']);
                var items = [], itemIds = [];

                itemsPromise.then(function (result) {  // this is only run after $http completes
                    $scope.dresses = angular.copy(_.shuffle(result));
                    $scope.dresses_string =   JSON.stringify(result, undefined , 3);
                    ;
                });

            });
            $scope.gaEvent = function(category, action, label) {
                $window.ga('send', 'event', category, action, label);
            }

            $scope.imageFilename = "dress.png";
            $scope.rolloverFilename = "front.jpg";
//      var silhouettes_reset, types_reset;

            $scope.silhouettes = [
                { id: '', label: '-- All silhouettes --'},

                { id: 'sheath', label: 'Sheath'},
                { id: 'swing', label: 'Swing'},
                { id: 'swoosh', label: 'Swoosh'},
                { id: 'doloman', label: 'Doloman'},
                { id: 'flare', label: 'Flare'},
                { id: 'bustier', label: 'Bustier'},
                { id: 'shirt', label: 'Shirt'},
                { id: 'shift', label: 'Shift'},
                { id: 'Top', label: 'Tops'}

            ];

            $scope.types = [
                { id: '', label: '-- All dresses --'},
                { id: 'dress', label: 'Dress'},
                { id: 'skirt', label: 'Skirt'},
                { id: 'top', label: 'Top'}
            ];

            $scope.fabricTypes = [
                { id: '', label: '-- All fabrics --'},
                { id: 'dress', label: 'Crepe'},
                { id: 'skirt', label: 'Silk'},
                { id: 'faux-leather', label: 'Leather'},
                { id: 'sheer-silk', label: 'Sheer Silk'},
                { id: 'cotton', label: 'Stretch Cotton'},
                { id: 'floral-prints', label: 'Floral prints'},
                { id: 'zebra-prints', label: 'Zebra prints'}

            ];

            $scope.colours = [
                { id: '', label: '-- All colours --'},
                { id: 'red', label: 'Red'},
                { id: 'blue', label: 'Blue'},
                { id: 'black', label: 'Black'},
                { id: 'cream', label: 'Cream'},
                { id: 'aubergine', label: 'Aubergine'},
                { id: 'pink', label: 'Pink'},
                { id: 'teal', label: 'Teal'},
                { id: 'coral', label: 'Coral'},
                { id: 'cobalt', label: 'Cobalt'}
            ];

            $scope.silhouetteFilter = $scope.silhouettes[0].id;
            $scope.typeFilter = $scope.types[0].id;
            $scope.fabricTypeFilter = $scope.types[0].id;
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
                $scope.fabricTypeFilter = $scope.types[0].id;
                $scope.colourFilter = $scope.colours[0].id;
            }

//      $scope.reset();

        }]);
