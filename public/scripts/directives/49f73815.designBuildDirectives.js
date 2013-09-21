'use strict';

var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);

designBuildDirective.directive('designBreadcrumb', function () {
  return  {
    restrict: 'A',
    scope: {
      step: "@"
    },
    template: '<ul class="breaded">' +
      '<li ng-class="{active: step == \'customize\'}"><a href="#">Customize</a></li>' +
      '<li ng-class="{active: step == \'sizing\'}"><a href="#">Sizing</a></li>' +
      '<li ng-class="{active: step == \'review\'}"><a href="#">Review design</a></li>' +
      '<li ng-class="{active: step == \'checkout\'}"><a href="#">Checkout</a></li>' +
      '</ul>'
  }
})

designBuildDirective.directive('shopBreadcrumb', function () {
  return  {
    restrict: 'A',
    scope: {
      step: "@"
    },
    template: '<ul class="breaded">' +
      '<li ng-class="{active: step == \'shop\'}"><a href="#">Shop collection</a></li>' +
      '<li ng-class="{active: step == \'sizing\'}"><a href="#">Sizing</a></li>' +
      '<li ng-class="{active: step == \'review\'}"><a href="#">Review design</a></li>' +
      '<li ng-class="{active: step == \'checkout\'}"><a href="#">Checkout</a></li>' +
      '</ul>'
  }
})

designBuildDirective.directive('overview', function () {
  return  {
    restrict: 'A',
    scope: {
      info: "="
    },
    template:
      '<div class="row name">{{info.styleName}}</div>' +
      '<div class="row formal-name">{{info.styleFormalName}}</div>' +
      '<div class="row price">HKD {{info.price}}</div>'
  }
})


designBuildDirective.directive('silhouette', function () {
  return  {
    restrict: 'A',
    scope: {
      style: "="
    },
    template: '<a href="#!/design/{{style.styleId}}"' +
      "onClick=\"_gaq.push(['_trackEvent', 'Silhouettes', 'customize', '{{style.styleId}}']);\">" +
      '<div class="row image">' +
      '<div class="col-lg-12 ">' +
      //<!--{{style.silhouetteImage}}-->
      '<img ng-src="images/silhouettes/{{style.silhouetteImage}}.png">' +
      //<!--<div class="items-sprite {{dress.itemId}}"></div>-->
      '</div>' +
      '</div>' +
      '<div class="row title">{{style.styleName}}</div>' +
      '<div class="row type">({{style.styleFormalName}})</div>' +
      '<div class="row price">from HKD {{style.price}}</div>' +
      '<div class="row item customize">' +
      '<button class="btn btn-danger" id="review-dress">Customize</button>' +
      '</div>' +
      '</a>'
  }
})

designBuildDirective.directive('description', function () {
  return  {
    restrict: 'A',
    scope: {
      step: "="
    },
    template: '<ol class="breadcrumb">' +
      '<li ng-class="{active: step == \'customize\'}">Customize</li>' +
      '<li ng-class="{active: step == \'sizing\'}">Sizing</li>' +
      '<li ng-class="{active: step == \'review\'}">Review design</li>' +
      '<li ng-class="{active: step == \'checkout\'}">Checkout</li>' +
      '</ol>'
  }
})


designBuildDirective.directive('drawDress', function () {
  return  {
    scope: {
      dress: "="
    },
    template: '<div ng-repeat="selection in dress" class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.fabric}}"></div>'
//    template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})

designBuildDirective.directive('drawTrim', function () {
  return  {
    scope: {
      dress: "="
    },
//    template: '<div ng-repeat="selection in dress" class="pic {{selection.type}} db-parts-sprite {{selection.type}}-{{selection.id}}-{{selection.fabric}}"></div>'
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/trm-{{selection.type}}-{{selection.id}}-{{selection.trim}}.png" class="pic {{selection.type}}"/>'
  }
})

designBuildDirective.directive('drawExtras', function () {
  return  {
    scope: {
      extras: "="
    },
    template: '<img ng-repeat="selection in extras" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})


designBuildDirective.directive('fabricSelector', function () {
  return  {
    restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      fabricSet: "=", selectedOption: "=", isTrim: "="
    },
    template:
      ' <div class="fabric-group">' +
      '   <div class="row fabric-header">' +
      '     {{fabricSet.setName}}' +
      '   </div>' +
      '    <div class="row ">' +
      '    <div ng-switch on="isTrim" >' +
      '      <div draw-trim-fabrics ng-switch-when="true" selection="fabricSet" selected-option="selectedOption"></div>' +
      '      <div draw-fabrics ng-switch-default selection="fabricSet" selected-option="selectedOption"></div>' +
      '     </div>' +
      '  </div>' +
      '</div>'

  }
})

designBuildDirective.directive('drawFabrics', function () {
  return  {
    scope: {
//      restrict:'E',
      selection: "=", selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
      'ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  }
})


designBuildDirective.directive('drawTrimFabrics', function () {
  return  {
    scope: {
//      restrict:'E',
      selection: "=", selectedOption: "="
    },

    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  }
})

designBuildDirective.directive('drawAdmin', function () {
  return  {
    scope: {
      dress: "="
    },
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  }
})

