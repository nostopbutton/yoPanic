'use strict';
angular.module('panicApp', [
  'panicApp.Controllers',
  'panicApp.referenceDataServices',
  'panicApp.designBuildDirectives',
  'panicApp.designBuildFilters',
  'ui.bootstrap',
  'mgcrea.bootstrap.affix',
  'ui.scrollfix',
  'ngSocial'
]).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/silhouettes.html',
      controller: 'SilhouetteCtrl'
    }).when('/design/:styleId', {
      templateUrl: 'views/idggDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/design/:styleId/:itemId', {
      templateUrl: 'views/newDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/designAdmin/:styleId', {
      templateUrl: 'views/designBuildAdmin.html',
      controller: 'NewDesignBuildCtrl'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.hashPrefix('!');
  }
]);
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
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
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
    return path;
  };
});
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
]).factory('DesignBuilder', [
  '$resource',
  function ($resource) {
    return $resource('referenceData/designBuilder/:fileId.json', {}, {
      options: {
        method: 'GET',
        params: { fileId: 'options' },
        isArray: true
      },
      fabricSets: {
        method: 'GET',
        params: { fileId: 'fabricSets' },
        isArray: true
      }
    });
  }
]).service('ReferenceDataCache', [
  'Range',
  'DesignBuilder',
  function (Range, DesignBuilder) {
    var styleCatalogue = null, labelCache = null, optionCache = null, itemCollection = null;
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
        var items = {}, out = '';
        items = this.getItemCollection(function (data) {
          console.log('Looking up item: ' + itemId);
          console.log('item.length: ' + items.length);
          for (var i = 0; i < items.length; i++) {
            console.log('-Checking item: ' + items[i].itemId);
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
            console.log('styleCatalogue.length: ' + styleCatalogue.length);
            for (var i = 0; i < styleCatalogue.length; i++) {
              console.log('id: ' + styleCatalogue[i].styleId);
              if (styleCatalogue[i].styleId === id) {
                console.log('Found style: ' + id + ' -> ' + styleCatalogue[i].styleId);
                $scope.style = angular.copy(styleCatalogue[i]);
                break;
              }
            }
            console.log('Returning:');
            console.log($scope.style);
          });
      },
      getItemById: function (id, $scope) {
        var itemCollection = Range.itemCollection(function (data) {
            console.log('itemCollection.length: ' + itemCollection.length);
            for (var i = 0; i < itemCollection.length; i++) {
              console.log('id: ' + itemCollection[i].itemId);
              if (itemCollection[i].itemId === id) {
                console.log('Found item: ' + id + ' -> ' + itemCollection[i].itemId);
                $scope.item = angular.copy(itemCollection[i]);
                break;
              }
            }
            console.log('Returning:');
            console.log($scope.item);
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
      console.log('Looking up fabric: ' + input);
      console.log('options.length: ' + options.length);
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
      console.log('Looking up trim: ' + input);
      console.log('options.length: ' + options.length);
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
      console.log('Looking up label: ' + input);
      console.log('label.length: ' + labels.length);
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
'use strict';
var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);
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
    template: '<a href="#!/design/{{design.styleId}}"' + 'onClick="_gaq.push([\'_trackEvent\', \'Silhouettes\', \'customize\', \'{{design.styleId}}\']);">' + '<div class="row image">' + '<div class="col-lg-12 ">' + ' <div class="pic sprite-silhouettes {{design.silhouetteImage}}"></div>' + '</div>' + '</div>' + '<div class="row title handwriting large-hand">{{design.styleName}}</div>' + '<div class="row type handwriting">({{design.styleFormalName}})</div>' + '</a>'
  };
});
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
    scope: { design: '=' },
    template: '<div class="pic body sprite-silhouettes {{design.model}}"></div>' + '<div draw-dress parts="design.design"></div>' + '<div draw-accessories parts="design.extras"></div>'
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
    template: ' <div class="col-md-7">' + '   <div class="fabric-group">' + '     <div class="row fabric-header">' + '       {{fabricSet.setName}} trim' + '     </div>' + '     <div class="row">' + '       <div class="col-md-5">' + '         <button type="button" class="btn fabric-selector fabric-none" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="No trim"' + '             onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);">' + '        </button>' + '     </div>' + '       <div class="col-md-5">' + '         <div draw-trim-fabrics selection="fabricSet" selected-option="selectedOption"></div>' + '     </div>' + '     </div>' + '   </div>' + ' </div>'
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
'use strict';
angular.module('panicApp.Controllers', []).run([
  '$http',
  function ($http) {
    console.log('run analytics');
    _gaq.push([
      '_setAccount',
      'UA-38964974-1'
    ]);
    _gaq.push([
      '_setDomainName',
      'none'
    ]);
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  }
]);
var trackPageInGoogleAnalytics = function ($rootScope, $window, $location, $routeParams, path, search) {
  console.log('trackPageInGoogleAnalytics');
  $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams, path, search));
};
var track = function ($window, $location, $routeParams, path, search) {
  console.log('$location=');
  console.log($location);
  var path = convertPathToQueryString($location.path(), $routeParams);
  console.log('track: about to push: ' + path);
  $window._gaq.push([
    '_trackPageview',
    path
  ]);
  console.log('track: pushed ');
};
var convertPathToQueryString = function (locpath, $routeParams, path, search) {
  console.log('convertPathToQueryString');
  console.log('$routeParams=');
  console.log($routeParams);
  console.log('locpath=');
  console.log(locpath);
  console.log('path=');
  console.log(path);
  console.log('search=');
  console.log(search);
  for (var key in $routeParams) {
    var queryParam = '/' + $routeParams[key];
    console.log('queryParam=' + queryParam);
    locpath = locpath.replace(queryParam, '');
    console.log('path ADDED=' + locpath);
  }
  console.log('path NOW=' + locpath);
  for (key in $routeParams) {
    console.log('key=' + key);
  }
  var querystring = getAsUriParameters($routeParams);
  console.log('querystring=' + querystring);
  if (querystring === '')
    return path;
  return path + '?' + querystring;
};
var getAsUriParameters = function (data) {
  var url = '';
  for (var prop in data) {
    url += encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]) + '&';
  }
  return url.substring(0, url.length - 1);
};
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
  function ($scope, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('DressCollectionCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, Range, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    $scope.dresses = Range.itemCollection();
    var silhouettes_reset, types_reset;
    silhouettes_reset = [
      {
        id: 'swoosh',
        label: 'SHIFT (Twiggy)',
        checked: true
      },
      {
        id: 'sheath',
        label: 'SHEATH (Christina)',
        checked: true
      },
      {
        id: 'swing',
        label: 'SWING (Audrey)',
        checked: true
      }
    ];
    types_reset = [
      {
        id: 'dresses',
        label: 'Dress',
        checked: true
      },
      {
        id: 'skirts',
        label: 'Skirt',
        checked: true
      }
    ];
    $scope.search = function (item) {
      var found = false;
      for (var i = 0; i < $scope.silhouettes.length; i++) {
        if ($scope.silhouettes[i].id == item.silId) {
          console.log('Found dress: ' + item.silId + ' checked: ' + $scope.silhouettes[i].checked);
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
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function ($scope, Range, ReferenceDataCache, $rootScope, $window, $location, $routeParams) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
    ReferenceDataCache.getItemById($routeParams.itemId, $scope);
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
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
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
    $scope.styles = Range.styleCatalogue(function (data) {
      console.log('$scope.styles.length: ' + $scope.styles.length);
    });
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
    });
  }
]).controller('appController', [
  '$scope',
  function ($scope) {
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
    $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams));
    $scope.ranges = Range.query();
    $scope.range = Range.get({ rangeId: $routeParams.rangeId });
  }
]);
'use strict';
angular.module('panicApp.Controllers').controller('NewDesignBuildCtrl', [
  '$scope',
  '$routeParams',
  'Range',
  'ReferenceDataCache',
  'DesignBuilder',
  '$rootScope',
  '$window',
  '$location',
  function ($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder, $rootScope, $window, $location) {
    trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
    var master = '', categoryId = 'dresses', styleId = $routeParams.styleId, itemId = $routeParams.itemId, allFabricSets = {}, range = {};
    $scope.current_title = 'Test';
    $scope.current_description = 'Test description';
    ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
    ReferenceDataCache.getItemById($routeParams.itemId, $scope);
    $scope.isDebugCollapsed = true;
    $scope.styleId = styleId;
    $scope.categoryId = categoryId;
    var clearTrim = function (partType) {
      partType.trim = '';
    };
    $scope.clearTrim = clearTrim;
    $scope.dressPartCode = function (selection) {
      console.log('SELCTION:' + selection);
      return selection.type + '-' + selection.id + selection.length + '-' + selection.fabric;
    };
    if (itemId) {
      Range.itemCollection(function (itemData) {
        console.log('Looking up item: ' + itemId);
        console.log('itemData.length: ' + itemData.length);
        for (var i = 0; i < itemData.length; i++) {
          console.log('-Checking item: ' + itemData[i].itemId);
          if (itemData[i].itemId === itemId) {
            console.log('---Found item: ' + itemId + ' -> ' + itemData[i].design);
            master = angular.copy(itemData[i].design);
            break;
          }
        }
      }, function (data) {
        console.log('Oops - failed to getItemColection: ' + data.length);
      });
    }
    $scope.ranges = Range.styleCatalogue(function (data) {
      console.log('==================');
      loadStyle($scope);
    });
    $scope.range = DesignBuilder.get({ fileId: $routeParams.styleId }, function (data) {
      if (!itemId) {
        master = angular.copy(data.default);
      }
      range = angular.copy(data);
      $scope.master = master;
      $scope.cancel();
    }, function (data) {
      alert('ooops - loading range');
    });
    $scope.cancel = function () {
      $scope.form = angular.copy(master);
    };
    $scope.fabricSets = DesignBuilder.fabricSets(function (data) {
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
      alert('ooops - loading fabrics');
    });
    $scope.save = function () {
      master = $scope.form;
      $scope.cancel();
    };
    $scope.isCancelDisabled = function () {
      return angular.equals(master, $scope.form);
    };
  }
]);
var loadStyle = function ($scope) {
  var category = getCategoryById($scope.ranges, $scope.categoryId), style = getStyleById(category.styles, $scope.styleId);
  $scope.category = category;
  $scope.style = style;
};
var getCategoryById = function (categories, id) {
  console.log('categories.length:' + categories.length);
  var category = [];
  for (var i = 0; i < categories.length; i++) {
    console.log('categoryName:' + categories[i].catId);
    if (categories[i].catId === id) {
      console.log('Found category: ' + id + ' -> ' + categories[i].catId);
      category = angular.copy(categories[i]);
      break;
    }
  }
  console.log('Returning: ' + category);
  return category;
};
var getStyleById = function (styles, id) {
  console.log('styles.length: ' + styles.length);
  var style = {};
  for (var i = 0; i < styles.length; i++) {
    console.log('id: ' + styles[i].styleId);
    if (styles[i].styleId === id) {
      console.log('Found style: ' + id + ' -> ' + styles[i].styleId);
      style = angular.copy(styles[i]);
      break;
    }
  }
  console.log('Returning: ' + style);
  return style;
};
var SizingCtrl = function ($scope) {
  $scope.open = function () {
    $scope.shouldBeOpen = true;
  };
  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };
  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };
};