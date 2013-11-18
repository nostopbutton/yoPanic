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
          console.log("$scope.styles.length: "+$scope.styles.length);

        }
      );
//      $http.jsonp('http://filltext.com/?rows=10&delay=5&fname={firstName}&callback=JSON_CALLBACK')
//      var response003 = $http.get('/images/003.png');
//      var response008 = $http.get('/images/008.png');

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
      $scope.headline = "CREATE before you PLEDGE"
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