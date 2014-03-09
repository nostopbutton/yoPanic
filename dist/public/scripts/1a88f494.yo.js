'use strict';
angular.module('panicApp', [
  'ngRoute',
  'panicApp.Controllers',
  'panicApp.referenceDataServices',
  'panicApp.designBuildDirectives',
  'panicApp.designBuildFilters',
  'ui.bootstrap',
  'ngSocial'
]).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'StaticPageCtrl'
    }).when('/fabrics', {
      templateUrl: 'views/fabrics.html',
      controller: 'StaticPageCtrl'
    }).when('/party', {
      templateUrl: 'views/party.html',
      controller: 'StaticPageCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'StaticPageCtrl'
    }).when('/terms', {
      templateUrl: 'views/terms.html',
      controller: 'StaticPageCtrl'
    }).when('/privacy', {
      templateUrl: 'views/privacy.html',
      controller: 'StaticPageCtrl'
    }).when('/collection', {
      templateUrl: 'views/dressCollection.html',
      controller: 'DressCollectionCtrl'
    }).when('/shop/:styleId/:itemId', {
      templateUrl: 'views/shopItem.html',
      controller: 'ShopItemCtrl'
    }).when('/design', {
      templateUrl: 'views/silhouettes.html',
      controller: 'SilhouetteCtrl'
    }).when('/design/:styleId', {
      templateUrl: 'views/idggDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/design/:styleId/:itemId', {
      templateUrl: 'views/idggDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/review/:styleId/dress/:designCode', {
      templateUrl: 'views/idggPlaceOrder.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/design/:styleId/dress/:designCode', {
      templateUrl: 'views/idggDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/checkout', {
      templateUrl: 'views/checkout.html',
      controller: 'StaticPageCtrl'
    }).when('/cart', {
      templateUrl: 'views/cart.html',
      controller: 'StaticPageCtrl'
    }).when('/purchase', {
      templateUrl: 'views/sizing.html',
      controller: 'StaticPageCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {
  };
  var methods = [
      'assert',
      'clear',
      'count',
      'debug',
      'dir',
      'dirxml',
      'error',
      'exception',
      'group',
      'groupCollapsed',
      'groupEnd',
      'info',
      'log',
      'markTimeline',
      'profile',
      'profileEnd',
      'table',
      'time',
      'timeEnd',
      'timeStamp',
      'trace',
      'warn'
    ];
  var length = methods.length;
  var console = window.console = window.console || {};
  while (length--) {
    method = methods[length];
    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
// Place any jQuery/helper plugins in here.
'use strict';
var _gaq = _gaq || [];
angular.module('analytics', []).run([
  '$http',
  function ($http) {
    console.log('run analytics');
    _gaq.push([
      '_setAccount',
      'UA-42859790-2'
    ]);
    _gaq.push([
      '_setDomainName',
      'none'
    ]);
    //	_gaq.push(['_trackPageview']);
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  }
]).service('analytics', function ($rootScope, $window, $location, $routeParams) {
  $rootScope.$on('$viewContentLoaded', track);
  console.log('analytics service');
  var track = function () {
    console.log('in track');
    var path = convertPathToQueryString($location.path(), $routeParams);
    $window._gaq.push([
      '_trackPageview',
      path
    ]);
  };
  var convertPathToQueryString = function (path, $routeParams) {
    for (var key in $routeParams) {
      var queryParam = '/' + $routeParams[key];
      path = path.replace(queryParam, '');
    }
    // TODO - FIX ME
    //            var querystring = "";
    //
    //            querystring =  decodeURIComponent($.param($routeParams));
    //
    //            if (querystring === '') return path;
    //
    //            return path + "?" + querystring;
    return path;
  };
});
/*
  jQuery deparam is an extraction of the deparam method from Ben Alman's jQuery BBQ
  http://benalman.com/projects/jquery-bbq-plugin/
*/
(function ($) {
  $.deparam = function (params, coerce) {
    var obj = {}, coerce_types = {
        'true': !0,
        'false': !1,
        'null': null
      };
    // Iterate over all name=value pairs.
    $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
      var param = v.split('='), key = decodeURIComponent(param[0]), val, cur = obj, i = 0,
        // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
        // into its component parts.
        keys = key.split(']['), keys_last = keys.length - 1;
      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
        // Remove the trailing ] from the last keys part.
        keys[keys_last] = keys[keys_last].replace(/\]$/, '');
        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat(keys);
        keys_last = keys.length - 1;
      } else {
        // Basic 'foo' style key.
        keys_last = 0;
      }
      // Are we dealing with a name=value pair, or just a name?
      if (param.length === 2) {
        val = decodeURIComponent(param[1]);
        // Coerce values.
        if (coerce) {
          val = val && !isNaN(val) ? +val : val === 'undefined' ? undefined : coerce_types[val] !== undefined ? coerce_types[val] : val;  // string
        }
        if (keys_last) {
          // Complex key, build deep object structure based on a few rules:
          // * The 'cur' pointer starts at the object top-level.
          // * [] = array push (n is set to array length), [n] = array if n is 
          //   numeric, otherwise object.
          // * If at the last keys part, set the value.
          // * For each keys part, if the current level is undefined create an
          //   object or array based on the type of the next keys part.
          // * Move the 'cur' pointer to the next level.
          // * Rinse & repeat.
          for (; i <= keys_last; i++) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
          }
        } else {
          // Simple key, even simpler rules, since only scalars and shallow
          // arrays are allowed.
          if ($.isArray(obj[key])) {
            // val is already an array, so push on the next value.
            obj[key].push(val);
          } else if (obj[key] !== undefined) {
            // val isn't an array, but since a second value has been specified,
            // convert val into an array.
            obj[key] = [
              obj[key],
              val
            ];
          } else {
            // val is a scalar.
            obj[key] = val;
          }
        }
      } else if (key) {
        // No value was defined, so set something meaningful.
        obj[key] = coerce ? undefined : '';
      }
    });
    return obj;
  };
}(jQuery));
'use strict';
var referenceDataServices = angular.module('panicApp.referenceDataServices', ['ngResource']);
referenceDataServices.factory('Range', [
  '$resource',
  function ($resource) {
    return $resource('referenceData/:rangeId.json', {}, {
      styleCatalogue: {
        method: 'GET',
        params: { rangeId: 'styleCatalogue' },
        isArray: true
      },
      itemCollection: {
        method: 'GET',
        params: { rangeId: 'itemCollection' },
        isArray: true
      },
      labelLookup: {
        method: 'GET',
        params: { rangeId: 'labels' },
        isArray: true
      }
    });
  }
]).factory('DesignBuilder', [
  '$resource',
  function ($resource) {
    return $resource('referenceData/designBuilder/:fileId.json', {}, {
      fabricSets: {
        method: 'GET',
        params: { fileId: 'fabricSets' },
        isArray: true
      }
    });
  }
]).factory('MetaData', [
  '$location',
  function ($location) {
    return {
      og_image: 'http://img.aurza.com/skt-001-02-013-slv-009-00-013-nek-001-00-003-blt-002-00-000-ext-002-00-000-ext-003-00-000.png',
      og_title: 'Sheath Dress',
      og_url: $location.absUrl(),
      og_site_name: 'AURZA',
      og_type: 'dress'
    };
  }
]).service('CatalogueService', [
  'Range',
  'DesignBuilder',
  '$q',
  function (Range, DesignBuilder, $q) {
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
        });
        return deferred.promise;
      },
      getItemCollectionPromiseForStyles: function (styles) {
        return $q.all(_.map(styles, function (style) {
          return DesignBuilder.get({ fileId: style }).$promise;
        })).then(function (results) {
          var aggregatedData = [];
          angular.forEach(results, function (result) {
            aggregatedData = aggregatedData.concat(result.collection);
          });
          return aggregatedData;
        });
      },
      getItemCollectionWithStyleDataPromiseForStyles: function (styles) {
        return $q.all(_.map(styles, function (style) {
          return DesignBuilder.get({ fileId: style }).$promise;
        })).then(function (results) {
          var aggregatedData = [];
          angular.forEach(results, function (result) {
            angular.forEach(result.collection, function (item) {
              var itemExt = _.extend({}, item, result.style);
              aggregatedData.push(itemExt);
            });
          });
          return aggregatedData;
        });
      },
      getItemPromise: function (styleId, itemId) {
        var deferred = $q.defer();
        var designConfig, itemData = { 'itemDesign': '' };
        DesignBuilder.get({ fileId: styleId }).$promise.then(function (result) {
          if (!itemId)
            itemId = result.style.defaultItemId;
          angular.forEach(result.collection, function (item) {
            if (item.itemId == itemId) {
              itemData.itemDesign = angular.copy(item);
            }
          });
          designConfig = _.extend({}, result, itemData);
          deferred.resolve(designConfig);
        });
        return deferred.promise;
        return $q.all(_.map(styles, function (style) {
          return DesignBuilder.get({ fileId: style }).$promise;
        })).then(function (results) {
          var aggregatedData = [];
          angular.forEach(results, function (result) {
            angular.forEach(result.collection, function (item) {
              var itemExt = _.extend({}, item, result.style);
              aggregatedData.push(itemExt);
            });
          });
          return aggregatedData;
        });
        var deferred = $q.defer();
        var styleCatalogue, styles = [];
        styleCatalogue = Range.styleCatalogue();
        styleCatalogue.$promise.then(function (result) {
          styles = _.reduce(result, function (a, b) {
            return a.concat(b.styleId);
          }, []);
          deferred.resolve(styles);
        });
        return deferred.promise;
      }
    };
  }
]).service('ReferenceDataCache', [
  'Range',
  'DesignBuilder',
  function (Range, DesignBuilder) {
    var styleCatalogue = null, labelCache = null, optionCache = null, itemCollection = null;
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
      getStyleCatalogue: function () {
        if (styleCatalogue == null) {
          styleCatalogue = Range.styleCatalogue();
          console.log('Lazy instantiation of styleCatalogue:' + styleCatalogue.length);
        }
        return styleCatalogue;
      },
      getLabels: function () {
        console.log('getLabels');
        if (labelCache == null) {
          labelCache = Range.labelLookup();
          console.log('Lazy instantiation of labelCache:' + labelCache.length);
        }
        return labelCache;
      },
      getOptions: function () {
        console.log('getOptions');
        if (optionCache == null) {
          optionCache = DesignBuilder.options();
          console.log('Lazy instantiation of optionCache:' + optionCache.length);
        }
        return optionCache;
      },
      getItemCollection: function () {
        if (itemCollection == null) {
          itemCollection = Range.itemCollection(function (data) {
            console.log('----Lazy instantiation of itemCollection: ' + data.length);
          }, function (data) {
            console.log('Oops -failed to instantiate itemCollection: ' + data.length);
          });
        }
        return itemCollection;
      },
      getItemDesign: function (itemId) {
        //        getDressCollection().
        var items = {}, out = '';
        items = this.getItemCollection(function (data) {
          //          console.log("Looking up item: "+itemId);
          //          console.log("item.length: "+items.length);
          for (var i = 0; i < items.length; i++) {
            //            console.log("-Checking item: "+items[i].itemId);
            if (items[i].itemId === itemId) {
              console.log('---Found item: ' + itemId + ' -> ' + items[i].design);
              out = angular.copy(items[i].design);
              break;
            }
          }
        }, function (data) {
          console.log('Oops -failed to getItemColection: ' + data.length);
        });
        return out;
      },
      getStyleById: function (id, $scope) {
        var styleCatalogue = Range.styleCatalogue(function (data) {
            //success
            //            console.log("styleCatalogue.length: "+styleCatalogue.length);
            for (var i = 0; i < styleCatalogue.length; i++) {
              //              console.log("id: "+styleCatalogue[i].styleId);
              if (styleCatalogue[i].styleId === id) {
                console.log('Found style: ' + id + ' -> ' + styleCatalogue[i].styleId);
                $scope.style = angular.copy(styleCatalogue[i]);
                break;
              }
            }  //            console.log("Returning:");
               //            console.log($scope.style);
          });
      },
      getItemById: function (id, $scope) {
        var itemCollection = Range.itemCollection(function (data) {
            //success
            //            console.log("itemCollection.length: "+itemCollection.length);
            for (var i = 0; i < itemCollection.length; i++) {
              //              console.log("id: "+itemCollection[i].itemId);
              if (itemCollection[i].itemId === id) {
                console.log('Found item: ' + id + ' -> ' + itemCollection[i].itemId);
                $scope.item = angular.copy(itemCollection[i]);
                break;
              }
            }  //            console.log("Returning:");
               //            console.log($scope.item);
          });
      }
    };
  }
]).filter('fabricLookup', [
  'ReferenceDataCache',
  function (ReferenceDataCache) {
    return function (input) {
      var options = ReferenceDataCache.getOptions();
      var out = '';
      //      console.log("Looking up fabric: "+input);
      //      console.log("options.length: "+options.length);
      for (var i = 0; i < options.length; i++) {
        if (options[i].id === input) {
          console.log('**Found options: ' + input + ' -> ' + options[i].fabrics);
          out = angular.copy(options[i].fabrics);
          break;
        }
      }
      return out;
    };
  }
]).filter('trimLookup', [
  'ReferenceDataCache',
  function (ReferenceDataCache) {
    return function (input) {
      var options = ReferenceDataCache.getOptions();
      var out = '';
      //      console.log("Looking up trim: "+input);
      //      console.log("options.length: "+options.length);
      for (var i = 0; i < options.length; i++) {
        if (options[i].id === input) {
          console.log('***********Found trim: ' + input + ' -> ' + options[i].trims);
          out = angular.copy(options[i].trims);
          break;
        }
      }
      return out;
    };
  }
]).filter('labelLookup', [
  'ReferenceDataCache',
  function (ReferenceDataCache) {
    return function (input) {
      var labels = ReferenceDataCache.getLabels();
      var out = '';
      //      console.log("Looking up label: "+input);
      //      console.log("label.length: "+labels.length);
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].id === input) {
          console.log('Found label: ' + input + ' -> ' + labels[i].label);
          out = angular.copy(labels[i].label);
        }
      }
      return out;
    };
  }
]);
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
designBuildDirective.directive('placeOrder', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        extras: '=',
        params: '=',
        sil: '='
      },
      template: '<a class="btn btn-danger igg-design-buttons"  target="_blank"' + 'href="' + 'mailto:info@aurza.com' + '?subject=Dress Design' + '&body=' + 'Dear Team AURZA, %0D%0A' + '%0D%0A Please find below the component codes for my dress design: %0D%0A %0D%0A' + '{{design}}' + '%0D%0A ' + '{{extras}}' + '%0D%0A %0D%0A ' + 'Please paste the link to your design: ' + '"' + 'style="font-family: \'Nothing You Could Do\', cursive;font-size: 20px;"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'design-build/place-order\']);"' + '>' + '<span class="glyphicon glyphicon-send"></span> ' + 'Send us your design' + '</a>'
    };
  }
]);
//var designString = function () {
//  var returnString = "";
//  alert("Here");
//  for (var element in $scope.form.design){
//    returnString += element.type + element.id + "\n";
//  }
//  console.log("Returning---: "+returnString);
//  return returnString;
//}
designBuildDirective.directive('reviewLink', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        sil: '='
      },
      template: '<a class="btn btn-danger igg-design-buttons" ' + 'href="' + '#!/review/{{sil.styleId}}/{{design}}"' + 'style="font-family: \'Nothing You Could Do\', cursive;font-size: 20px;"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'design-build/send\']);">' + 'Send us your design</a>'
    };
  }
]);
designBuildDirective.directive('designLink', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        sil: '='
      },
      template: '<a class="btn btn-default igg-design-buttons" ' + 'href="' + '#!/design/{{sil.styleId}}/{{design}}"' + 'style="font-family: \'Nothing You Could Do\', cursive;font-size: 20px;"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'design-build/send\']);">' + '<span class="glyphicon glyphicon-hand-left"></span> Make more changes</a>'
    };
  }
]);
designBuildDirective.directive('rawLink', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        sil: '='
      },
      template: '<a class="" ' + 'href="' + '#!/design/{{sil.styleId}}/{{design}}"' + 'style="font-size: 12px;"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'design-build/send\']);">' + $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#!/design/{{sil.styleId}}/{{design}}</a>'
    };
  }
]);
designBuildDirective.directive('rawLinkBox', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        sil: '='
      },
      template: '<textarea name="select1" style="width:100%" >' + $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#!/review/{{sil.styleId}}/{{design}}' + '</textarea>'
    };
  }
]);
designBuildDirective.directive('rawLinkTextarea', [
  '$location',
  function ($location) {
    return {
      scope: {
        design: '=',
        sil: '='
      },
      template: '<textarea id="Field216"' + 'name="Field216"' + 'class="field textarea small"' + 'rows="10" cols="50"' + 'tabindex="4"' + 'onkeyup=""' + 'required readonly>' + $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#!/review/{{sil.styleId}}/{{design}}' + '</textarea>'
    };
  }
]);
designBuildDirective.directive('shopBreadcrumb', function () {
  return {
    restrict: 'A',
    template: '<ul class="breaded">' + '<li ng-class="{active: step == \'shop\'}"><a href="#">Shop collection</a></li>' + '<li ng-class="{active: step == \'sizing\'}"><a href="#">Sizing</a></li>' + '<li ng-class="{active: step == \'review\'}"><a href="#">Review design</a></li>' + '<li ng-class="{active: step == \'checkout\'}"><a href="#">Checkout</a></li>' + '</ul>'
  };
});
designBuildDirective.directive('overview', function () {
  return {
    restrict: 'A',
    scope: { info: '=' },
    template: '<div class="row name">{{info.styleName}}</div>' + '<div class="row formal-name">{{info.styleFormalName}}</div>' + '<div class="row price">HKD {{info.price}}</div>'
  };
});
designBuildDirective.directive('designBreadcrumb', function () {
  return {
    restrict: 'A',
    template: '<ul class=" breaded" id="options">' + ' <li class="active"><a href="#design" data-toggle="tab">Customize</a></li>' + ' <li><a href="#accessorize" data-toggle="tab">Accessorize</a></li>' + ' <li><a href="#sizing" data-toggle="tab">Sizing</a></li>' + ' <li><a href="#checkout" data-toggle="tab">Checkout</a></li>' + '</ul>'
  };
});
designBuildDirective.directive('silhouette', function () {
  return {
    restrict: 'A',
    scope: { design: '=' },
    template: '<a href="#!/design/{{design.styleId}}"' + 'onClick="_gaq.push([\'_trackEvent\', \'Silhouettes\', \'customize\', \'{{design.styleId}}\']);">' + '<div class="row image">' + '<div class="col-lg-12 ">' + ' <div class="pic sprite-body {{design.silhouetteImage}}"></div>' + '</div>' + '</div>' + '<div class="row title handwriting large-hand">{{design.styleName}}</div>' + '<div class="row type handwriting">({{design.styleFormalName}})</div>' + '</a>'
  };
});
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
designBuildDirective.directive('facebook', [
  '$location',
  function ($location) {
    return {
      scope: { design: '=' },
      template: '<a class="btn btn-default igg-design-buttons" ' + 'href="' + 'https://www.facebook.com/dialog/feed?app_id=153275411536544' + '&name=I+just+designed+this+fabulous+dress+at+AURZA' + '&link=' + encodeURIComponent($location.absUrl()) + '&redirect_uri=' + encodeURIComponent('http://indiegogo-prototype-designer.aurza.com') + '&picture=http://img.aurza.com/' + 'skt-{{design.design.skirt.id}}-{{design.design.skirt.size}}-{{design.design.skirt.fabric}}-' + 'slv-{{design.design.sleeves.id}}-{{design.design.sleeves.size}}-{{design.design.sleeves.fabric}}-' + 'nek-{{design.design.neckline.id}}-{{design.design.neckline.size}}-{{design.design.neckline.fabric}}-' + 'blt-{{design.extras.belt.id}}-{{design.extras.belt.size}}-{{design.extras.belt.fabric}}-' + 'ext-{{design.extras.peplum.id}}-{{design.extras.peplum.size}}-{{design.extras.peplum.fabric}}-' + 'ext-{{design.extras.rosetta.id}}-{{design.extras.rosetta.size}}-{{design.extras.rosetta.fabric}}' + '.png' + '&caption=www.aurza.com' + '&description=You+can+design+your+individual+dress+at+www.aurza.com' + '"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'buy-sml-btn\', \'{{dress.silId}}/{{dress.itemId}}\']);">' + 'Facebook</a>'
    };
  }
]);
designBuildDirective.directive('drawDesignPic', function () {
  return {
    scope: { design: '=' },
    template: '<img ng-src="http://img.aurza.com/' + 'skt-{{design.design.skirt.id}}-{{design.design.skirt.size}}-{{design.design.skirt.fabric}}-' + 'slv-{{design.design.sleeves.id}}-{{design.design.sleeves.size}}-{{design.design.sleeves.fabric}}-' + 'nek-{{design.design.neckline.id}}-{{design.design.neckline.size}}-{{design.design.neckline.fabric}}-' + 'blt-{{design.extras.belt.id}}-{{design.extras.belt.size}}-{{design.extras.belt.fabric}}-' + 'ext-{{design.extras.peplum.id}}-{{design.extras.peplum.size}}-{{design.extras.peplum.fabric}}-' + 'ext-{{design.extras.rosetta.id}}-{{design.extras.rosetta.size}}-{{design.extras.rosetta.fabric}}' + '.png' + '" class="pic body">'
  };
});
designBuildDirective.directive('drawDesign', function () {
  return {
    scope: {
      builder: '=',
      design: '='
    },
    template: '<div class="pic body sprite-body {{builder.model}}"></div>' + '<div draw-dress parts="design.design"></div>' + '<div draw-accessories parts="design.extras"></div>'
  };
});
designBuildDirective.directive('drawDress', function () {
  return {
    scope: { parts: '=' },
    template: '<div ng-repeat="selection in parts">' + ' <div class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>' + ' <div class="pic trm sprite-{{selection.trim}} trm-{{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.trim}}"></div>' + '</div>'
  };
});
designBuildDirective.directive('drawAccessories', function () {
  return {
    scope: { parts: '=' },
    template: '<div ng-repeat="selection in parts">' + ' <div class="pic {{selection.type}} sprite-{{selection.fabric}} {{selection.type}}-{{selection.id}}-{{selection.size}}-{{selection.fabric}}"></div>' + '</div>'
  };
});
designBuildDirective.directive('partSelector', function () {
  return {
    restrict: 'E',
    scope: {
      part: '=',
      selectedOption: '='
    },
    template: ' <div data-toggle="buttons">' + '  <!--https://github.com/angular-ui/bootstrap/issues/233-->' + '  <div class="option-button" ng-repeat="value in part.values">' + '    <button type="button" class="btn btn-default option"' + '       ng-model="selectedOption[\'id\']" btn-radio="value.id"' + '       ng-class="{highlight: selectedOption[\'id\']==value.id }">' + '     <div class="db-icons-sprite {{part.type}}-{{value.id}}" tooltip="{{value.name}}"></div>' + '   </button>' + '  </div>' + '</div>'
  };
});
designBuildDirective.directive('sizeSelector', function () {
  return {
    restrict: 'E',
    scope: {
      part: '=',
      selectedOption: '='
    },
    template: '<select class="form-control input-sm" ng-model="selectedOption[\'size\']" ng-options="size.id as size.name for size in part.sizes"></select>'
  };
});
designBuildDirective.directive('fabricSelector', function () {
  return {
    restrict: 'E',
    scope: {
      fabricSet: '=',
      selectedOption: '=',
      isTrim: '='
    },
    template: ' <div class="fabric-group">' + '   <div class="row fabric-header">' + '     {{fabricSet.setName}}' + '   </div>' + '    <div class="row ">' + '    <div ng-switch on="isTrim" >' + '      <div draw-trim-fabrics ng-switch-when="true" selection="fabricSet" selected-option="selectedOption"></div>' + '      <div draw-fabrics ng-switch-default selection="fabricSet" selected-option="selectedOption"></div>' + '     </div>' + '  </div>' + '</div>'
  };
});
designBuildDirective.directive('extrasFabricSelector', function () {
  return {
    restrict: 'E',
    scope: {
      fabricSet: '=',
      selectedOption: '=',
      isTrim: '=',
      type: '='
    },
    template: ' <div class="fabric-group middle-inner">' + '   <div class="col-md-3 fabric-header">' + '     {{fabricSet.setName}}' + '   </div>' + '    <div class="col-md-9 ">' + '      <div ng-switch on="isTrim" >' + '<button ng-repeat="fabric in fabricSet.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' + 'ng-click="selectedOption[\'fabric\'] = fabric.fabId; selectedOption[\'id\'] = type" ' + 'ng-model="selectedOption[\'code\']" btn-radio="type +\'-\'+fabric.fabId" ' + 'ng-class="{active: form[option.name][part.part_name][\'code\']==type +\'-\'+fabric.fabId }"' + 'tooltip="{{fabric.fabName}}"' + 'onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);">' + '      </button>' + '      </div>' + '    </div>' + '</div>'
  };
});
designBuildDirective.directive('trimSelector', function () {
  return {
    restrict: 'E',
    scope: {
      fabricSet: '=',
      selectedOption: '=',
      isTrim: '=',
      partName: '='
    },
    template: ' <div class="col-sm-7 col-sm-12">' + '   <div class="fabric-group">' + '     <div class="row fabric-header">' + '       {{fabricSet.setName}} trim' + '     </div>' + '     <div class="row">' + '       <div class="col-sm-3 col-xs-6">' + '         <button type="button" class="btn fabric-selector fabric-none" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="No trim"' + '             onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);">' + '        </button>' + '     </div>' + '       <div class="col-sm-9 col-xs-6">' + '         <div draw-trim-fabrics selection="fabricSet" selected-option="selectedOption"></div>' + '     </div>' + '     </div>' + '   </div>' + ' </div>'
  };
});
designBuildDirective.directive('drawFabrics', function () {
  return {
    scope: {
      selection: '=',
      selectedOption: '='
    },
    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' + 'ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  };
});
designBuildDirective.directive('drawExtrasFabrics', function () {
  return {
    scope: {
      selection: '=',
      selectedOption: '=',
      type: '='
    },
    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ' + 'ng-model="selectedOption[\'code\']" btn-radio="type +\'-\'+fabric.fabId" tooltip="{{selectedOption.id}}-{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  };
});
//ng-model="form[option.name][part.part_name]['id']" btn-radio="value.id"
designBuildDirective.directive('drawTrimFabrics', function () {
  return {
    scope: {
      selection: '=',
      selectedOption: '='
    },
    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn fabric-selector fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  };
});
designBuildDirective.directive('drawAdmin', function () {
  return {
    scope: { dress: '=' },
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  };
});
'use strict';
var designBuildFilter = angular.module('panicApp.designBuildFilters', []);
designBuildFilter.filter('filterSets', function () {
  return function (sets, filter) {
    var filteredResult = [];
    for (var filterFabric in filter)
      for (var fabricSet in sets) {
        if (filter[filterFabric].setId == sets[fabricSet].setId) {
          filteredResult.push(sets[fabricSet]);
          break;
        }
      }
    return filteredResult;
  };
});
designBuildFilter.filter('rollover', function () {
  return function (img) {
    return img.replace(/_bk$/, '');
  };
});
designBuildFilter.filter('designString', function () {
  return function (design) {
    var returnString = JSON.stringify(design);
    //    alert("Here");
    //    for (var element in design){
    //      returnString += element.type + element.id + "\n";
    //    }
    console.log('Returning---: ' + returnString);
    return returnString;
  };
});
'use strict';
angular.module('panicApp.Controllers', []).run([
  '$http',
  function ($http) {
    console.log('Controllers: run analytics');
    _gaq.push([
      '_setAccount',
      'UA-42859790-2'
    ]);
    _gaq.push([
      '_setDomainName',
      '.aurza.com'
    ]);
    //	_gaq.push(['_trackPageview']);
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  }
]);
var trackPageInGoogleAnalytics = function ($rootScope, $window, $location, $routeParams) {
  // Fire Google Analytics on Angular page load
  //  console.log("trackPageInGoogleAnalytics");
  $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams));
};
var track = function ($window, $location, $routeParams) {
  //  console.log("$location=");
  //  console.log($location);
  var path = convertPathToQueryString($location.path(), $routeParams);
  console.log('track: about to push: ' + path);
  $window._gaq.push([
    '_trackPageview',
    path
  ]);  //  console.log("track: pushed ");
};
var convertPathToQueryString = function (locpath, $routeParams) {
  //  console.log("convertPathToQueryString");
  //  console.log("$routeParams=");
  //  console.log($routeParams);
  //  console.log("locpath=");
  //  console.log(locpath);
  //  console.log("path=");
  //  console.log(path);
  //  console.log("search=");
  //  console.log(search);
  for (var key in $routeParams) {
    var queryParam = '/' + $routeParams[key];
    //    console.log("queryParam="+queryParam);
    locpath = locpath.replace(queryParam, '');  //    console.log("path ADDED="+locpath);
  }
  //  console.log("path NOW="+locpath);
  for (key in $routeParams) {
    console.log('key=' + key);
  }
  // TODO - FIX ME
  //  var querystring = decodeURIComponent($.param($routeParams));// querystring=pete=me&rangeId=sheath-new&itemId=fred
  var querystring = getAsUriParameters($routeParams);
  //  console.log("querystring="+querystring);
  if (querystring === '')
    return locpath;
  return locpath + '?' + querystring;  //  return locpath;
};
//http://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters
//url = Object.keys(data).map(function(k) {
//  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
//}).join('&')
var getAsUriParameters = function (data) {
  var url = '';
  for (var prop in data) {
    url += encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]) + '&';
  }
  return url.substring(0, url.length - 1);
};
//getAsUriParameters(data); //"action=actualiza_resultado&postID=1&gl=2&gl2=3"
'use strict';
angular.module('panicApp.Controllers').controller('HomeCarouselCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    $scope.myInterval = 5000;
    $scope.slides = [
      {
        image: 'images/home/Choose.png',
        text: 'Choose...'
      },
      {
        image: 'images/home/Customize.png',
        text: 'Customize...'
      },
      {
        image: 'images/home/Cherish.png',
        text: 'Cherish!'
      }
    ];
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('StaticPageCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  '$anchorScroll',
  function ($scope, $rootScope, $window, $location, $routeParams, $anchorScroll) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    $scope.scrollTo = function (id) {
      $location.hash(id);
      $anchorScroll();
    };
    $scope.headline = 'test';
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('DressCollectionCtrl', [
  '$scope',
  'Range',
  'CatalogueService',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, Range, CatalogueService, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    // Put Dress Collection data into page scope
    //      $scope.dresses = Range.itemCollection();
    var stylesPromise = CatalogueService.getStyleListPromise();
    var styles = [];
    stylesPromise.then(function (result) {
      // this is only run after $http completes
      styles = result;
      var itemsPromise = CatalogueService.getItemCollectionWithStyleDataPromiseForStyles([
          'sheath',
          'swing'
        ]);
      //                styles);
      var items = [], itemIds = [];
      itemsPromise.then(function (result) {
        // this is only run after $http completes
        $scope.dresses = angular.copy(result);
        ;
      });
    });
    //        var styleCat, styleIds = [];
    //
    //        Range.styleCatalogue().$promise.then(function (result) {
    //            styleCat = result;
    //        })
    //
    //        angular.forEach(styleCat, function (style) {
    //            styleIds = styleIds.concat(style.styleId);
    //        });
    var silhouettes_reset, types_reset;
    silhouettes_reset = [
      {
        id: 'sheath',
        label: 'COCO (Sheath)',
        checked: true
      },
      {
        id: 'swing',
        label: 'AUDREY (Swing)',
        checked: true
      },
      {
        id: 'flare',
        label: 'ALEXA (Flare)',
        checked: true
      },
      {
        id: 'doloman',
        label: 'CHRISTINA (Doloman)',
        checked: true
      },
      {
        id: 'swoosh',
        label: 'KATE (Swoosh)',
        checked: true
      },
      {
        id: 'shift',
        label: 'EDDIE (Shift)',
        checked: true
      },
      {
        id: 'shirt',
        label: 'ELLE (Shirt)',
        checked: true
      },
      {
        id: 'maxi-shirt',
        label: 'CLAUDIA (Maxi-shirt)',
        checked: true
      }
    ];
    types_reset = [
      {
        id: 'dress',
        label: 'Dress',
        checked: true
      },
      {
        id: 'skirt',
        label: 'Skirt',
        checked: true
      }
    ];
    $scope.search = function (item) {
      var found = false;
      for (var i = 0; i < $scope.silhouettes.length; i++) {
        if ($scope.silhouettes[i].id == item.styleId) {
          console.log('Found dress: ' + item.styleId + ' checked: ' + $scope.silhouettes[i].checked);
          if ($scope.silhouettes[i].checked) {
            for (var i = 0; i < $scope.types.length; i++) {
              if ($scope.types[i].id == item.catId) {
                console.log('Found type: ' + item.catId + ' checked: ' + $scope.types[i].checked);
                if ($scope.types[i].checked)
                  found = true;
              }
            }
          }
          break;
        }
      }
      return found;
    };
    $scope.reset = function () {
      $scope.silhouettes = angular.copy(silhouettes_reset);
      $scope.types = angular.copy(types_reset);
    };
    $scope.reset();
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('ShopItemCtrl', [
  '$scope',
  'Range',
  'ReferenceDataCache',
  'CatalogueService',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, Range, ReferenceDataCache, CatalogueService, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    // Put Style data into page scope
    //      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
    //      ReferenceDataCache.getItemById($routeParams.itemId, $scope);
    CatalogueService.getItemPromise($routeParams.styleId, $routeParams.itemId).then(function (result) {
      // this is only run after $http completes
      $scope.item = angular.copy(result);
    });
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('PurchaseCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, Range, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);  // Put Dress Collection data into page scope
                                                                               //      $scope.dresses = Range.itemCollection();
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('SilhouetteCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  '$http',
  '$q',
  function ($scope, Range, $rootScope, $window, $location, $routeParams, $http, $q) {
    $scope.$emit('LOAD');
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    // Put Style Catalogue data into page scope
    $scope.styles = Range.styleCatalogue(function (data) {
      //success
      console.log('styles.length: ' + $scope.styles.length);
    });
    var perks_reset, perkChecked, perkValues;
    perks_reset = [
      {
        id: 'all',
        label: 'View all',
        default: true,
        values: [
          'skirt',
          'top',
          'dress',
          'silk',
          'maxi'
        ]
      },
      {
        id: 'separates',
        label: 'Perfect Skirt or Top',
        values: [
          'skirt',
          'top'
        ]
      },
      {
        id: 'silk_dress',
        label: 'Perfect Silk Dress',
        values: ['silk']
      },
      {
        id: 'tailored_dress',
        label: 'Perfect Tailored Dress',
        values: ['dress']
      },
      {
        id: 'skirt_and_top',
        label: 'Perfect Skirt and Top',
        values: [
          'skirt',
          'top'
        ]
      },
      {
        id: 'silk_maxi',
        label: 'Perfect Silk Maxi Dress',
        values: ['maxi']
      },
      {
        id: 'bundles',
        label: ' Multi-Dress Bundles',
        values: [
          'silk',
          'maxi',
          'dress'
        ]
      },
      {
        id: 'gift',
        label: ' GIFT BOX (Voucher)',
        values: [
          'silk',
          'dress'
        ]
      }
    ];
    $scope.perkValues = '';
    //      $scope.search = function (item){
    //        var found = false;
    //        for(var i = 0; i < $scope.perks.length; i++) {
    //          if ($scope.perks[i].id == item.silId) {
    //            console.log("Found dress: "+ item.silId + " checked: "+ $scope.perks[i].checked)
    //            if ($scope.perks[i].checked) {
    //              for(var i = 0; i < $scope.types.length; i++) {
    //                if ($scope.types[i].id == item.catId) {
    //                  console.log("Found type: "+ item.catId + " checked: " + $scope.types[i].checked)
    //                  if ($scope.types[i].checked)
    //                    found = true;
    //                }
    //              }
    //            }
    //            break;
    //          }
    //        }
    //        return found;
    //      };
    $scope.search = function (item) {
      var found = false;
      console.log('$scope.perkValues: ' + JSON.stringify($scope.perkValues));
      console.log('item.type: ' + JSON.stringify(item.type));
      for (var i = 0; i < $scope.perkValues.length; i++) {
        if ($scope.perkValues[i] == item.type) {
          console.log('Found dress: ' + item.type + ' checked: ' + $scope.perkValues[i]);
          //            if ($scope.perks[i].checked) {
          //              for(var i = 0; i < $scope.types.length; i++) {
          //                if ($scope.types[i].id == item.catId) {
          //                  console.log("Found type: "+ item.catId + " checked: " + $scope.types[i].checked)
          //                  if ($scope.types[i].checked)
          found = true;
          //                }
          //              }
          //            }
          break;
        }
      }
      return found;
    };
    $scope.reset = function () {
      //        $scope.perkChecked = angular.copy(perks_reset[0].id);
      $scope.perkValues = angular.copy(perks_reset[0].values);
      $scope.perks = angular.copy(perks_reset);  //        $scope.types = angular.copy(types_reset);
    };
    $scope.reset();
    var aggregatedPromise = $q.all([
        $http.get('/images/003.png'),
        $http.get('/images/008.png'),
        $http.get('/images/010.png'),
        $http.get('/images/011.png'),
        $http.get('/images/013.png'),
        $http.get('/images/014.png'),
        $http.get('/images/085.png'),
        $http.get('/images/088.png'),
        $http.get('/images/089.png'),
        $http.get('/images/120.png'),
        $http.get('/images/160.png'),
        $http.get('/images/161.png'),
        $http.get('/images/165.png'),
        $http.get('/images/166.png'),
        $http.get('/images/168.png'),
        $http.get('/images/169.png'),
        $http.get('/images/170.png')
      ]);
    aggregatedPromise.then(function () {
      $scope.$emit('UNLOAD');
    });  //        .success(function(data){
         ////          $scope.people=data
         //          $scope.$emit('UNLOAD')
         //        })
  }
]).controller('appController', [
  '$scope',
  '$location',
  '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    if ($location.path() == '/how-to-help') {
      $scope.headline = 'How YOU can HELP...';
    } else {
      $scope.headline = 'Send us YOUR design';
    }
    $scope.scrollTo = function (id) {
      $location.hash(id);
      $anchorScroll();
    };
    //    console.log("Location.path is: ");
    //    console.log($location.path());
    $scope.$on('LOAD', function () {
      $scope.loading = true;
    });
    $scope.$on('UNLOAD', function () {
      $scope.loading = false;
    });
  }
]).controller('MetaCtrl', [
  '$scope',
  'MetaData',
  function ($scope, MetaData) {
    $scope.data = MetaData;
  }
]).controller('MetaCtrlInput', [
  '$scope',
  'MetaData',
  function ($scope, MetaData) {
    $scope.data = MetaData;
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('RangeDetailsCtrl', [
  '$scope',
  '$routeParams',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  function ($scope, $routeParams, Range, $rootScope, $window, $location) {
    // Fire Google Analytics on Angular page load
    $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams));
    // Put Design Collection data into page scope
    $scope.ranges = Range.query();
    $scope.range = Range.get({ rangeId: $routeParams.rangeId });
  }
]);
'use strict';
//angular.module('panicApp.Controllers', ['ngSocial'])
angular.module('panicApp.Controllers').controller('NewDesignBuildCtrl', [
  '$scope',
  '$routeParams',
  'Range',
  'ReferenceDataCache',
  'DesignBuilder',
  'CatalogueService',
  '$rootScope',
  '$window',
  '$location',
  function ($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, CatalogueService, $rootScope, $window, $location) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    var master = '', categoryId = 'dresses',
      //$routeParams.categoryId;
      styleId = $routeParams.styleId, itemId = $routeParams.itemId, designCode = $routeParams.designCode, allFabricSets = {}, range = {};
    $scope.form = '';
    $scope.current_title = 'Test';
    $scope.current_description = 'Test description';
    $scope.headline = 'test';
    // Put Style data into page scope
    //      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
    //      ReferenceDataCache.getItemById($routeParams.itemId, $scope);
    CatalogueService.getItemPromise($routeParams.styleId, $routeParams.itemId).then(function (result) {
      // this is only run after $http completes
      $scope.item = angular.copy(result);
      if (_.isUndefined(designCode)) {
        master = angular.copy(result.itemDesign.itemDesign);
      }
      range = angular.copy(result);
      $scope.master = master;
      // so it can be viewed in debug screen
      $scope.params = $.param(master);
      $scope.cancel();  // set form to master
    });
    $scope.isDebugCollapsed = true;
    $scope.styleId = styleId;
    $scope.categoryId = categoryId;
    if (designCode) {
      $scope.designCode = designCode;
      $scope.deparam = angular.copy($.deparam(designCode));
    }
    var clearTrim = function (partType) {
      partType.trim = '';
    };
    $scope.clearTrim = clearTrim;
    $scope.dressPartCode = function (selection) {
      console.log('SELCTION:' + selection);
      return selection.type + '-' + selection.id + selection.length + '-' + selection.fabric;
    };
    if (itemId) {
    }
    //      $scope.isActive = function(cat) {
    //        return cat.category.categoryName.designs.id === styleId;
    //      };
    $scope.ranges = Range.styleCatalogue(function (data) {
      //success
      console.log('==================');
      loadStyle($scope);  //, data, categoryId, styleId);
    });
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
    $scope.fabricSets = DesignBuilder.fabricSets(function (data) {
      // success
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
    }, function (data) {
      //failure
      alert('ooops - loading fabrics');
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
      var returnString = ' ';
      console.log('I have:' + JSON.stringify(form));
      for (var design in form) {
        var partString = '';
        for (var element in form[design]) {
          if (element != '$$hashKey')
            partString += element + ' = ' + JSON.stringify(form[design][element]) + '| ';  //            returnString += element.type + element.id + "\n";
        }
        console.log(partString);
        returnString += design + ' : ' + ' %0D%0A ' + partString + ' %0D%0A ';
      }
      console.log('Returning---: ' + returnString);
      return returnString;
    };
    $scope.designLink = function (form) {
      var returnString = ' ';
      console.log('I have:' + JSON.stringify(form));
      console.log('Returning---: ' + returnString);
      return returnString;
    }  //      $scope.loadStyle = loadStyle;//, styleId);
       //    $scope.isSaveDisabled = function() {
       //        return $scope.form.$invalid || angular.equals(master, $scope.form);
       //    };
       //    $scope.cancel();
       //      $scope.setType = function(attr, type) {
       //        attr
       //      }
;
  }
]);
var loadStyle = function ($scope) {
  //, catalogue, catId, desId) {
  var category = getCategoryById($scope.ranges, $scope.categoryId), style = getStyleById(category.styles, $scope.styleId);
  $scope.category = category;
  $scope.style = style;
};
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
  console.log('Returning: ' + category);
  return category;
};
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
  console.log('Returning: ' + style);
  return style;
};
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
  $.deparam(code);
};
var SizingCtrl = function ($scope) {
  $scope.open = function () {
    $scope.shouldBeOpen = true;
  };
  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };
  //  $scope.items = ['item1', 'item2'];
  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };
};