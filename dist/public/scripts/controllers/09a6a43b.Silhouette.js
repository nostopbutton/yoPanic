'use strict';

angular.module('panicApp.Controllers')
  .controller('SilhouetteCtrl', ['$scope', 'Range',
              '$rootScope', '$window', '$location', '$routeParams', '$http', '$q',
    function ($scope, Range,
              $rootScope, $window, $location, $routeParams, $http, $q) {

      $scope.$emit('LOAD')

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

      // Put Style Catalogue data into page scope
      $scope.styles = Range.styleCatalogue(
        function (data) {   //success
          console.log("styles.length: "+$scope.styles.length);

        }
      );

      var perks_reset, perkChecked, perkValues;

      perks_reset = [
        { id: 'all', label: 'View all', default: true,  values: ['skirt', 'top', 'dress', 'silk', 'maxi'] },
        { id: 'separates', label: 'Perfect Skirt or Top ($140)',   values: ['skirt', 'top'] },
        { id: 'silk_dress', label:'Perfect Silk Dress ($210)',   values: ['silk'] },
        { id: 'tailored_dress', label: 'Perfect Tailored Dress ($235)',   values: [ 'dress'] },
        { id: 'skirt_and_top', label: 'Perfect Skirt and Top ($285)',   values: ['skirt', 'top'] },
        { id: 'silk_maxi', label: 'Perfect Silk Maxi Dress ($290)',   values: [ 'maxi'] },
        { id: 'bundles', label: ' Multi-Dress Bundles',  values: [ 'silk', 'maxi','dress'] }
      ];

      $scope.perkValues = "";


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


      $scope.search = function (item){
        var found = false;
        console.log("$scope.perkValues: "+ JSON.stringify($scope.perkValues))
        console.log("item.type: "+ JSON.stringify(item.type))
        for(var i = 0; i < $scope.perkValues.length; i++) {
          if ($scope.perkValues[i] == item.type) {
            console.log("Found dress: "+ item.type + " checked: "+ $scope.perkValues[i])
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

      $scope.reset = function (){
//        $scope.perkChecked = angular.copy(perks_reset[0].id);
        $scope.perkValues = angular.copy(perks_reset[0].values);
        $scope.perks = angular.copy(perks_reset);
//        $scope.types = angular.copy(types_reset);
      }

      $scope.reset();

      var aggregatedPromise = $q.all([
        $http.get('/images/003.png'),
        $http.get('/images/008.png'),
        $http.get('/images/010.png'),
        $http.get('/images/011.png'),
        $http.get('/images/013.png'),
        $http.get('/images/014.png'),
        $http.get('/images/085.png'),
        $http.get('/images/088.png'),
        $http.get('/images/089.png'),
        $http.get('/images/120.png'),
        $http.get('/images/160.png'),
        $http.get('/images/161.png'),
        $http.get('/images/165.png'),
        $http.get('/images/166.png'),
        $http.get('/images/168.png'),
        $http.get('/images/169.png'),
        $http.get('/images/170.png')

      ])

      aggregatedPromise.then(
        function(){
          $scope.$emit('UNLOAD');
        });
//        .success(function(data){
////          $scope.people=data
//          $scope.$emit('UNLOAD')
//        })

    }])
  .controller('appController',['$scope', '$location', '$anchorScroll' ,function($scope, $location, $anchorScroll){
    if($location.path()=='/how-to-help')
    {
      $scope.headline = "How YOU can HELP..."
    } else {
      $scope.headline = "Send us YOUR design"
    }

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    }

//    console.log("Location.path is: ");
//    console.log($location.path());
    $scope.$on('LOAD',function(){$scope.loading=true});
    $scope.$on('UNLOAD',function(){$scope.loading=false});
  }])
  .controller('MetaCtrl',['$scope', 'MetaData',function($scope, MetaData){
    $scope.data = MetaData;
  }])
  .controller('MetaCtrlInput',['$scope', 'MetaData',function($scope, MetaData){
    $scope.data = MetaData;
  }]);