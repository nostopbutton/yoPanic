'use strict';

var referenceDataServices = angular.module('panicApp.referenceDataServices', ['ngResource']);

referenceDataServices
    .factory('Range', function ($resource) {
        return $resource('referenceData/:rangeId.json', {}, {
            styleCatalogue: {method: 'GET', params: {rangeId: 'styleCatalogue'}, isArray: true},
            itemCollection: {method: 'GET', params: {rangeId: 'itemCollection'}, isArray: true},
            labelLookup: {method: 'GET', params: {rangeId: 'labels'}, isArray: true}
        });
    })
    .factory('DesignBuilder', function ($resource) {
        return $resource('referenceData/designBuilder/:fileId.json', {}, {
//      query: {method:'GET', params:{rangeId:'ranges'}, isArray:true},
            fabricSets: {method: 'GET', params: {fileId: 'fabricSets'}, isArray: true}
        });
    })
    .factory('MetaData', function ($location) {
        return {
            og_image: "http://img.aurza.com/skt-001-02-013-slv-009-00-013-nek-001-00-003-blt-002-00-000-ext-002-00-000-ext-003-00-000.png",
            og_title: "Sheath Dress",
            og_url: $location.absUrl(),
            og_site_name: "AURZA",
            og_type: "dress"
        }
    })
    .service('CatalogueService', function (Range, DesignBuilder, $q) {

        return {
            getStyleListPromise: function () {

                var deferred = $q.defer();

                var styleCatalogue, styles = [];
                styleCatalogue = Range.styleCatalogue();

                styleCatalogue.$promise.then(function (result) {
                    styles = _.reduce(result, function (a, b) {
                        return a.concat(b.styleId);
                    }, []);
                    deferred.resolve(styles);
                })

                return deferred.promise;
            },

//            getStylePromise: function (style) {
//
//                var deferred = $q.defer();
//
//                var styleCatalogue, styles = [];
//                styleCatalogue = Range.styleCatalogue();
//
//                styleCatalogue.$promise.then(function (result) {
//                    styles = _.reduce(result, function (a, b) {
//                        return a.concat(b.styleId);
//                    }, []);
//                    deferred.resolve(styles);
//                })
//
//                return deferred.promise;
//            },

            getItemCollectionPromiseForStyles: function (styles) {
                return $q.all(
                        _.map(styles, function (style) {
                            return DesignBuilder.get({fileId: style}).$promise
                        })
                    ).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            aggregatedData = aggregatedData.concat(result.collection);
                        });
                        return aggregatedData;
                    });
            },

            getItemCollectionWithStyleDataPromiseForStyles: function (styles) {
                return $q.all(
                        _.map(styles, function (style) {
                            return DesignBuilder.get({fileId: style}).$promise
                        })
                    ).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            angular.forEach(result.collection, function (item) {
                                var itemExt = _.extend({}, item, result.style)
                                aggregatedData.push(itemExt);
                            });
                        });
                        return aggregatedData;

                    })
            },

            getItemPromise: function (styleId, itemId) {


                var deferred = $q.defer();
                var designConfig, itemData = {"itemDesign": ""};

                DesignBuilder.get({fileId: styleId}).$promise.then(function (result) {
                    if (!itemId) itemId = result.style.defaultItemId;
                    angular.forEach(result.collection, function (item) {
                        if (item.itemId == itemId) {
                            itemData.itemDesign = angular.copy(item);
                        }
                    })
                    designConfig = _.extend({}, result, itemData)

                    deferred.resolve(designConfig);
                })

                return deferred.promise;

                return $q.all(
                        _.map(styles, function (style) {
                            return DesignBuilder.get({fileId: style}).$promise
                        })
                    ).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            angular.forEach(result.collection, function (item) {
                                var itemExt = _.extend({}, item, result.style)
                                aggregatedData.push(itemExt);
                            });
                        });
                        return aggregatedData;

                    })

                var deferred = $q.defer();

                var styleCatalogue, styles = [];
                styleCatalogue = Range.styleCatalogue();

                styleCatalogue.$promise.then(function (result) {
                    styles = _.reduce(result, function (a, b) {
                        return a.concat(b.styleId);
                    }, []);
                    deferred.resolve(styles);
                })

                return deferred.promise;

            }
        }
    })
    .service('ReferenceDataCache', function (Range, DesignBuilder) {
        var styleCatalogue = null,
            labelCache = null,
            optionCache = null,
            itemCollection = null;

//    $scope.range = DesignBuilder.get({rangeId: $routeParams.rangeId},
//      function (data) {   //success
//        if(!itemId) {
////            master = angular.copy(ReferenceDataCache.getItemDesign(itemId));
////          } else {
//          master = angular.copy(data.default);
//        }
//        $scope.master = master; // so it can be viewed in debug screen
//        $scope.cancel(); // set form to master
//      },
//      function (data) {   //failure
//        alert("ooops");
//      });


        return {
            // TODO is there any point in caching?
            getStyleCatalogue: function () {
                if (styleCatalogue == null) {
                    styleCatalogue = Range.styleCatalogue();
                    console.log("Lazy instantiation of styleCatalogue:" + styleCatalogue.length)
                }
                return styleCatalogue;
            },
            getLabels: function () {
                console.log("getLabels");
                if (labelCache == null) {
                    labelCache = Range.labelLookup();
                    console.log("Lazy instantiation of labelCache:" + labelCache.length)
                }

                return labelCache;
            },
            getOptions: function () {
                console.log("getOptions");
                if (optionCache == null) {
                    optionCache = DesignBuilder.options();
                    console.log("Lazy instantiation of optionCache:" + optionCache.length)
                }

                return optionCache;
            },
            getItemCollection: function () {
                if (itemCollection == null) {
                    itemCollection = Range.itemCollection(function (data) {
                            console.log("----Lazy instantiation of itemCollection: " + data.length)
                        },
                        function (data) {
                            console.log("Oops -failed to instantiate itemCollection: " + data.length)
                        }
                    );

                }
                return itemCollection;
            },
            getItemDesign: function (itemId) {
//        getDressCollection().
                var items = {},
                    out = "";

                items = this.getItemCollection(function (data) {
//          console.log("Looking up item: "+itemId);
//          console.log("item.length: "+items.length);

                        for (var i = 0; i < items.length; i++) {
//            console.log("-Checking item: "+items[i].itemId);

                            if (items[i].itemId === itemId) {
                                console.log("---Found item: " + itemId + " -> " + items[i].design);
                                out = angular.copy(items[i].design);
                                break
                            }
                        }
                    },
                    function (data) {
                        console.log("Oops -failed to getItemColection: " + data.length)
                    }
                )

                return out;
            },
            getStyleById: function (id, $scope) {
                var styleCatalogue = Range.styleCatalogue(
                    function (data) {   //success
//            console.log("styleCatalogue.length: "+styleCatalogue.length);
                        for (var i = 0; i < styleCatalogue.length; i++) {
//              console.log("id: "+styleCatalogue[i].styleId);
                            if (styleCatalogue[i].styleId === id) {
                                console.log("Found style: " + id + " -> " + styleCatalogue[i].styleId);
                                $scope.style = angular.copy(styleCatalogue[i]);
                                break;
                            }
                        }
//            console.log("Returning:");
//            console.log($scope.style);
                    }
                );
            },
            getItemById: function (id, $scope) {
                var itemCollection = Range.itemCollection(
                    function (data) {   //success
//            console.log("itemCollection.length: "+itemCollection.length);
                        for (var i = 0; i < itemCollection.length; i++) {
//              console.log("id: "+itemCollection[i].itemId);
                            if (itemCollection[i].itemId === id) {
                                console.log("Found item: " + id + " -> " + itemCollection[i].itemId);
                                $scope.item = angular.copy(itemCollection[i]);
                                break;
                            }
                        }
//            console.log("Returning:");
//            console.log($scope.item);
                    }
                );
            }
        };
    })

    .filter('fabricLookup', function (ReferenceDataCache) {
        return function (input) {
            var options = ReferenceDataCache.getOptions();
            var out = "";
//      console.log("Looking up fabric: "+input);
//      console.log("options.length: "+options.length);

            for (var i = 0; i < options.length; i++) {
                if (options[i].id === input) {
                    console.log("**Found options: " + input + " -> " + options[i].fabrics);
                    out = angular.copy(options[i].fabrics);
                    break
                }
            }
            return out;
        }
    })
    .filter('trimLookup', function (ReferenceDataCache) {
        return function (input) {
            var options = ReferenceDataCache.getOptions();
            var out = "";
//      console.log("Looking up trim: "+input);
//      console.log("options.length: "+options.length);

            for (var i = 0; i < options.length; i++) {
                if (options[i].id === input) {
                    console.log("***********Found trim: " + input + " -> " + options[i].trims);
                    out = angular.copy(options[i].trims);
                    break
                }
            }
            return out;
        }
    })
//  .filter('trimFabricLookup', function(ReferenceDataCache) {
//    return function(input) {
//      var options = ReferenceDataCache.getOptions();
//      var out = "";
//      console.log("Looking up trim fabric: "+input);
//      console.log("options.length: "+options.length);
//
//      for (var i=0; i<options.length; i++){
//        if (options[i].id === input) {
//          console.log("***********Found trim: "+input + " -> "+options[i].trims);
//          out = angular.copy(options[i].trims);
//          break
//        }
//      }
//      return out;
//    }
//  })
    .filter('labelLookup', function (ReferenceDataCache) {
        return function (input) {
            var labels = ReferenceDataCache.getLabels();
            var out = "";
//      console.log("Looking up label: "+input);
//      console.log("label.length: "+labels.length);

            for (var i = 0; i < labels.length; i++) {
                if (labels[i].id === input) {
                    console.log("Found label: " + input + " -> " + labels[i].label);
                    out = angular.copy(labels[i].label);
                }
            }
            return out;
        }
    })

//  .factory('lookup', ['$http', '$rootScope', '$window', '$filter', function ($http, $rootScope, $window, $filter) {
//    var lookup = {
//      // use the $window service to get the language of the user's browser
//      language:$window.navigator.userLanguage || $window.navigator.language,
//      // array to hold the lookupd resource string entries
//      dictionary:[],
//      // flag to indicate if the service hs loaded the resource file
//      resourceFileLoaded:false,
//
//      // success handler for all server communication
//      successCallback:function (data) {
//        // store the returned array in the dictionary
//        lookup.dictionary = data;
//        // set the flag that the resource are loaded
//        lookup.resourceFileLoaded = true;
//        // broadcast that the file has been loaded
//        $rootScope.$broadcast('lookupResourcesUpdates');
//      },
//
//      // allows setting of language on the fly
//      setLanguage: function(value) {
//        lookup.language = value;
//        lookup.initlookupdResources();
//      },
//
//      // loads the language resource file from the server
//      initlookupdResources:function () {
//        // build the url to retrieve the lookupd resource file
//        var url = '/i18n/resources-locale_' + lookup.language + '.js';
//        // request the resource file
//        $http({ method:"GET", url:url, cache:false }).success(lookup.successCallback).error(function () {
//          // the request failed set the url to the default resource file
//          var url = '/i18n/resources-locale_default.js';
//          // request the default resource file
//          $http({ method:"GET", url:url, cache:false }).success(lookup.successCallback);
//        });
//      },
//
//      // checks the dictionary for a lookupd resource string
//      getCodeName: function(value) {
//        // default the result to an empty string
//        var result = '';
//
//        // make sure the dictionary has valid data
//        if ((lookup.dictionary !== []) && (lookup.dictionary.length > 0)) {
//          // use the filter service to only return those entries which match the value
//          // and only take the first result
//          var entry = $filter('filter')(lookup.dictionary, function(element) {
//              return element.key === value;
//            }
//          )[0];
//
//          // set the result
//          result = entry.value;
//        }
//        // return the value to the call
//        return result;
//      }
//    };
//
//    // force the load of the resource file
//    lookup.initlookupdResources();
//
//    // return the local instance when called
//    return lookup;
//  } ])
//// simple codename lookup filter
//// usage {{ TOKEN | codename }}
//  .filter('codename', ['lookup', function (lookup) {
//    return function (input) {
//      return lookup.getCodeName(input);
//    };
//  }])
//;

//var getCategoryFromCacheArray = function(id) {
//  for (var i=0; i<categoryCache; i++){
////    console.log("id: "+designs[i].desId);
//    if (categoryCache[i].catId === id) {
//      console.log("Found category: "+id + " -> "+designs[i].desId);
//      design = angular.copy(designs[i]);
//    }
//  }
//}

//var getCategoryById = function(categories, id) {
//  console.log("categories.length"+categories.length);
//
//  var category = [];
//  for (var i=0; i<categories.length; i++){
//    console.log("categoryName"+categories[i].catId);
//    if (categories[i].catId === id) {
//      console.log("Found category: "+id + " -> "+categories[i].catId);
//      category = angular.copy(categories[i]);
//    }
//  }
//  console.log("Returning: "+category);
//
//  return category;
//}
//
//var getDesignById = function(designs, id) {
//  console.log("designs.length: "+designs.length);
//
//  var design = {};
//  for (var i=0; i<designs.length; i++){
//    console.log("id: "+designs[i].desId);
//    if (designs[i].desId === id) {
//      console.log("Found category: "+id + " -> "+designs[i].desId);
//      design = angular.copy(designs[i]);
//    }
//  }
//  console.log("Returning: "+design);
//
//  return design;
//}


//function (data) {   //success
//  category  = getCategoryById(data, categoryId);
//  console.log('category.designs: '+category.designs);
//  design  = getDesignById(category.designs, designId);
//  console.log('design.desName: '+design.desName);
//  $scope.category = category;
//  $scope.design = design;
//}
//);

//  .factory('Lookup', function($resource){
//    return $resource('referenceData/:lookupId.json', {}, {
//      fabrics: {method:'GET', params:{lookupId:'fabrics'}, isArray:true}
//    });
//  })


//referenceDataServices
//  .factory('DressCollection', function($resource){
//    return $resource('referenceData/:rangeId.json', {}, {
//      query: {method:'GET', params:{rangeId:'silhouettes'}, isArray:true}
//    });
//  });

//referenceDataServices.
//    service('analytics', function($rootScope, $window, $location, $routeParams) {
//
//    $rootScope.$on('$viewContentLoaded', track);
//
//    var track = function() {
//        var path = convertPathToQueryString($location.path(), $routeParams)
//        $window._gaq.push(['_trackPageview', path]);
//    };
//
//    var convertPathToQueryString = function(path, $routeParams) {
//        for (var key in $routeParams) {
//            var queryParam = '/' + $routeParams[key];
//            path = path.replace(queryParam, '');
//        }
//
//        var querystring = decodeURIComponent($.param($routeParams));
//
//        if (querystring === '') return path;
//
//        return path + "?" + querystring;
//    };
//});
