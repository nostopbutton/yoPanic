'use strict';

angular.module('panicApp',
    ['ngRoute'
      , 'panicApp.Controllers'
      , 'panicApp.referenceDataServices'
      , 'panicApp.designBuildDirectives'
      , 'panicApp.designBuildFilters'
      , 'ui.bootstrap'
//      , 'mgcrea.bootstrap.affix'
//      , 'ui.scrollfix'
      , 'ngSocial'
      ])//, 'analytics', 'ui'
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider
//      .html5Mode(true)
        .hashPrefix('!');
    $routeProvider
      // Static Page routes
      .when('/', {
        templateUrl: '/views/ng-partials/home.html', controller: 'StaticPageCtrl'
//          templateUrl: 'views/silhouettes.html', controller: 'SilhouetteCtrl'
      })
//            .when('/how-to-help', {
//        templateUrl: 'views/howToHelp.html', controller: 'StaticPageCtrl'
//      })
//      .when('/fit', {
//        templateUrl: 'views/fit.html', controller: 'StaticPageCtrl'
//      })
      .when('/fabrics', {
        templateUrl: '/views/ng-partials/fabrics.html', controller: 'StaticPageCtrl'
      })
      .when('/party', {
        templateUrl: '/views/ng-partials/party.html', controller: 'StaticPageCtrl'
      })
//      .when('/contact', {
//        templateUrl: 'views/contact.html', controller: 'StaticPageCtrl'
//      })
      .when('/about', {
        templateUrl: '/views/ng-partials/about.html', controller: 'StaticPageCtrl'
      })
    .when('/terms', {
        templateUrl: '/views/ng-partials/terms.html', controller: 'StaticPageCtrl'
    })
    .when('/privacy', {
        templateUrl: '/views/ng-partials/privacy.html', controller: 'StaticPageCtrl'
    })
//      Design Build routes
      .when('/collection', {
        templateUrl: '/views/ng-partials/dressCollection.html', controller: 'DressCollectionCtrl'
      })
      .when('/shop/:styleId/:itemId', {
        templateUrl: '/views/ng-partials/shopItem.html', controller: 'ShopItemCtrl'
      })

      .when('/design', {
        templateUrl: '/views/ng-partials/silhouettes.html', controller: 'SilhouetteCtrl'
      })
//      .when('/olddesign/:styleId', {
//        templateUrl: 'views/designBuildDirective.html', controller: 'DesignBuildCtrl'
//      })
//      .when('/olddesign/:styleId/:itemId', {
//        templateUrl: 'views/designBuildDirective.html', controller: 'DesignBuildCtrl'
//      })

      .when('/design/:styleId', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
            templateUrl: '/views/ng-partials/designBuild.html', controller: 'NewDesignBuildCtrl'
      })
      .when('/design/:styleId/:itemId', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
        templateUrl: '/views/ng-partials/designBuild.html', controller: 'NewDesignBuildCtrl'
      })
      .when('/review/:styleId/dress/:designCode', {
        templateUrl: '/views/ng-partials/idggPlaceOrder.html', controller: 'NewDesignBuildCtrl'
      })
      .when('/design/:styleId/dress/:designCode', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
            templateUrl: '/views/ng-partials/designBuild.html', controller: 'NewDesignBuildCtrl'
      })

//        .when('/checkout', {
//            templateUrl: 'views/checkout.html', controller: 'StaticPageCtrl'
//        })
//        .when('/cart', {
//            templateUrl: 'views/cart.html', controller: 'StaticPageCtrl'
//        })
//      .when('/design/:styleId/:itemId', {
//        templateUrl: 'views/newDesignBuild.html', controller: 'NewDesignBuildCtrl'
//      })

//      .when('/design/:styleId/dress/:designCode', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
//      })

//      .when('/designAdmin/:styleId', {
//        templateUrl: 'views/designBuildAdmin.html', controller: 'NewDesignBuildCtrl'
//      })

//      Purchase routes
//      .when('/purchase', {
//        templateUrl: 'views/sizing.html', controller: 'StaticPageCtrl'
//      })

      // Admin Page routes
//      .when('/adminCollection', {
//        templateUrl: 'views/adminCollection.html', controller: 'CollectionCtrl'
//      })
//      .when('/adminCollection/:styleId', {
//        templateUrl: 'views/adminRangeDetails.html', controller: 'RangeDetailsCtrl'
//      })

    // Catch-all route
      .otherwise({
        redirectTo: '/'
      });
  });
