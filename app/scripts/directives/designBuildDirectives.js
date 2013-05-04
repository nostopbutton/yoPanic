'use strict';

var designBuildDirectives = angular.module('panicApp.designBuildDirectives', []);

designBuildDirectives.directive('fabrics', function (){
  return  {
    scope: {
      selection:"=",
      selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'fabric\']" btn-radio="fabric"></button>'

  }
})

designBuildDirectives.directive('drawDress', function (){
  return  {
    scope: {
      dress:"="
    },
//    template: '<div ng-repeat="selection in dress" class="pic {{selection.type}} db-parts-sprite {{selection.type}}-{{selection.id}}-{{selection.fabric}}"></div>'
        template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})

designBuildDirectives.directive('drawFabrics', function (){
  return  {
    scope: {
      selection:"=",
      selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'

  }
})



//designBuildDirectives.directive('fabricPanel', function (){
//  return  {
//    scope: {
//      selectedOption:"="
//    },
//
//    template: '<button ng-repeat="opt_fabric in selectedOption.type | fabricLookup" type="button" class="btn selector option fabric{{opt_fabric}}" ng-model="selectedOption[\'fabric\']" btn-radio="opt_fabric"></button>'
//
//  }
//})

//designBuildDirectives.directive('trimPanel', function (){
//  return  {
//    scope: {
//      selection:"="
//    },
//
//    template: '<button ng-repeat="trim in selection.type | trimLookup" type="button" class="btn selector option trim{{trim.trimId}}" ng-model="selection[\'trim\'][\'type\']" btn-radio="trim.trimId"></button>'
//
//  }
//})
//
//designBuildDirectives.directive('fabricTrimPanel', function (){
//  return  {
//    scope: {
//      selection:"="
//    },
//
//    template: '<button ng-repeat="trim_fabric in selection.trim.type | trimFabricLookup" type="button" class="btn selector option fabric{{trim_fabric}}" ng-model="selection[\'trim\'][\'fabric\']" btn-radio="trim_fabric"></button>'
//
//  }
//})

//designBuildDirectives.directive('test', function (){
//  return  {
//    template: "<div>Hello {{myName}}</div>",
//    link: function (scope, element, attrs) {
//      scope.myName = attrs.name
//    }
//  }
//})

