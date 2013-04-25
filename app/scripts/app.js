'use strict';

angular.module('panicApp',
    ['panicApp.Controllers'
      , 'panicApp.referenceDataServices'
      , 'panicApp.designBuildDirectives'
      , 'ui.bootstrap'
      , 'analytics'])  //'ui'
  .config(function ($routeProvider) {
    $routeProvider
      // Static Page routes
      .when('/', {
        templateUrl: 'views/home.html', controller: 'StaticPageCtrl'
      })
      .when('/fabrics', {
        templateUrl: 'views/fabrics.html', controller: 'StaticPageCtrl'
      })
      .when('/party', {
        templateUrl: 'views/party.html', controller: 'StaticPageCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html', controller: 'StaticPageCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html', controller: 'StaticPageCtrl'
      })

      // Design Build routes
      .when('/collection', {
        templateUrl: 'views/dressCollection.html', controller: 'DressCollectionCtrl'
      })
      .when('/design', {
        templateUrl: 'views/silhouettes.html', controller: 'SilhouetteCtrl'
      })
      .when('/design/:rangeId', {
        templateUrl: 'views/designBuild.html', controller: 'DesignBuildCtrl'
      })
      .when('/design/:rangeId/:itemId', {
        templateUrl: 'views/designBuild.html', controller: 'DesignBuildCtrl'
      })

      // Admin Page routes
      .when('/adminCollection', {
        templateUrl: 'views/adminCollection.html', controller: 'CollectionCtrl'
      })
      .when('/adminCollection/:rangeId', {
        templateUrl: 'views/adminRangeDetails.html', controller: 'RangeDetailsCtrl'
      })

    // Catch-all route
      .otherwise({
        redirectTo: '/'
      });
  });
