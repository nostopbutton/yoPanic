'use strict';

angular.module('panicApp.Controllers')
    .controller('SilhouetteCtrl', ['$scope', 'Range',
        '$rootScope', '$window', '$location', '$routeParams', '$http', '$q',
        function ($scope, Range, $rootScope, $window, $location, $routeParams, $http, $q) {

            $scope.$emit('LOAD')

            trackPageInGoogleAnalytics($rootScope, $scope, $window, $location, $routeParams);

            // Put Style Catalogue data into page scope
            $scope.styles = Range.styleCatalogue(
                function (data) {   //success
//          console.log("styles.length: "+$scope.styles.length);
// TODO - promises
                }
            );
            $scope.gaEvent = function(category, action, label) {
                $window.ga('send', 'event', category, action, label);
            }

            var perks_reset, perkChecked, perkValues;

            perks_reset = [
                { id: 'all', label: 'View all', default: true, values: ['skirt', 'top', 'dress', 'silk', 'maxi'] },
                { id: 'separates', label: 'Perfect Skirt or Top', values: ['skirt', 'top'] },
                { id: 'silk_dress', label: 'Perfect Silk Dress', values: ['silk'] },
                { id: 'tailored_dress', label: 'Perfect Tailored Dress', values: [ 'dress'] },
                { id: 'skirt_and_top', label: 'Perfect Skirt and Top', values: ['skirt', 'top'] },
                { id: 'silk_maxi', label: 'Perfect Silk Maxi Dress', values: [ 'maxi'] },
                { id: 'bundles', label: ' Multi-Dress Bundles', values: [ 'silk', 'maxi', 'dress'] },
                { id: 'gift', label: ' GIFT BOX (Voucher)', values: [ 'silk', 'dress'] }
            ];

            $scope.perkValues = "";

            $scope.filterStyles = [
                { id: '', label: '-- All styles --'},
                { id: 'swing', label: 'Swing'},
                { id: 'sheath', label: 'Sheath'},
                { id: 'shirt', label: 'Shirt'},
                { id: 'shift', label: 'Shift'},
                { id: 'flare', label: 'Flare'},
                { id: 'doloman', label: 'Doloman'}


            ];

            $scope.filterTypes = [
                { id: '', label: '-- All types --'},
                { id: 'skirt', label: 'Skirt'},
                { id: 'top', label: 'Top'},
                { id: 'dress', label: 'Dress'},
                { id: 'belt', label: 'Belt'}
            ];

            $scope.filterFabrics = [
                { id: '', label: '-- All fabric groups --'},
                { id: 'silk', label: 'Silks'},
                { id: 'crepe', label: 'Crepe'},
                { id: 'cotton', label: 'Stretch cotton'},
                { id: 'leather', label: 'Leather'}

            ];

//        $scope.styleFilter = $scope.filterStyles[0].id;
//        $scope.typeFilter = $scope.filterTypes[0].id;
//        $scope.fabricFilter = $scope.filterFabrics[0].id;
//        $scope.fabricFilter = $scope.filterFabrics[0].id;

            $scope.reset = function () {
                $scope.styleFilter = $scope.filterStyles[0].id;
                $scope.typeFilter = $scope.filterTypes[0].id;
                $scope.fabricFilter = $scope.filterFabrics[0].id;
                $scope.fabricFilter = $scope.filterFabrics[0].id;
            }

//      $scope.search = function (item){
//        var found = false;
//        for(var i = 0; i < $scope.perks.length; i++) {
//          if ($scope.perks[i].id == item.silId) {
//            console.log("Found dress: "+ item.silId + " checked: "+ $scope.perks[i].checked)
//            if ($scope.perks[i].checked) {
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


            $scope.search = function (item) {
                var found = false;
                console.log("$scope.perkValues: " + JSON.stringify($scope.perkValues))
                console.log("item.type: " + JSON.stringify(item.type))
                for (var i = 0; i < $scope.perkValues.length; i++) {
                    if ($scope.perkValues[i] == item.type) {
                        console.log("Found dress: " + item.type + " checked: " + $scope.perkValues[i])
//            if ($scope.perks[i].checked) {
//              for(var i = 0; i < $scope.types.length; i++) {
//                if ($scope.types[i].id == item.catId) {
//                  console.log("Found type: "+ item.catId + " checked: " + $scope.types[i].checked)
//                  if ($scope.types[i].checked)
                        found = true;
//                }
//              }
//            }
                        break;
                    }
                }
                return found;
            };

//      $scope.reset = function (){
////        $scope.perkChecked = angular.copy(perks_reset[0].id);
//        $scope.perkValues = angular.copy(perks_reset[0].values);
//        $scope.perks = angular.copy(perks_reset);
////        $scope.types = angular.copy(types_reset);
//      }

            $scope.reset();

            var aggregatedPromise = $q.all([
//                $http.get('/images/000.png'),
                $http.get('/images/003.png'),
                $http.get('/images/008.png'),
                $http.get('/images/010.png'),
                $http.get('/images/011.png'),
                $http.get('/images/013.png'),
                $http.get('/images/014.png'),
                $http.get('/images/085.png'),
                $http.get('/images/087.png'),
                $http.get('/images/088.png'),
                $http.get('/images/089.png'),
                $http.get('/images/091.png'),

////                $http.get('/images/103.png'),
////                $http.get('/images/111.png'),
////                $http.get('/images/112.png'),
////                $http.get('/images/114.png'),
////                $http.get('/images/116.png'),
////                $http.get('/images/118.png'),
//                $http.get('/images/120.png')
                $http.get('/images/300.png'),
                $http.get('/images/301.png'),
                $http.get('/images/302.png'),
                $http.get('/images/303.png'),
                $http.get('/images/304.png'),
                $http.get('/images/305.png'),
                $http.get('/images/406.png'),
                $http.get('/images/407.png'),
                $http.get('/images/408.png'),
                $http.get('/images/410.png'),
                $http.get('/images/411.png'),
                $http.get('/images/412.png')
            ])

            aggregatedPromise.then(
                function () {
                    $scope.$emit('UNLOAD');
                });
//        .success(function(data){
////          $scope.people=data
//          $scope.$emit('UNLOAD')
//        })

        }])
    .controller('appController', ['$scope', '$location', '$anchorScroll' , function ($scope, $location, $anchorScroll) {
        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        }

        $scope.$on('LOAD', function () {
            $scope.loading = true
        });
        $scope.$on('UNLOAD', function () {
            $scope.loading = false
        });
    }])
    .controller('MetaCtrl', ['$scope', 'MetaData', function ($scope, MetaData) {
        $scope.data = MetaData;
    }])
    .controller('MetaCtrlInput', ['$scope', 'MetaData', function ($scope, MetaData) {
        $scope.data = MetaData;
    }]);