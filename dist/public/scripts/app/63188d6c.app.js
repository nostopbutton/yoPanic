'use strict';

angular.module('panicApp',
    ['panicApp.Controllers'
      , 'panicApp.referenceDataServices'
      , 'panicApp.designBuildDirectives'
      , 'panicApp.designBuildFilters'
      , 'ui.bootstrap'
      , 'mgcrea.bootstrap.affix'
      , 'ui.scrollfix'
      , 'ngSocial'
      ])//, 'analytics', 'ui'
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider
//      .html5Mode(true)
        .hashPrefix('!');
    $routeProvider
      // Static Page routes
      .when('/', {
        templateUrl: 'views/home.html', controller: 'StaticPageCtrl'
//          templateUrl: 'views/silhouettes.html', controller: 'SilhouetteCtrl'
      })
//            .when('/how-to-help', {
//        templateUrl: 'views/howToHelp.html', controller: 'StaticPageCtrl'
//      })
//      .when('/fit', {
//        templateUrl: 'views/fit.html', controller: 'StaticPageCtrl'
//      })
//      .when('/fabrics', {
//        templateUrl: 'views/fabrics.html', controller: 'StaticPageCtrl'
//      })
//      .when('/party', {
//        templateUrl: 'views/party.html', controller: 'StaticPageCtrl'
//      })
//      .when('/contact', {
//        templateUrl: 'views/contact.html', controller: 'StaticPageCtrl'
//      })
//      .when('/about', {
//        templateUrl: 'views/about.html', controller: 'StaticPageCtrl'
//      })

//      Design Build routes
//      .when('/collection', {
//        templateUrl: 'views/dressCollection.html', controller: 'DressCollectionCtrl'
//      })
//      .when('/shop/:styleId/:itemId', {
//        templateUrl: 'views/shopItem.html', controller: 'ShopItemCtrl'
//      })
//
      .when('/design', {
        templateUrl: 'views/silhouettes.html', controller: 'SilhouetteCtrl'
      })
//      .when('/olddesign/:styleId', {
//        templateUrl: 'views/designBuildDirective.html', controller: 'DesignBuildCtrl'
//      })
//      .when('/olddesign/:styleId/:itemId', {
//        templateUrl: 'views/designBuildDirective.html', controller: 'DesignBuildCtrl'
//      })

      .when('/design/:styleId', {
        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
      })
//      .when('/review/:styleId', {
//        templateUrl: 'views/idggPlaceOrder.html', controller: 'NewDesignBuildCtrl'
//      })
      .when('/review/:styleId/:designCode', {
        templateUrl: 'views/idggPlaceOrder.html', controller: 'NewDesignBuildCtrl'
      })
//      .when('/design/:styleId/:designCode', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
//      })
//      .when('/design/:styleId/:itemId', {
//        templateUrl: 'views/newDesignBuild.html', controller: 'NewDesignBuildCtrl'
//      })

//      .when('/design/:styleId/dress/:designCode', {
//        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
//      })

//      .when('/designAdmin/:styleId', {
//        templateUrl: 'views/designBuildAdmin.html', controller: 'NewDesignBuildCtrl'
//      })

      // Purchase routes
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
