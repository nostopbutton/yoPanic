'use strict';

//angular.module('panicApp.Controllers', ['ngSocial'])
angular.module('panicApp.Controllers')//, ['ngSocial'])
    .controller('DesignBuildCtrl', ['$scope', '$routeParams', 'Range', 'ReferenceDataCache', 'DesignBuilder', 'CatalogueService',
        '$rootScope', '$window', '$location',
        function ($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, CatalogueService, $rootScope, $window, $location) {

            trackPageInGoogleAnalytics($rootScope, $scope, $window, $location, $routeParams);
            var master = "",
                categoryId = "dresses",//$routeParams.categoryId;
                styleId = $routeParams.styleId,
                itemId = $routeParams.itemId,
                designCode = $routeParams.designCode,
                tab = $routeParams.tab,
                allFabricSets = {},
                range = {};

            $rootScope.page = {};
            $rootScope.product = {};
//            $scope.loading = false;

            var metaData = function(data) {
//                alert(JSON.stringify(data.itemDesign))

//                $rootScope.page.baseUrl = "http://aurza.com/"

                $rootScope.page.canonical = $location.path();
//                console.info('$location.path(): '+ $rootScope.page.canonical);

                if (_.isUndefined(itemId) ) {
                    $rootScope.page.title = data.style.title;
                    $rootScope.page.description = data.style.strapline;
                    $rootScope.page.url = "http://aurza.com/shop/design/"+styleId;
                    $rootScope.page.image = "http://aurza.com/images/collection/"+ data.style.defaultItemId+"-lg-"+ data.itemDesign.images.product[0]+".jpg";
                    $rootScope.product.image1 = "http://aurza.com/images/collection/"+ data.style.defaultItemId+"-lg-"+ data.itemDesign.images.product[1]+".jpg";
                    $rootScope.product.image2 = "http://aurza.com/images/collection/"+ data.style.defaultItemId+"-lg-"+ data.itemDesign.images.product[2]+".jpg";
                    $rootScope.product.code = data.style.styleId;
                    $rootScope.product.color = data.style.colours;
                } else {
                    $rootScope.page.title = data.itemDesign.title;
                    $rootScope.page.description = data.itemDesign.strapline;
                    $rootScope.page.url = "http://aurza.com/shop/collection/"+styleId+"/"+itemId;
                    $rootScope.page.facebookUrl = "http://aurza.com/shop/#!/collection/"+styleId+"/"+itemId;
                    $rootScope.page.snapshotUrl = "http://aurza.com/snapshot/shop_collection/"+styleId+"/"+itemId+".html";
                    $rootScope.page.image = "http://aurza.com/images/collection/"+itemId+"-lg-"+ data.itemDesign.images.product[0]+".jpg";
                    $rootScope.product.image1 = "http://aurza.com/images/collection/"+itemId+"-lg-"+ data.itemDesign.images.product[1]+".jpg";
                    $rootScope.product.image2 = "http://aurza.com/images/collection/"+itemId+"-lg-"+ data.itemDesign.images.product[2]+".jpg";
                    $rootScope.product.code = data.itemDesign.itemId;
                    $rootScope.product.color = data.itemDesign.colours;
                }

                $rootScope.page.twitterCard = "product" // summary_large_image or product
                //Twitter summary card with large image must be at least 280x150px

                $rootScope.page.ogType = "product" // article or product

                $rootScope.product.price = data.style.price;
                $rootScope.product.currency = "HKD";
                $rootScope.product.availability = "in stock";
                $rootScope.product.destinations = "All";
                $rootScope.product.gender = "female";
//                alert("$rootScope.page.snapshotUrl: " + $rootScope.page.snapshotUrl);
//                window.parsePin();
            }

            $scope.gaEvent = function(category, action, label) {
                $window.ga('send', 'event', category, action, label);
            }
            $scope.tab = function(tab) {
                var path = convertPathToQueryString($location.path(), $routeParams)+'&tab='+tab;
                $window.ga('send', 'pageview', { page: path });
            }

            $scope.tabs = {"style":true, "design": false, "fit": false, "order": false};

            if(tab){
                $scope.tabs["style"] = false;
                $scope.tabs[tab] = true;
            }

            $scope.image= {"default":  "-lg-dress.jpg"};
//                "view":  "-lg-frodnt.jpg"};

            // Put Style data into page scope
//      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
//      ReferenceDataCache.getItemById($routeParams.itemId, $scope);
            CatalogueService.getItemPromise($routeParams.styleId, $routeParams.itemId).then(function (result) {
            // this is only run after $http completes
                $scope.item = angular.copy(result);
//                console.log("result  "+JSON.stringify(result));
                if (_.isUndefined(designCode) ) {
                    master = angular.copy(result.itemDesign.itemDesign);
                }
                range = angular.copy(result);

                $scope.image.view = ($scope.item.itemDesign.hasOwnProperty('images') ? '-lg-' + $scope.item.itemDesign.images.product[0] + '.jpg': $scope.image.default);

                $scope.master = master;     // so it can be viewed in debug screen
//                console.log("master "+master)
                $scope.params = $.param(master);
                metaData($scope.item);
                $scope.cancel();            // set form to master
            });





            $scope.isDebugCollapsed = true;
            $scope.styleId = styleId;
            $scope.categoryId = categoryId;

            if (designCode) {
                $scope.designCode = designCode;
                $scope.deparam = angular.copy($.deparam(designCode))
            }

            $scope.sizing = {
                "size": "",
                "bust":"",
                "waist":"",
                "hips":"",
                "hollowfloor":"",
                "height":""
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


            $scope.toggleExtraButton = function (part, value) {
                if(value.id === part.id) {
                    part.id = '000';
                    part.fabric = '000';
                    part.code = '000-000';
                } else {
                    part.id = value.id;
                    part.fabric = value.defaultFabric;
                    part.code = value.id + '-' + value.defaultFabric;
                }
            }

            $scope.toggleExtra = function (part, fabric, value) {
                part.id = value.id;
                part.fabric = fabric.fabId;
                part.code = value.id + '-' + fabric.fabId;
            }

            $scope.toggleTrim = function (part, fabric, value) {
                if(part.trim === fabric.fabId) {
                    part.trim = '000';
                } else {
                    part.trim = fabric.fabId;
                }

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
