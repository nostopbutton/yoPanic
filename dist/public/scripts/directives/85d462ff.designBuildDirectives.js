'use strict';

var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);

designBuildDirective.directive('drawDesign', function () {
    return  {
        scope: {
            model: "=", design: "="
        },
        template:

            '<div class="db-image body sprite-body {{model}}"></div>'
            + '<div draw-dress parts="design.design"></div>'
            + '<div draw-accessories parts="design.extras"></div>'
    }
})

designBuildDirective.directive('drawDress', function () {
    return  {
        scope: {
            parts: "="
        },
        template:
            '<div ng-repeat="selection in parts">'
            + ' <div class="db-image {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>'
            + ' <div class="db-image trm sprite-{{selection.trim}} trm-{{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.trim}}"></div>'
            + '</div>'
    }
})

designBuildDirective.directive('drawAccessories', function () {
    return  {
        scope: {
            parts: "="
        },
        template:
            '<div ng-repeat="selection in parts">'
            + ' <div class="db-image {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>'
            + '</div>'
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
//                'tooltip="{{value.name}}">' +
                '     <div class="db-icons-sprite {{part.type}}-{{value.id}}" ></div>' +
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

designBuildDirective.directive('trimSelector', function () {
    return  {
        restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
        scope: {
            fabricSet: "=", selectedOption: "=", isTrim: "=", partName: "="
        },
        template:
            ' <div class="col-sm-7">' +
                '   <div class="fabric-group">' +
                '     <div class="row fabric-header">' +
                '       {{fabricSet.setName}} trim' +
                '     </div>' +
                '     <div class="row">' +
                '       <div class="col-sm-3">' +
                '         <button type="button" class="btn fabric-selector fabric-none" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" ' +
//                'tooltip="No trim"' +
//                '             onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"' +
                '>' +
//        '<img ng-src="images/smallicon-36.png"/>' +
            '        </button>' +
            '     </div>' +
            '       <div class="col-sm-9 col-xs-6">' +
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
            'ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" ' +
//            'tooltip="{{fabric.fabName}}"' +
//            'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"' +
            '></button>'
    }
})


//ng-model="form[option.name][part.part_name]['id']" btn-radio="value.id"
designBuildDirective.directive('drawTrimFabrics', function () {
    return  {
        scope: {
//      restrict:'E',
            selection: "=", selectedOption: "="
        },

        template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" ' +
//            'tooltip="{{fabric.fabName}}"' +
//            'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);' +
            '"></button>'
    }
})

designBuildDirective.directive('silhouette', function () {
    return  {
        restrict: 'A',
        scope: {
            design: "="
        },
        template: '<a href="#!/design/{{design.styleId}}"' +
//            "onClick=\"_gaq.push(['_trackEvent', 'Silhouettes', 'customize', '{{design.styleId}}']);\"" +
            ">" +
            '<div class="row image">' +
            '<div class="col-lg-12 ">' +
            //<!--{{style.silhouetteImage}}-->
//      '<img ng-src="images/silhouettes/{{style.silhouetteImage}}.png">' +
            ' <div class="pic sprite-body {{design.silhouetteImage}}"></div>' +
            '</div>' +
            '</div>' +
            '<div class="row title handwriting large-hand">{{design.styleName}}</div>' +
            '<div class="row type handwriting">({{design.styleFormalName}})</div>' +
      '<div class="row price">from HKD {{design.price}}</div>' +
//      '<div class="row item customize">' +
//      '<button class="btn btn-danger" id="review-dress">Customize</button>' +
//      '</div>' +
            '</a>'
    }
})