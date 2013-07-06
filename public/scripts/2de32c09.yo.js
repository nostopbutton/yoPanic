'use strict';
angular.module('panicApp', [
  'panicApp.Controllers',
  'panicApp.referenceDataServices',
  'panicApp.designBuildDirectives',
  'panicApp.designBuildFilters',
  'ui.bootstrap'
]).config([
  'e',
  function (e) {
    e.when('/', {
      templateUrl: 'views/home.html',
      controller: 'StaticPageCtrl'
    }).when('/fit', {
      templateUrl: 'views/fit.html',
      controller: 'StaticPageCtrl'
    }).when('/fabrics', {
      templateUrl: 'views/fabrics.html',
      controller: 'StaticPageCtrl'
    }).when('/party', {
      templateUrl: 'views/party.html',
      controller: 'StaticPageCtrl'
    }).when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'StaticPageCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'StaticPageCtrl'
    }).when('/collection', {
      templateUrl: 'views/dressCollection.html',
      controller: 'DressCollectionCtrl'
    }).when('/design', {
      templateUrl: 'views/silhouettes.html',
      controller: 'SilhouetteCtrl'
    }).when('/olddesign/:rangeId', {
      templateUrl: 'views/designBuildDirective.html',
      controller: 'DesignBuildCtrl'
    }).when('/olddesign/:rangeId/:itemId', {
      templateUrl: 'views/designBuildDirective.html',
      controller: 'DesignBuildCtrl'
    }).when('/design/:rangeId', {
      templateUrl: 'views/newDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/design/:rangeId/:itemId', {
      templateUrl: 'views/newDesignBuild.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/designAdmin/:rangeId', {
      templateUrl: 'views/designBuildAdmin.html',
      controller: 'NewDesignBuildCtrl'
    }).when('/purchase', {
      templateUrl: 'views/sizing.html',
      controller: 'StaticPageCtrl'
    }).when('/adminCollection', {
      templateUrl: 'views/adminCollection.html',
      controller: 'CollectionCtrl'
    }).when('/adminCollection/:rangeId', {
      templateUrl: 'views/adminRangeDetails.html',
      controller: 'RangeDetailsCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]), function () {
  for (var e, t = function () {
      }, o = [
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
      ], n = o.length, l = window.console = window.console || {}; n--;)
    e = o[n], l[e] || (l[e] = t);
}();
var _gaq = _gaq || [];
angular.module('analytics', []).run([
  '$http',
  function () {
    console.log('run analytics'), _gaq.push([
      '_setAccount',
      'UA-38964974-1'
    ]), _gaq.push([
      '_setDomainName',
      'none'
    ]);
    var e = document.createElement('script');
    e.type = 'text/javascript', e.async = !0, e.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
  }
]).service('analytics', function (e, t, o, n) {
  e.$on('$viewContentLoaded', l), console.log('analytics service');
  var l = function () {
      console.log('in track');
      var e = i(o.path(), n);
      t._gaq.push([
        '_trackPageview',
        e
      ]);
    }, i = function (e, t) {
      for (var o in t) {
        var n = '/' + t[o];
        e = e.replace(n, '');
      }
      return e;
    };
});
var referenceDataServices = angular.module('panicApp.referenceDataServices', ['ngResource']);
referenceDataServices.factory('Range', [
  'e',
  function (e) {
    return e('referenceData/:rangeId.json', {}, {
      designCatalogue: {
        method: 'GET',
        params: { rangeId: 'designCatalogue' },
        isArray: !0
      },
      itemCollection: {
        method: 'GET',
        params: { rangeId: 'itemCollection' },
        isArray: !0
      },
      labelLookup: {
        method: 'GET',
        params: { rangeId: 'labels' },
        isArray: !0
      }
    });
  }
]).factory('DesignBuilder', [
  'e',
  function (e) {
    return e('referenceData/designBuilder/:fileId.json', {}, {
      options: {
        method: 'GET',
        params: { fileId: 'options' },
        isArray: !0
      },
      fabricSets: {
        method: 'GET',
        params: { fileId: 'fabricSets' },
        isArray: !0
      }
    });
  }
]).service('ReferenceDataCache', [
  'e',
  't',
  function (e, t) {
    var o = null, n = null, l = null, i = null;
    return {
      getDesignCatalogue: function () {
        return null == o && (o = e.designCatalogue(), console.log('Lazy instantiation of designCatalogue:' + o.length)), o;
      },
      getLabels: function () {
        return console.log('getLabels'), null == n && (n = e.labelLookup(), console.log('Lazy instantiation of labelCache:' + n.length)), n;
      },
      getOptions: function () {
        return console.log('getOptions'), null == l && (l = t.options(), console.log('Lazy instantiation of optionCache:' + l.length)), l;
      },
      getItemCollection: function () {
        return null == i && (i = e.itemCollection(function (e) {
          console.log('----Lazy instantiation of itemCollection: ' + e.length);
        }, function (e) {
          console.log('Oops -failed to instantiate itemCollection: ' + e.length);
        })), i;
      },
      getItemDesign: function (e) {
        var t = {}, o = '';
        return t = this.getItemCollection(function () {
          console.log('Looking up item: ' + e), console.log('item.length: ' + t.length);
          for (var n = 0; t.length > n; n++)
            if (console.log('-Checking item: ' + t[n].itemId), t[n].itemId === e) {
              console.log('---Found item: ' + e + ' -> ' + t[n].design), o = angular.copy(t[n].design);
              break;
            }
        }, function (e) {
          console.log('Oops -failed to getItemColection: ' + e.length);
        }), o;
      }
    };
  }
]).filter('fabricLookup', [
  'e',
  function (e) {
    return function (t) {
      var o = e.getOptions(), n = '';
      console.log('Looking up fabric: ' + t), console.log('options.length: ' + o.length);
      for (var l = 0; o.length > l; l++)
        if (o[l].id === t) {
          console.log('**Found options: ' + t + ' -> ' + o[l].fabrics), n = angular.copy(o[l].fabrics);
          break;
        }
      return n;
    };
  }
]).filter('trimLookup', [
  'e',
  function (e) {
    return function (t) {
      var o = e.getOptions(), n = '';
      console.log('Looking up trim: ' + t), console.log('options.length: ' + o.length);
      for (var l = 0; o.length > l; l++)
        if (o[l].id === t) {
          console.log('***********Found trim: ' + t + ' -> ' + o[l].trims), n = angular.copy(o[l].trims);
          break;
        }
      return n;
    };
  }
]).filter('labelLookup', [
  'e',
  function (e) {
    return function (t) {
      var o = e.getLabels(), n = '';
      console.log('Looking up label: ' + t), console.log('label.length: ' + o.length);
      for (var l = 0; o.length > l; l++)
        o[l].id === t && (console.log('Found label: ' + t + ' -> ' + o[l].label), n = angular.copy(o[l].label));
      return n;
    };
  }
]);
var designBuildDirective = angular.module('panicApp.designBuildDirectives', []);
designBuildDirective.directive('drawDress', function () {
  return {
    scope: { dress: '=' },
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  };
}), designBuildDirective.directive('drawTrim', function () {
  return {
    scope: { dress: '=' },
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/trm-{{selection.type}}-{{selection.id}}-{{selection.trim}}.png" class="pic {{selection.type}}"/>'
  };
}), designBuildDirective.directive('drawExtras', function () {
  return {
    scope: { extras: '=' },
    template: '<img ng-repeat="selection in extras" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  };
}), designBuildDirective.directive('fabricSelector', function () {
  return {
    restrict: 'E',
    templateUrl: 'template/designBuild/fabric.html',
    scope: {
      fabricSet: '=',
      selectedOption: '=',
      isTrim: '='
    }
  };
}), designBuildDirective.directive('drawFabrics', function () {
  return {
    scope: {
      selection: '=',
      selectedOption: '='
    },
    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'fabric\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  };
}), designBuildDirective.directive('drawTrimFabrics', function () {
  return {
    scope: {
      selection: '=',
      selectedOption: '='
    },
    template: '<button ng-repeat="fabric in selection.fabrics" type="button" class="btn selector option fabric{{fabric.fabId}}" ng-model="selectedOption[\'trim\']" btn-radio="fabric.fabId" tooltip="{{fabric.fabName}}"onClick="_gaq.push([\'_trackEvent\', \'Design Build\', \'select fabric\', \'{{selectedOption.type}}-{{selectedOption.id}}\', \'{{fabric.fabId}}\' ]);"></button>'
  };
}), designBuildDirective.directive('drawAdmin', function () {
  return {
    scope: { dress: '=' },
    template: '<img ng-repeat="selection in dress" ng-src="images/parts/{{selection.type}}-{{selection.id}}-{{selection.fabric}}.png" class="pic {{selection.type}}"/>'
  };
});
var designBuildFilter = angular.module('panicApp.designBuildFilters', []);
designBuildFilter.filter('filterSets', function () {
  return function (e, t) {
    var o = [];
    for (var n in t)
      for (var l in e)
        if (t[n].setId == e[l].setId) {
          o.push(e[l]);
          break;
        }
    return o;
  };
}), angular.module('panicApp.Controllers', []).run([
  '$http',
  function () {
    console.log('run analytics'), _gaq.push([
      '_setAccount',
      'UA-38964974-1'
    ]), _gaq.push([
      '_setDomainName',
      'none'
    ]);
    var e = document.createElement('script');
    e.type = 'text/javascript', e.async = !0, e.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
  }
]);
var trackPageInGoogleAnalytics = function (e, t, o, n, l, i) {
    console.log('trackPageInGoogleAnalytics'), e.$on('$viewContentLoaded', track(t, o, n, l, i));
  }, track = function (e, t, o, n) {
    console.log('$location='), console.log(t);
    var n = convertPathToQueryString(t.path(), o);
    console.log('track: about to push: ' + n), e._gaq.push([
      '_trackPageview',
      n
    ]), console.log('track: pushed ');
  }, convertPathToQueryString = function (e, t, o, n) {
    console.log('convertPathToQueryString'), console.log('$routeParams='), console.log(t), console.log('locpath='), console.log(e), console.log('path='), console.log(o), console.log('search='), console.log(n);
    for (var l in t) {
      var i = '/' + t[l];
      console.log('queryParam=' + i), e = e.replace(i, ''), console.log('path ADDED=' + e);
    }
    console.log('path NOW=' + e);
    for (l in t)
      console.log('key=' + l);
    var r = getAsUriParameters(t);
    return console.log('querystring=' + r), '' === r ? o : o + '?' + r;
  }, getAsUriParameters = function (e) {
    var t = '';
    for (var o in e)
      t += encodeURIComponent(o) + '=' + encodeURIComponent(e[o]) + '&';
    return t.substring(0, t.length - 1);
  };
angular.module('panicApp.Controllers').controller('HomeCarouselCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function (e, t, o, n, l) {
    trackPageInGoogleAnalytics(t, o, n, l), e.myInterval = 5000, e.slides = [
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
]), angular.module('panicApp.Controllers').controller('StaticPageCtrl', [
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function (e, t, o, n) {
    trackPageInGoogleAnalytics(e, t, o, n);
  }
]), angular.module('panicApp.Controllers').controller('DressCollectionCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function (e, t, o, n, l, i) {
    trackPageInGoogleAnalytics(o, n, l, i), e.dresses = t.itemCollection();
  }
]), angular.module('panicApp.Controllers').controller('PurchaseCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function (e, t, o, n, l, i) {
    trackPageInGoogleAnalytics(o, n, l, i);
  }
]), angular.module('panicApp.Controllers').controller('SilhouetteCtrl', [
  '$scope',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  '$routeParams',
  function (e, t, o, n, l, i) {
    trackPageInGoogleAnalytics(o, n, l, i), e.silhouettes = t.designCatalogue();
  }
]), angular.module('panicApp.Controllers').controller('RangeDetailsCtrl', [
  '$scope',
  '$routeParams',
  'Range',
  '$rootScope',
  '$window',
  '$location',
  function (e, t, o, n, l, i) {
    n.$on('$viewContentLoaded', track(l, i, t)), e.ranges = o.query(), e.range = o.get({ rangeId: t.rangeId });
  }
]), angular.module('panicApp.Controllers').controller('NewDesignBuildCtrl', [
  '$scope',
  '$routeParams',
  'Range',
  'ReferenceDataCache',
  'DesignBuilder',
  '$rootScope',
  '$window',
  '$location',
  function (e, t, o, n, l, i, r, a) {
    trackPageInGoogleAnalytics(i, r, a, t);
    var c = '', s = 'dresses', g = t.rangeId, u = t.itemId, d = {}, p = {};
    e.isDebugCollapsed = !0, e.designId = g, e.categoryId = s;
    var m = function (e) {
      e.trim = '';
    };
    e.clearTrim = m, u && o.itemCollection(function (e) {
      console.log('Looking up item: ' + u), console.log('itemData.length: ' + e.length);
      for (var t = 0; e.length > t; t++)
        if (console.log('-Checking item: ' + e[t].itemId), e[t].itemId === u) {
          console.log('---Found item: ' + u + ' -> ' + e[t].design), c = angular.copy(e[t].design);
          break;
        }
    }, function (e) {
      console.log('Oops - failed to getItemColection: ' + e.length);
    }), e.ranges = o.designCatalogue(function () {
      console.log('=================='), loadDesign(e);
    }), e.range = l.get({ fileId: t.rangeId }, function (t) {
      u || (c = angular.copy(t.default)), p = angular.copy(t), e.master = c, e.cancel();
    }, function () {
      alert('ooops - loading range');
    }), e.cancel = function () {
      e.form = angular.copy(c);
    }, e.fabricSets = l.fabricSets(function (t) {
      d = angular.copy(t);
      for (var o in p.options)
        for (var n in p.options[o].fabricSets)
          for (var l in d)
            if (p.options[o].fabricSets[n].set == d[l].setId) {
              e.range.options[o].fabricSets[n] = d[l];
              break;
            }
    }, function () {
      alert('ooops - loading fabrics');
    }), e.save = function () {
      c = e.form, e.cancel();
    }, e.isCancelDisabled = function () {
      return angular.equals(c, e.form);
    };
  }
]);
var loadDesign = function (e) {
    var t = getCategoryById(e.ranges, e.categoryId), o = getDesignById(t.designs, e.designId);
    e.category = t, e.design = o;
  }, getCategoryById = function (e, t) {
    console.log('categories.length' + e.length);
    for (var o = [], n = 0; e.length > n; n++)
      console.log('categoryName' + e[n].catId), e[n].catId === t && (console.log('Found category: ' + t + ' -> ' + e[n].catId), o = angular.copy(e[n]));
    return console.log('Returning: ' + o), o;
  }, getDesignById = function (e, t) {
    console.log('designs.length: ' + e.length);
    for (var o = {}, n = 0; e.length > n; n++)
      console.log('id: ' + e[n].desId), e[n].desId === t && (console.log('Found category: ' + t + ' -> ' + e[n].desId), o = angular.copy(e[n]));
    return console.log('Returning: ' + o), o;
  }, SizingCtrl = function (e) {
    e.open = function () {
      e.shouldBeOpen = !0;
    }, e.close = function () {
      e.closeMsg = 'I was closed at: ' + new Date(), e.shouldBeOpen = !1;
    }, e.opts = {
      backdropFade: !0,
      dialogFade: !0
    };
  };