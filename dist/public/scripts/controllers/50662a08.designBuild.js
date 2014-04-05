'use strict';

//angular.module('panicApp.Controllers', ['ngSocial'])
angular.module('panicApp.Controllers')//, ['ngSocial'])
    .controller('NewDesignBuildCtrl', ['$scope', '$routeParams', 'Range', 'ReferenceDataCache', 'DesignBuilder', 'CatalogueService',
        '$rootScope', '$window', '$location',
        function ($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, CatalogueService, $rootScope, $window, $location) {

            trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
            var master = "",
                categoryId = "dresses",//$routeParams.categoryId;
                styleId = $routeParams.styleId,
                itemId = $routeParams.itemId,
                designCode = $routeParams.designCode,
                allFabricSets = {},
                range = {};

            $scope.form = "";
            $scope.current_title = 'Test';
            $scope.current_description = 'Test description';
            $scope.headline = "test";

            $scope.tabs = {"style":false, "design": true, "fit": false, "order": false};

            // Put Style data into page scope
//      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
//      ReferenceDataCache.getItemById($routeParams.itemId, $scope);
            CatalogueService.getItemPromise($routeParams.styleId, $routeParams.itemId).then(function (result) {  // this is only run after $http completes
                $scope.item = angular.copy(result);

                if (_.isUndefined(designCode) ) {
                    master = angular.copy(result.itemDesign.itemDesign);
                }
                range = angular.copy(result);
                $scope.master = master;     // so it can be viewed in debug screen
                $scope.params = $.param(master);
                $scope.cancel();            // set form to master
            });

            $scope.isDebugCollapsed = true;
            $scope.styleId = styleId;
            $scope.categoryId = categoryId;

            if (designCode) {
                $scope.designCode = designCode;
                $scope.deparam = angular.copy($.deparam(designCode))
            }


            var clearTrim = function (partType) {
                partType.trim = "";
            }
            $scope.clearTrim = clearTrim;

            $scope.dressPartCode = function (selection) {
                console.log("SELCTION:" + selection);
                return selection.type + "-"
                    + selection.id + selection.length + "-"
                    + selection.fabric
            }


            if (itemId) {
//                Range.itemCollection(function (itemData) {
//                        for (var i = 0; i < itemData.length; i++) {
//                            if (itemData[i].itemId === itemId) {
//                                master = angular.copy(itemData[i].design);
//                                break;
//                            }
//                        }
//                    },
//                    function (data) {
//                        console.log("Oops - failed to getItemColection: " + data.length)
//                    })
            }


//      $scope.isActive = function(cat) {
//        return cat.category.categoryName.designs.id === styleId;
//      };

//            $scope.ranges = Range.styleCatalogue(
//                function (data) {   //success
//                    console.log("==================");
//                    loadStyle($scope);//, data, categoryId, styleId);
//
//                }
//            );
//      $scope.category = ReferenceDataCache.getCategory(categoryId);
//      $scope.design = ReferenceDataCache.getDesign(styleId);

//      $scope.range = DesignBuilder.get({fileId: $routeParams.styleId},
//        function (data) {   //success
//          if(!itemId) {
//            master = angular.copy(data.default);
//          }
//          range = angular.copy(data);
//          $scope.master = master;     // so it can be viewed in debug screen
//          $scope.params = $.param(master);
//          $scope.cancel();            // set form to master
//        },
//        function (data) {             //failure
//          alert("ooops - loading range");
//        });

            $scope.cancel = function () {
                if ($scope.deparam)
                    $scope.form = angular.copy($scope.deparam);
                else
                    $scope.form = angular.copy(master);
            };


            $scope.fabricSets = DesignBuilder.fabricSets(
                function (data) {   // success
                    allFabricSets = angular.copy(data);

                    for (var option in range.options) {
                        for (var set in range.options[option].fabricSets) {
                            for (var fabricSet in allFabricSets) {
                                if (range.options[option].fabricSets[set].set == allFabricSets[fabricSet].setId) {
                                    $scope.range.options[option].fabricSets[set] = allFabricSets[fabricSet];
                                    break;
                                }
                            }
                        }
                    }

                }, function (data) {             //failure
                    alert("ooops - loading fabrics");
                });
//      );

            $scope.save = function () {
                master = $scope.form;
                $scope.cancel();
            };

            $scope.isCancelDisabled = function () {
                return angular.equals(master, $scope.form);
            };

            $scope.param = function (form) {
//        alert(form);
                return $.param(form);
            };

            $scope.designString = function (form) {
                var returnString = " ";
                console.log("I have:" + JSON.stringify(form));

                for (var design in form) {
                    var partString = "";
                    for (var element in form[design]) {
                        if (element != "$$hashKey")
                            partString += element + " = " + JSON.stringify(form[design][element]) + "| ";
//            returnString += element.type + element.id + "\n";
                    }
                    console.log(partString);
                    returnString += design + " : " + " %0D%0A " + partString + " %0D%0A "
//            returnString += design + " : " + JSON.stringify(form[design]) + " %0D%0A "
                }

                console.log("Returning---: " + returnString);
                return returnString;
            }

            $scope.designLink = function (form) {
                var returnString = " ";
                console.log("I have:" + JSON.stringify(form));


                console.log("Returning---: " + returnString);
                return returnString;
            }

//      $scope.loadStyle = loadStyle;//, styleId);

//    $scope.isSaveDisabled = function() {
//        return $scope.form.$invalid || angular.equals(master, $scope.form);
//    };

//    $scope.cancel();

//      $scope.setType = function(attr, type) {
//        attr
//      }

        }])

var loadStyle = function ($scope) {//, catalogue, catId, desId) {
    var category = getCategoryById($scope.ranges, $scope.categoryId),
        style = getStyleById(category.styles, $scope.styleId);

    $scope.category = category;
    $scope.style = style;
}

var getCategoryById = function (categories, id) {
//  console.log("categories.length:"+categories.length);

    var category = [];
    for (var i = 0; i < categories.length; i++) {
//    console.log("categoryName:"+categories[i].catId);
        if (categories[i].catId === id) {
//      console.log("Found category: "+id + " -> "+categories[i].catId);
            category = angular.copy(categories[i]);
            break;
        }
    }
    console.log("Returning: " + category);

    return category;
}

var getStyleById = function (styles, id) {
//  console.log("styles.length: "+styles.length);

    var style = {};
    for (var i = 0; i < styles.length; i++) {
//    console.log("id: "+styles[i].styleId);
        if (styles[i].styleId === id) {
//      console.log("Found style: "+id + " -> "+styles[i].styleId);
            style = angular.copy(styles[i]);
            break;
        }
    }
    console.log("Returning: " + style);

    return style;
}

var decodeDesign = function (code) {
//  skt-002-04-120-slv-008-00-089-nek-015-03-089-trm-nek-015-03-000-blt-003-00-087-ext-002-00-000-ext-003-00-000

//  var skt = code.substr(0,14)
//  var slv = code.substr(15,14)
//  var nek = code.substr(30,14)
//  var trm = code.substr(45,18)
//  var blt = code.substr(64,14)
//  var pep = code.substr(79,14)
//  var ros = code.substr(94,14)
//
//  console.log(skt);
//  console.log(slv);
//  console.log(nek);
//  console.log(trm);
//  console.log(blt);
//  console.log(pep);
//  console.log(ros);


    $.deparam(code)

    // skt - 14
    // - 1
    // slv - 14
    // - 1
    // nek - 14
    // - 1
    // trm - 18
    // - 1
    // blt - 14
    // - 1
    // ext pep - 14
    // - 1
    // ext rose - 14


}
