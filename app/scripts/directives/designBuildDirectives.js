'use strict';

var designBuildDirectives = angular.module('panicApp.designBuildDirectives', []);

designBuildDirectives.directive('fabricPanel', function (){
  return  {
    scope: {
      selectedOption:"="
    },

    template: '<button ng-repeat="opt_fabric in selectedOption.type | fabricLookup" type="button" class="btn selector option fabric{{opt_fabric}}" ng-model="selectedOption[\'fabric\']" btn-radio="opt_fabric"></button>'

  }
})

designBuildDirectives.directive('trimPanel', function (){
  return  {
    scope: {
      selectedOption:"="
    },

    template: '<button ng-repeat="opt_trim in selectedOption.type | trimLookup" type="button" class="btn selector option trim{{opt_trim.trimId}}" ng-model="selectedOption[\'trim\'][\'type\']" btn-radio="opt_trim.trimId"></button>'

  }
})

designBuildDirectives.directive('fabricTrimPanel', function (){
  return  {
    scope: {
      selectedOption:"="
    },

    template: '<button ng-repeat="opt_trim_fabric in selectedOption.trim.type | trimFabricLookup" type="button" class="btn selector option fabric{{opt_trim_fabric}}" ng-model="selectedOption[\'trim\'][\'fabric\']" btn-radio="opt_trim_fabric"></button>'

  }
})

designBuildDirectives.directive('test', function (){
  return  {
    template: "<div>Hello {{myName}}</div>",
    link: function (scope, element, attrs) {
      scope.myName = attrs.name
    }
  }
})

designBuildDirectives.directive('drawDress', function (){
  return  {
    scope: {
      dress:"="
    },
      template: '<div ng-repeat="selection in dress" class="pic sleeves db-parts-sprite {{selection.type}}-{{selection.fabric}}"></div>'
  }
})