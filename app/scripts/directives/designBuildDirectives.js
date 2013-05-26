'use strict';

var designBuild = angular.module('panicApp.designBuildDirectives', []);

designBuild.directive('drawDress', function (){
  return  {
    scope: {
      dress:"="
    },
//    template: '<div ng-repeat="selection in dress" class="pic {{selection.type}} db-parts-sprite {{selection.type}}-{{selection.id}}-{{selection.fabric}}"></div>'
        template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})

designBuild.directive('drawTrim', function (){
  return  {
    scope: {
      dress:"="
    },
//    template: '<div ng-repeat="selection in dress" class="pic {{selection.type}} db-parts-sprite {{selection.type}}-{{selection.id}}-{{selection.fabric}}"></div>'
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/trm-{{selection.type}}-{{selection.id}}-{{selection.trim}}.png" class="pic {{selection.type}}"/>'
  }
})

designBuild.directive('drawExtras', function (){
  return  {
    scope: {
      extras:"="
    },
    template: '<img ng-repeat="selection in extras" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})


designBuild.directive('fabricSelector', function (){
  return  {
    restrict:'E',
    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      fabricSet:"="
      , selectedOption: "="
      , isTrim: "="
    }
  }
})

designBuild.directive('drawFabrics', function (){
  return  {
    scope: {
//      restrict:'E',
      selection:"="
      ,selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  }
})


designBuild.directive('drawTrimFabrics', function (){
  return  {
    scope: {
//      restrict:'E',
      selection:"="
      ,selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  }
})


