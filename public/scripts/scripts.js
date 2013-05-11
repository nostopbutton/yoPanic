"use strict";

angular.module("panicApp", [ "panicApp.Controllers", "panicApp.referenceDataServices", "panicApp.designBuildDirectives", "ui.bootstrap", "analytics" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/home.html",
        controller: "StaticPageCtrl"
    }).when("/fabrics", {
        templateUrl: "views/fabrics.html",
        controller: "StaticPageCtrl"
    }).when("/party", {
        templateUrl: "views/party.html",
        controller: "StaticPageCtrl"
    }).when("/contact", {
        templateUrl: "views/contact.html",
        controller: "StaticPageCtrl"
    }).when("/about", {
        templateUrl: "views/about.html",
        controller: "StaticPageCtrl"
    }).when("/collection", {
        templateUrl: "views/dressCollection.html",
        controller: "DressCollectionCtrl"
    }).when("/design", {
        templateUrl: "views/silhouettes.html",
        controller: "SilhouetteCtrl"
    }).when("/design/:rangeId", {
        templateUrl: "views/designBuild.html",
        controller: "DesignBuildCtrl"
    }).when("/design/:rangeId/:itemId", {
        templateUrl: "views/designBuild.html",
        controller: "DesignBuildCtrl"
    }).when("/newdesign/:rangeId", {
        templateUrl: "views/newDesignBuild.html",
        controller: "NewDesignBuildCtrl"
    }).when("/newdesign/:rangeId/:itemId", {
        templateUrl: "views/newDesignBuild.html",
        controller: "NewDesignBuildCtrl"
    }).when("/purchase", {
        templateUrl: "views/purchase.html",
        controller: "PurchaseCtrl"
    }).when("/adminCollection", {
        templateUrl: "views/adminCollection.html",
        controller: "CollectionCtrl"
    }).when("/adminCollection/:rangeId", {
        templateUrl: "views/adminRangeDetails.html",
        controller: "RangeDetailsCtrl"
    }).otherwise({
        redirectTo: "/"
    });
} ]), function() {
    for (var method, noop = function() {}, methods = [ "assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn" ], length = methods.length, console = window.console = window.console || {}; length--; ) method = methods[length], 
    console[method] || (console[method] = noop);
}();

var _gaq = _gaq || [];

angular.module("analytics", []).run([ "$http", function() {
    console.log("run analytics"), _gaq.push([ "_setAccount", "UA-38964974-1" ]), _gaq.push([ "_setDomainName", "none" ]);
    var ga = document.createElement("script");
    ga.type = "text/javascript", ga.async = !0, ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(ga, s);
} ]).service("analytics", function($rootScope, $window, $location, $routeParams) {
    $rootScope.$on("$viewContentLoaded", track), console.log("analytics service");
    var track = function() {
        console.log("in track");
        var path = convertPathToQueryString($location.path(), $routeParams);
        $window._gaq.push([ "_trackPageview", path ]);
    }, convertPathToQueryString = function(path, $routeParams) {
        for (var key in $routeParams) {
            var queryParam = "/" + $routeParams[key];
            path = path.replace(queryParam, "");
        }
        var querystring = decodeURIComponent($.param($routeParams));
        return "" === querystring ? path : path + "?" + querystring;
    };
});

var referenceDataServices = angular.module("panicApp.referenceDataServices", [ "ngResource" ]);

referenceDataServices.factory("Range", [ "$resource", function($resource) {
    return $resource("referenceData/:rangeId.json", {}, {
        designCatalogue: {
            method: "GET",
            params: {
                rangeId: "designCatalogue"
            },
            isArray: !0
        },
        itemCollection: {
            method: "GET",
            params: {
                rangeId: "itemCollection"
            },
            isArray: !0
        },
        labelLookup: {
            method: "GET",
            params: {
                rangeId: "labels"
            },
            isArray: !0
        }
    });
} ]).factory("DesignBuilder", [ "$resource", function($resource) {
    return $resource("referenceData/designBuilder/:fileId.json", {}, {
        options: {
            method: "GET",
            params: {
                fileId: "options"
            },
            isArray: !0
        },
        fabricSets: {
            method: "GET",
            params: {
                fileId: "fabricSets"
            },
            isArray: !0
        }
    });
} ]).service("ReferenceDataCache", [ "Range", "DesignBuilder", function(Range, DesignBuilder) {
    var designCatalogue = null, labelCache = null, optionCache = null, itemCollection = null;
    return {
        getDesignCatalogue: function() {
            return null == designCatalogue && (designCatalogue = Range.designCatalogue(), console.log("Lazy instantiation of designCatalogue:" + designCatalogue.length)), 
            designCatalogue;
        },
        getLabels: function() {
            return console.log("getLabels"), null == labelCache && (labelCache = Range.labelLookup(), 
            console.log("Lazy instantiation of labelCache:" + labelCache.length)), labelCache;
        },
        getOptions: function() {
            return console.log("getOptions"), null == optionCache && (optionCache = DesignBuilder.options(), 
            console.log("Lazy instantiation of optionCache:" + optionCache.length)), optionCache;
        },
        getItemCollection: function() {
            return null == itemCollection && (itemCollection = Range.itemCollection(function(data) {
                console.log("----Lazy instantiation of itemCollection: " + data.length);
            }, function(data) {
                console.log("Oops -failed to instantiate itemCollection: " + data.length);
            })), itemCollection;
        },
        getItemDesign: function(itemId) {
            var items = {}, out = "";
            return items = this.getItemCollection(function() {
                console.log("Looking up item: " + itemId), console.log("item.length: " + items.length);
                for (var i = 0; items.length > i; i++) if (console.log("-Checking item: " + items[i].itemId), 
                items[i].itemId === itemId) {
                    console.log("---Found item: " + itemId + " -> " + items[i].design), out = angular.copy(items[i].design);
                    break;
                }
            }, function(data) {
                console.log("Oops -failed to getItemColection: " + data.length);
            }), out;
        }
    };
} ]).filter("fabricLookup", [ "ReferenceDataCache", function(ReferenceDataCache) {
    return function(input) {
        var options = ReferenceDataCache.getOptions(), out = "";
        console.log("Looking up fabric: " + input), console.log("options.length: " + options.length);
        for (var i = 0; options.length > i; i++) if (options[i].id === input) {
            console.log("**Found options: " + input + " -> " + options[i].fabrics), out = angular.copy(options[i].fabrics);
            break;
        }
        return out;
    };
} ]).filter("trimLookup", [ "ReferenceDataCache", function(ReferenceDataCache) {
    return function(input) {
        var options = ReferenceDataCache.getOptions(), out = "";
        console.log("Looking up trim: " + input), console.log("options.length: " + options.length);
        for (var i = 0; options.length > i; i++) if (options[i].id === input) {
            console.log("***********Found trim: " + input + " -> " + options[i].trims), out = angular.copy(options[i].trims);
            break;
        }
        return out;
    };
} ]).filter("labelLookup", [ "ReferenceDataCache", function(ReferenceDataCache) {
    return function(input) {
        var labels = ReferenceDataCache.getLabels(), out = "";
        console.log("Looking up label: " + input), console.log("label.length: " + labels.length);
        for (var i = 0; labels.length > i; i++) labels[i].id === input && (console.log("Found label: " + input + " -> " + labels[i].label), 
        out = angular.copy(labels[i].label));
        return out;
    };
} ]);

var designBuildDirectives = angular.module("panicApp.designBuildDirectives", []);

designBuildDirectives.directive("fabrics", function() {
    return {
        scope: {
            selection: "=",
            selectedOption: "="
        },
        template: '<button ng-repeat="fabric in selection" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'fabric\']" btn-radio="fabric"></button>'
    };
}), designBuildDirectives.directive("drawDress", function() {
    return {
        scope: {
            dress: "="
        },
        template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
    };
}), designBuildDirectives.directive("drawFabrics", function() {
    return {
        scope: {
            selection: "=",
            selectedOption: "="
        },
        template: "<button ng-repeat=\"fabric in selection\" type=\"button\" class=\"btn selector option fabric{{fabric.fabId}}\" ng-model=\"selectedOption['fabric']\" btn-radio=\"fabric.fabId\" onClick=\"_gaq.push(['_trackEvent', 'Design Build', 'select fabric', '{{selectedOption.type}}-{{selectedOption.id}}', '{{fabric.fabId}}' ]);\"></button>"
    };
}), angular.module("panicApp.Controllers", []).run([ "$http", function() {
    console.log("run analytics"), _gaq.push([ "_setAccount", "UA-38964974-1" ]), _gaq.push([ "_setDomainName", "none" ]);
    var ga = document.createElement("script");
    ga.type = "text/javascript", ga.async = !0, ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(ga, s);
} ]);

var trackPageInGoogleAnalytics = function() {}, track = function($window, $location, $routeParams) {
    var path = convertPathToQueryString($location.path(), $routeParams);
    console.log("track: about to push: " + path), $window._gaq.push([ "_trackPageview", path ]);
}, convertPathToQueryString = function(path, $routeParams) {
    for (var key in $routeParams) {
        var queryParam = "/" + $routeParams[key];
        path = path.replace(queryParam, "");
    }
    var querystring = decodeURIComponent($.param($routeParams));
    return "" === querystring ? path : path + "?" + querystring;
};

angular.module("panicApp.Controllers").controller("HomeCarouselCtrl", [ "$scope", function($scope) {
    $scope.myInterval = 5e3, $scope.slides = [ {
        image: "images/kitten1.jpeg",
        text: "Kitten."
    }, {
        image: "images/kitten2.jpeg",
        text: "Kitty!"
    }, {
        image: "images/kitten3.jpeg",
        text: "Cat."
    } ];
} ]), angular.module("panicApp.Controllers").controller("StaticPageCtrl", [ "$rootScope", "$window", "$location", "$routeParams", function($rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
} ]), angular.module("panicApp.Controllers").controller("DressCollectionCtrl", [ "$scope", "Range", "$rootScope", "$window", "$location", "$routeParams", function($scope, Range, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams), $scope.dresses = Range.itemCollection();
} ]), angular.module("panicApp.Controllers").controller("SilhouetteCtrl", [ "$scope", "Range", "$rootScope", "$window", "$location", "$routeParams", function($scope, Range, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams), $scope.silhouettes = Range.designCatalogue();
} ]), angular.module("panicApp.Controllers").controller("RangeDetailsCtrl", [ "$scope", "$routeParams", "Range", "$rootScope", "$window", "$location", function($scope, $routeParams, Range, $rootScope, $window, $location) {
    $rootScope.$on("$viewContentLoaded", track($window, $location, $routeParams)), $scope.ranges = Range.query(), 
    $scope.range = Range.get({
        rangeId: $routeParams.rangeId
    });
} ]), angular.module("panicApp.Controllers").controller("DesignBuildCtrl", [ "$scope", "$routeParams", "Range", "ReferenceDataCache", "DesignBuilder", "$rootScope", "$window", "$location", function($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, $rootScope, $window, $location) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    var master = "", categoryId = "dresses", designId = $routeParams.rangeId, itemId = $routeParams.itemId;
    $scope.designId = designId, $scope.categoryId = categoryId, itemId && Range.itemCollection(function(itemData) {
        console.log("Looking up item: " + itemId), console.log("itemData.length: " + itemData.length);
        for (var i = 0; itemData.length > i; i++) if (console.log("-Checking item: " + itemData[i].itemId), 
        itemData[i].itemId === itemId) {
            console.log("---Found item: " + itemId + " -> " + itemData[i].design), master = angular.copy(itemData[i].design);
            break;
        }
    }, function(data) {
        console.log("Oops - failed to getItemColection: " + data.length);
    }), $scope.ranges = Range.designCatalogue(function() {
        console.log("=================="), loadDesign($scope);
    }), $scope.range = DesignBuilder.get({
        fileId: $routeParams.rangeId
    }, function(data) {
        itemId || (master = angular.copy(data.default)), $scope.master = master, $scope.cancel();
    }, function() {
        alert("ooops");
    }), $scope.cancel = function() {
        $scope.form = angular.copy(master);
    }, $scope.updateFabrics = function() {
        $scope.form;
    }, $scope.save = function() {
        master = $scope.form, $scope.cancel();
    }, $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };
} ]);

var loadDesign = function($scope) {
    var category = getCategoryById($scope.ranges, $scope.categoryId), design = getDesignById(category.designs, $scope.designId);
    $scope.category = category, $scope.design = design;
}, getCategoryById = function(categories, id) {
    console.log("categories.length" + categories.length);
    for (var category = [], i = 0; categories.length > i; i++) console.log("categoryName" + categories[i].catId), 
    categories[i].catId === id && (console.log("Found category: " + id + " -> " + categories[i].catId), 
    category = angular.copy(categories[i]));
    return console.log("Returning: " + category), category;
}, getDesignById = function(designs, id) {
    console.log("designs.length: " + designs.length);
    for (var design = {}, i = 0; designs.length > i; i++) console.log("id: " + designs[i].desId), 
    designs[i].desId === id && (console.log("Found category: " + id + " -> " + designs[i].desId), 
    design = angular.copy(designs[i]));
    return console.log("Returning: " + design), design;
};

angular.module("panicApp.Controllers").controller("NewDesignBuildCtrl", [ "$scope", "$routeParams", "Range", "ReferenceDataCache", "DesignBuilder", "$rootScope", "$window", "$location", function($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, $rootScope, $window, $location) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    var master = "", categoryId = "dresses", designId = $routeParams.rangeId, itemId = $routeParams.itemId, allFabricSets = {}, range = {};
    $scope.designId = designId, $scope.categoryId = categoryId, itemId && Range.itemCollection(function(itemData) {
        console.log("Looking up item: " + itemId), console.log("itemData.length: " + itemData.length);
        for (var i = 0; itemData.length > i; i++) if (console.log("-Checking item: " + itemData[i].itemId), 
        itemData[i].itemId === itemId) {
            console.log("---Found item: " + itemId + " -> " + itemData[i].design), master = angular.copy(itemData[i].design);
            break;
        }
    }, function(data) {
        console.log("Oops - failed to getItemColection: " + data.length);
    }), $scope.ranges = Range.designCatalogue(function() {
        console.log("=================="), loadDesign($scope);
    }), $scope.range = DesignBuilder.get({
        fileId: $routeParams.rangeId
    }, function(data) {
        itemId || (master = angular.copy(data.default)), range = angular.copy(data), $scope.master = master, 
        $scope.cancel();
    }, function() {
        alert("ooops - loading range");
    }), $scope.cancel = function() {
        $scope.form = angular.copy(master);
    }, $scope.fabricSets = DesignBuilder.fabricSets(function(data) {
        allFabricSets = angular.copy(data);
        for (var option in range.options) for (var set in range.options[option].fabricSets) for (var fabricSet in allFabricSets) if (range.options[option].fabricSets[set].set == allFabricSets[fabricSet].setId) {
            $scope.range.options[option].fabricSets[set] = allFabricSets[fabricSet];
            break;
        }
    }, function() {
        alert("ooops - loading fabrics");
    }), $scope.save = function() {
        master = $scope.form, $scope.cancel();
    }, $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };
} ]);

var loadDesign = function($scope) {
    var category = getCategoryById($scope.ranges, $scope.categoryId), design = getDesignById(category.designs, $scope.designId);
    $scope.category = category, $scope.design = design;
}, getCategoryById = function(categories, id) {
    console.log("categories.length" + categories.length);
    for (var category = [], i = 0; categories.length > i; i++) console.log("categoryName" + categories[i].catId), 
    categories[i].catId === id && (console.log("Found category: " + id + " -> " + categories[i].catId), 
    category = angular.copy(categories[i]));
    return console.log("Returning: " + category), category;
}, getDesignById = function(designs, id) {
    console.log("designs.length: " + designs.length);
    for (var design = {}, i = 0; designs.length > i; i++) console.log("id: " + designs[i].desId), 
    designs[i].desId === id && (console.log("Found category: " + id + " -> " + designs[i].desId), 
    design = angular.copy(designs[i]));
    return console.log("Returning: " + design), design;
};