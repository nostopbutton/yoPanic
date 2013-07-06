'use strict';

angular.module('panicApp.Controllers')
.controller('HomeCarouselCtrl', ['$scope','$rootScope', '$window', '$location', '$routeParams',
  function ($scope, $rootScope, $window, $location, $routeParams) {

    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);

    $scope.myInterval = 5000;
    $scope.slides = [
      {image: 'images/home/Choose.png',text: 'Choose...'},
      {image: 'images/home/Customize.png',text: 'Customize...'},
      {image: 'images/home/Cherish.png',text: 'Cherish!'}
//      {image: 'images/kitten2.jpeg', class:"img-circle", text: 'Cherish!'}
    ];
  }]);