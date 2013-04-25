'use strict';

angular.module('panicApp.Controllers')
  .controller('HomeCarouselCtrl', ['$scope', function ($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [
      {image: 'images/kitten1.jpeg',text: 'Kitten.'},
      {image: 'images/kitten2.jpeg',text: 'Kitty!'},
      {image: 'images/kitten3.jpeg',text: 'Cat.'},
    ];
  }]);
