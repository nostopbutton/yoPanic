'use strict';

var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);

designBuildDirective.directive('styleOverview', function () {
    return  {
        restrict: 'E',
        scope: {
            styleInfo: "="
        },
        template:
            '<div class="container-fluid ">'
            + '<div class="row">'
            + '    <div class="col-md-6">'
            + '        <div class="name">{{styleInfo.styleName}}</div>'
            + '        <div class="formal-name">{{styleInfo.styleFormalName}} </div>'
            + '        <div class="price">HKD {{styleInfo.price | number:0}}</div>'
            + '    </div>'
            + '    <div class="col-md-6">'
            + '        <div class="price-label">TOTAL</div>'

            + '    </div>'
            + '</div>'
            + '<div class="row top-border" style="padding:10px 0 10px 0">'
            + '    <ul>'
            + '        <li class="description">{{styleInfo.strapline}}</li>'
            + '        <li class="description" ng-repeat="para in styleInfo.description">{{para}}</li>'
            + '    </ul>'
            + '</div>'
            + '</div>'
    }
})

designBuildDirective.directive('drawCollection', function () {
    return  {
        scope: {
            item: "=", view:"="
        },
        template:
            ' <div class="image">' +
            '<img ng-src="/images/collection/{{item.itemDesign.itemId}}-md-{{view}}" alt="{{item.style.styleName}} - {{item.itemDesign.itemDesc}}">' +
                '</div>'
//            '<div class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>' +
//            '<div class="pic body sprite-body {{model}}"></div>' +
//            '<div draw-dress parts="design.design"></div>' +
//            '<div draw-accessories parts="design.extras"></div>'
    }
})

designBuildDirective.directive('drawDesign', function () {
    return  {
        scope: {
            model: "=", design: "=", ext: "="
        },
        template:

            '<div class="db-image mob body sprite-body{{ext}} {{model}}"></div>'
            + '<div draw-dress parts="design.design" ext="ext"></div>'
            + '<div draw-accessories parts="design.extras" ext="ext"></div>'
    }
})

designBuildDirective.directive('drawDress', function () {
    return  {
        scope: {
            parts: "=", ext: "="
        },
        template:
            '<div ng-repeat="selection in parts">'
            + ' <div class="db-image mob {{selection.type}} sprite-{{selection.fabric}}{{ext}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>'
            + ' <div class="db-image mob trm sprite-{{selection.trim}}{{ext}} trm-{{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.trim}}"></div>'
            + '</div>'
    }
})

designBuildDirective.directive('drawAccessories', function () {
    return  {
        scope: {
            parts: "=", ext: "="
        },
        template:
            '<div ng-repeat="selection in parts">'
            + ' <div class="db-image mob {{selection.type}} sprite-{{selection.fabric}}{{ext}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>'
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

designBuildDirective.directive('mobPartSelector', function () {
    return  {
        restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
        scope: {
            part: "=", selectedOption: "="
        },
        template:
            ' <div data-toggle="buttons">' +
            '  <div class="mob-button" ng-repeat="value in part.values">' +
            '    <button type="button" class="btn btn-default option"' +
            '       ng-model="selectedOption[\'id\']" btn-radio="value.id"' +
            '       ng-class="{highlight: selectedOption[\'id\']==value.id }">' +
            '     <div class="db-icons-sprite {{part.type}}-{{value.id}}" ></div>' +
            '   </button>' +
            '  </div>' +
            '</div>'

    }
})

designBuildDirective.directive('mobFormPartSelector', function () {
    return  {
        restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
        scope: {
            part: "=", selectedOption: "="
        },
        template:
            '<div class="btn-group" dropdown is-open="status.isopen">' +

            '   <button type="button" class="btn dropdown-toggle" ng-disabled="disabled">' +
            '       Style <span class="caret"></span>' +
            '   </button>' +
            '   <ul class="dropdown-menu" role="menu">' +
            '       <li class="mob-button" ng-repeat="value in part.values">' +
            '           <button type="button" class="btn btn-default option"' +
            '               ng-model="selectedOption[\'id\']" btn-radio="value.id"' +
            '               ng-class="{highlight: selectedOption[\'id\']==value.id }">' +
            '               <div class="db-icons-sprite {{part.type}}-{{value.id}}" ></div>' +
            '           </button>' +
            '       </li>' +
            '   </ul>' +
            '</div>'
    }
})

designBuildDirective.directive('mobPartSelectorPanel', function () {
    return  {
        restrict: 'E',
        scope: {
            part: "=", selectedOption: "="
        },
        template:
            ' <div data-toggle="buttons" style="margin-left:0px;width:160px; border-style: none">' +
            '  <div class="mob-button" ng-repeat="value in part.values">' +
            '    <button type="button" class="btn btn-default option"' +
            '       ng-model="selectedOption[\'id\']" btn-radio="value.id"' +
            '       ng-class="{highlight: selectedOption[\'id\']==value.id }">' +
            '     <div class="db-icons-sprite-mob {{part.type}}-{{value.id}}" ></div>' +
            '   </button>' +
            '  </div>' +
            '</div>'
    }
})

designBuildDirective.directive('sizeSelector', function () {
    return  {
        restrict: 'E',
        scope: {
            part: "=", selectedOption: "="
        },
        template: '<select class="form-control input-sm" ng-model="selectedOption[\'size\']" ng-options="size.id as size.name for size in part.sizes"></select>'
    }
})

designBuildDirective.directive('mobSizeSelector', function () {
    return  {
        restrict: 'E',
        scope: {
            part: "=", selectedOption: "="
        },
        template:
//            '<select class="form-control input-sm" ng-model="selectedOption[\'size\']" ng-options="size.id as size.name for size in part.sizes"></select>'
            '<div class="btn-group" style="margin-left:-11px">' +
            '    <label class="btn btn-primary" ng-model="selectedOption[\'size\']" ng-repeat="size in part.sizes" btn-radio="size.id" style="font-size: 10px">{{size.name}}</label>' +
//            '    <label class="btn btn-primary" ng-model="radioModel" btn-radio="'Middle'">Middle</label>'+
//            '    <label class="btn btn-primary" ng-model="radioModel" btn-radio="'Right'">Right</label>'+
            '</div>'
    }
})




designBuildDirective.directive('fabricSelector', function () {
    return  {
        restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
        scope: {
            fabricSet: "=", selectedOption: "=",  attrib:"="
        },
        template:
            ' <div class="fabric-group">' +
            '   <div class="row fabric-header">' +
            '     {{fabricSet.setName}}' +
            '   </div>' +
            '   <div class="row ">' +
            '       <button ng-repeat="fabric in fabricSet.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
            '           ng-model="selectedOption[attrib]" ' +
            '          btn-radio="fabric.fabId"></button>' +
//                '{{attrib}}' +
            '   </div>' +
            '</div>'
    }
})

designBuildDirective.directive('mobFormFabricSelector', function () {
    return  {
        restrict: 'E',
//    templateUrl: 'template/designBuild/fabric.html',
        scope: {
            fabricSet: "=", selectedOption: "=",  attrib:"="
        },
        template:
            '<div class="btn-group" dropdown is-open="status.isopen">' +
            '   <button type="button" class="btn dropdown-toggle" ng-disabled="disabled">' +
            '       Fabric <span class="caret"></span>' +
            '   </button>' +
            '   <ul class="dropdown-menu" role="menu">' +
            '       <li ng-repeat-start="set in fabricSet">{{set.setName}}</li>' +
            '           <li class="mob-button" ng-repeat="fabric in set.fabrics">' +
            '               <button  type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
            '                   ng-model="selectedOption[attrib]" ' +
            '                    btn-radio="fabric.fabId"></button>' +
            '           </li>' +
            '       <li ng-repeat-end  class="divider"></li>' +
            '   </ul>' +
            '</div>'

    }
})

designBuildDirective.directive('mobFabricSelectorPanel', function () {
    return  {
        restrict: 'E',
        scope: {
            fabricSet: "=", allSets:"=", selectedOption: "=",  attrib:"="
        },
        template:
            ' <div data-toggle="buttons" style="margin-left: 0px;width:160px; border-style: none">' +
            ' <div class="fabric-group" ng-repeat="set in allSets | filterSets:fabricSet">' +
            '   <div class="row fabric-header" style="font-size: 10px">' +
            '     {{set.setName}}' +
            '   </div>' +
            '   <div class="row ">' +
            '       <button ng-repeat="fabric in set.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
            '           ng-model="selectedOption[attrib]" ' +
//            '           ng-class="{active: selectedOption[\'fabric\']==fabric.fabId }' +
            '           btn-radio="fabric.fabId"></button>' +
//                '{{selectedOption}}'+
                ''+
            '   </div>' +
            '   </div>' +
            '</div>'
    }
})

//designBuildDirective.directive('drawFabrics', function () {
//    return  {
////        restrict: 'E',
//        scope: {
//            selection: "=", selectedOption: "=", isTrim: "="
//        },
//
//        template:
//            '<div ng-switch on="isTrim" >' +
//            '   <button ng-switch-when="true" ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
//            '       ng-model="selectedOption[\'trim\']" ' +
//            '       btn-radio="fabric.fabId"></button>' +
//            '   <button ng-switch-default ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' +
//            '       ng-model="selectedOption[\'fabric\']" ' +
//            '       btn-radio="fabric.fabId"></button>' +
//            '</div>'
//    }
//})


//designBuildDirective.directive('trimSelector', function () {
//    return  {
//        restrict: 'E',
////    templateUrl: 'template/designBuild/fabric.html',
//        scope: {
//            fabricSet: "=", selectedOption: "=", isTrim: "=", partName: "="
//        },
//        template:
//            ' <div class="col-sm-12">' +
//                '   <div class="fabric-group">' +
//                '     <div class="row fabric-header">' +
//                '       {{fabricSet.setName}} trim' +
//                '     </div>' +
//                '     <div class="row">' +
//                '       <div class="col-sm-7">' +
//                '         <button type="button" class="btn fabric-selector fabric-none" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId"></button> ' +
////                'tooltip="No trim"' +
////                '             onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"' +
//                '         </button>' +
//                '       </div>' +
//                '       <div class="col-sm-5 ">' +
//                '         <div draw-trim-fabrics selection="fabricSet" selected-option="selectedOption"></div>' +        '     </div>' +
//                '       </div>' +
////                '     </div>' +
////      ' </div>' +
////      ' <div class="col-md-5">' +
////      '   <div class="fabric-group">' +
////      '     <div class="row fabric-header">' +
//////      '        {{fabricSet.setName}}' +
////      '     </div>' +
////      '     <div class="row ">' +
////      '       <div ng-switch on="isTrim" >' +
////      '         <div draw-trim-fabrics ng-switch-when="true" selection="fabricSet" selected-option="selectedOption"></div>' +
////      '         <div draw-fabrics ng-switch-default selection="fabricSet" selected-option="selectedOption"></div>' +
////      '       </div>' +
////      '     </div>' +
////      '   </div>' +
//            ' </div>'
//
//    }
//})


////ng-model="form[option.name][part.part_name]['id']" btn-radio="value.id"
//designBuildDirective.directive('drawTrimFabrics', function () {
//    return  {
//        scope: {
////      restrict:'E',
//            selection: "=", selectedOption: "="
//        },
//
//        template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" ' +
////            'tooltip="{{fabric.fabName}}"' +
////            'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);' +
//            '"></button>'
//    }
//})

designBuildDirective.directive('silhouette', function () {
    return  {
        restrict: 'A',
        scope: {
            design: "="
        },
//        template: '<a href="/design/{{design.styleId}}"' +
        template: '<a href="/design/{{design.styleId}}"' +
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
            '<div class="row type handwriting">({{design.styleFormalName}})</span></div>' +
      '<div class="row price"><span class="glyphicon glyphicon-tags"></span>&nbsp from HKD {{design.price | number:0}}</div>' +
//      '<div class="row item customize">' +
//      '<button class="btn btn-danger" id="review-dress">Customize</button>' +
//      '</div>' +
            '</a>'
    }
})