'use strict';

var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);

//designBuildDirective.directive('designBreadcrumb', function () {
//  return  {
//    restrict: 'A',
//    scope: {
//      step: "@"
//    },
//    template: '<ul class="breaded">' +
//      '<li ng-class="{active: step == \'customize\'}"><a href="#">Customize</a></li>' +
//      '<li ng-class="{active: step == \'sizing\'}"><a href="#">Sizing</a></li>' +
//      '<li ng-class="{active: step == \'review\'}"><a href="#">Review design</a></li>' +
//      '<li ng-class="{active: step == \'checkout\'}"><a href="#">Checkout</a></li>' +
//      '</ul>'
//  }
//})

designBuildDirective.directive('shopBreadcrumb', function () {
  return  {
    restrict: 'A',
//    scope: {
//      step: "@"
//    },
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

designBuildDirective.directive('designBreadcrumb', function () {
  return  {
    restrict: 'A',
//    scope: {
//      step: "@"
//    },
    template:
      '<ul class=" breaded" id="options">' +
      ' <li class="active"><a href="#design" data-toggle="tab">Customize</a></li>' +
      ' <li><a href="#accessorize" data-toggle="tab">Accessorize</a></li>' +
      ' <li><a href="#sizing" data-toggle="tab">Sizing</a></li>' +
      ' <li><a href="#checkout" data-toggle="tab">Checkout</a></li>' +
      '</ul>'
  }
})



designBuildDirective.directive('silhouette', function () {
  return  {
    restrict: 'A',
    scope: {
      design: "="
    },
    template: '<a href="#!/design/{{design.styleId}}"' +
      "onClick=\"_gaq.push(['_trackEvent', 'Silhouettes', 'customize', '{{design.styleId}}']);\">" +
      '<div class="row image">' +
      '<div class="col-lg-12 ">' +
      //<!--{{style.silhouetteImage}}-->
//      '<img ng-src="images/silhouettes/{{style.silhouetteImage}}.png">' +
      ' <div class="pic sprite-body {{design.silhouetteImage}}"></div>' +
      '</div>' +
      '</div>' +
      '<div class="row title handwriting large-hand">{{design.styleName}}</div>' +
      '<div class="row type handwriting">({{design.styleFormalName}})</div>' +
//      '<div class="row price">from HKD {{style.price}}</div>' +
//      '<div class="row item customize">' +
//      '<button class="btn btn-danger" id="review-dress">Customize</button>' +
//      '</div>' +
      '</a>'
  }
})

//designBuildDirective.directive('description', function () {
//  return  {
//    restrict: 'A',
//    scope: {
//      step: "="
//    },
//    template: '<ol class="breadcrumb">' +
//      '<li ng-class="{active: step == \'customize\'}">Customize</li>' +
//      '<li ng-class="{active: step == \'sizing\'}">Sizing</li>' +
//      '<li ng-class="{active: step == \'review\'}">Review design</li>' +
//      '<li ng-class="{active: step == \'checkout\'}">Checkout</li>' +
//      '</ol>'
//  }
//})

designBuildDirective.directive('facebook', ["$location", function($location) {
  return  {
    scope: {
      design: "="
    },
    template:
      '<a class="btn btn-default igg-design-buttons" ' +
        'href="' +
          'https://www.facebook.com/dialog/feed?app_id=153275411536544' +
          '&name=I+just+designed+this+fabulous+dress+at+AURZA' +
          '&link='+
        encodeURIComponent($location.absUrl()) +
          '&redirect_uri=' +
        encodeURIComponent('http://indiegogo-prototype-designer.aurza.com')+
          '&picture=http://img.aurza.com/' +
          'skt-{{design.design.skirt.id}}-{{design.design.skirt.size}}-{{design.design.skirt.fabric}}-' +
          'slv-{{design.design.sleeves.id}}-{{design.design.sleeves.size}}-{{design.design.sleeves.fabric}}-' +
          'nek-{{design.design.neckline.id}}-{{design.design.neckline.size}}-{{design.design.neckline.fabric}}-' +
          'blt-{{design.extras.belt.id}}-{{design.extras.belt.size}}-{{design.extras.belt.fabric}}-' +
          'ext-{{design.extras.peplum.id}}-{{design.extras.peplum.size}}-{{design.extras.peplum.fabric}}-' +
          'ext-{{design.extras.rosetta.id}}-{{design.extras.rosetta.size}}-{{design.extras.rosetta.fabric}}' +
          '.png' +
          '&caption=www.aurza.com' +
          '&description=You+can+design+your+individual+dress+at+www.aurza.com' +
        '"' +
        'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'{{dress.silId}}/{{dress.itemId}}\']);">'+
        'Facebook</a>'
  }
}])

designBuildDirective.directive('drawDesignPic', function () {
  return  {
    scope: {
      design: "="
    },
    template:
      '<img ng-src="http://img.aurza.com/' +
        'skt-{{design.design.skirt.id}}-{{design.design.skirt.size}}-{{design.design.skirt.fabric}}-' +
        'slv-{{design.design.sleeves.id}}-{{design.design.sleeves.size}}-{{design.design.sleeves.fabric}}-' +
        'nek-{{design.design.neckline.id}}-{{design.design.neckline.size}}-{{design.design.neckline.fabric}}-' +
        'blt-{{design.extras.belt.id}}-{{design.extras.belt.size}}-{{design.extras.belt.fabric}}-' +
        'ext-{{design.extras.peplum.id}}-{{design.extras.peplum.size}}-{{design.extras.peplum.fabric}}-' +
        'ext-{{design.extras.rosetta.id}}-{{design.extras.rosetta.size}}-{{design.extras.rosetta.fabric}}' +
        '.png'+
        '" class="pic body">'
  }
})


designBuildDirective.directive('drawDesign', function () {
  return  {
    scope: {
      design: "="
    },
    template:
      '<div class="pic body sprite-body {{design.model}}"></div>' +
//      '<img ng-src="images/parts/whole body.png" class="pic body">' +
      '<div draw-dress parts="design.design"></div>' +
      '<div draw-accessories parts="design.extras"></div>'
  }
})

designBuildDirective.directive('drawDress', function () {
  return  {
    scope: {
      parts: "="
    },
    template:
      '<div ng-repeat="selection in parts">' +
      ' <div class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>' +
//        ' <div class="pic {{selection.type}} sprite-{{selection.fabric}} dressPartCode()"></div>' +
//      ' <img ng-src="images/parts/trm-{{selection.type}}-{{selection.id}}-{{selection.trim}}.png" class="pic {{selection.type}}"/>' +
      ' <div class="pic trm sprite-{{selection.trim}} trm-{{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.trim}}"></div>' +
      '</div>'
  }
})

designBuildDirective.directive('drawAccessories', function () {
  return  {
    scope: {
      parts: "="
    },
    template:
      '<div ng-repeat="selection in parts">' +
      ' <div class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>' +
      '</div>'
  }
})


designBuildDirective.directive('partSelector', function () {
  return  {
    restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      part: "=", selectedOption: "="
    },
    template:
      ' <div data-toggle="buttons">' +
        '  <!--https://github.com/angular-ui/bootstrap/issues/233-->' +
        '  <div class="option-button" ng-repeat="value in part.values">' +
        '    <button type="button" class="btn btn-default option"' +
        '       ng-model="selectedOption[\'id\']" btn-radio="value.id"' +
        '       ng-class="{highlight: selectedOption[\'id\']==value.id }">' +
        '     <div class="db-icons-sprite {{part.type}}-{{value.id}}" tooltip="{{value.name}}"></div>' +
        '   </button>' +
        '  </div>' +
        '</div>'

  }
})

designBuildDirective.directive('sizeSelector', function () {
  return  {
    restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      part: "=", selectedOption: "="
    },
    template: '<select class="form-control input-sm" ng-model="selectedOption[\'size\']" ng-options="size.id as size.name for size in part.sizes"></select>'
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

designBuildDirective.directive('extrasFabricSelector', function () {
  return  {
    restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      fabricSet: "=", selectedOption: "=", isTrim: "=", type: "="
    },
    template:
        ' <div class="fabric-group middle-inner">' +
        '   <div class="col-md-3 fabric-header">' +
        '     {{fabricSet.setName}}' +
        '   </div>' +
        '    <div class="col-md-9 ">' +
        '      <div ng-switch on="isTrim" >' +
//        '        <div draw-trim-fabrics ng-switch-when="true" selection="fabricSet" selected-option="selectedOption"></div>' +
//        '        <div draw-extras-fabrics ng-switch-default selection="fabricSet" selected-option="selectedOption"></div>' +
              '<button ng-repeat="fabric in fabricSet.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
//              'ng-click="setExtraType(form[option.name][part.part_name]['id'], type)' +
                'ng-click="selectedOption[\'fabric\'] = fabric.fabId; selectedOption[\'id\'] = type" ' +
                'ng-model="selectedOption[\'code\']" btn-radio="type +\'-\'+fabric.fabId" ' +
                'ng-class="{active: form[option.name][part.part_name][\'code\']==type +\'-\'+fabric.fabId }"' +
                'tooltip="{{fabric.fabName}}"' +
                'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);">' +
          '      </button>' +
        '      </div>' +
        '    </div>' +
        '</div>'

  }
})

designBuildDirective.directive('trimSelector', function () {
  return  {
    restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      fabricSet: "=", selectedOption: "=", isTrim: "=", partName: "="
    },
    template:
      ' <div class="col-md-7">' +
      '   <div class="fabric-group">' +
      '     <div class="row fabric-header">' +
      '       {{fabricSet.setName}} trim' +
      '     </div>' +
      '     <div class="row">' +
      '       <div class="col-md-5">' +
      '         <button type="button" class="btn fabric-selector fabric-none" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="No trim"' +
      '             onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);">' +
//        '<img ng-src="images/smallicon-36.png"/>' +
      '        </button>' +
      '     </div>' +
        '       <div class="col-md-5">' +
        '         <div draw-trim-fabrics selection="fabricSet" selected-option="selectedOption"></div>' +        '     </div>' +
      '     </div>' +
      '   </div>' +
//      ' </div>' +
//      ' <div class="col-md-5">' +
//      '   <div class="fabric-group">' +
//      '     <div class="row fabric-header">' +
////      '        {{fabricSet.setName}}' +
//      '     </div>' +
//      '     <div class="row ">' +
//      '       <div ng-switch on="isTrim" >' +
//      '         <div draw-trim-fabrics ng-switch-when="true" selection="fabricSet" selected-option="selectedOption"></div>' +
//      '         <div draw-fabrics ng-switch-default selection="fabricSet" selected-option="selectedOption"></div>' +
//      '       </div>' +
//      '     </div>' +
//      '   </div>' +
      ' </div>'

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

designBuildDirective.directive('drawExtrasFabrics', function () {
  return  {
    scope: {
//      restrict:'E',
      selection: "=", selectedOption: "=", type:"="
    },

    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
      'ng-model="selectedOption[\'code\']" btn-radio="type +\'-\'+fabric.fabId" tooltip="{{selectedOption.id}}-{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  }
})

//ng-model="form[option.name][part.part_name]['id']" btn-radio="value.id"
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

