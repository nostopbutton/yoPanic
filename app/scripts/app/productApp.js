'use strict';

angular.module('productApp',
    ['ngRoute'
        , 'panicApp.Controllers'
        , 'panicApp.referenceDataServices'
        , 'panicApp.designBuildDirectives'
        , 'panicApp.designBuildFilters'
        , 'ui.bootstrap'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
//     Shop The Collection routes
            .when('/collection', {
                templateUrl: '/views/ng-partials/dressCollection.html', controller: 'DressCollectionCtrl'
            })
            .when('/collection/:styleId/:itemId', {
                templateUrl: '/views/ng-partials/shopItem.html', controller: 'DesignBuildCtrl'
            })
            .when('/collection/:styleId/:itemId/:tab', {
                templateUrl: '/views/ng-partials/shopItemBuy.html', controller: 'DesignBuildCtrl'
            })
//      Design Builder routes
            .when('/design', {
                templateUrl: '/views/ng-partials/silhouettes.html', controller: 'SilhouetteCtrl'
            })

            .when('/design/:styleId', {
                templateUrl: '/views/ng-partials/designBuild.html', controller: 'DesignBuildCtrl'
            })
            .when('/design/:styleId/:itemId', {
                templateUrl: '/views/ng-partials/designBuild.html', controller: 'DesignBuildCtrl'
            })
            .when('/design/:styleId/:itemId/:tab', {
                templateUrl: '/views/ng-partials/designBuild.html', controller: 'DesignBuildCtrl'
            })

            // Static Page routes
//            .when('/', {
//                templateUrl: '/views/ng-partials/home.html', controller: 'StaticPageCtrl'
//            })
//      .when('/fabrics', {
//        templateUrl: '/views/ng-partials/fabrics.html', controller: 'StaticPageCtrl'
//      })
//      .when('/party', {
//        templateUrl: '/views/ng-partials/party.html', controller: 'StaticPageCtrl'
//      })
//      .when('/contact', {
//        templateUrl: 'views/contact.html', controller: 'StaticPageCtrl'
//      })
//      .when('/about', {
//        templateUrl: '/views/ng-partials/about.html', controller: 'StaticPageCtrl'
//      })
//    .when('/terms', {
//        templateUrl: '/views/ng-partials/terms.html', controller: 'StaticPageCtrl'
//    })
//    .when('/privacy', {
//        templateUrl: '/views/ng-partials/privacy.html', controller: 'StaticPageCtrl'
//    })

//            .when('/review/:styleId/dress/:designCode', {
//                templateUrl: '/views/ng-partials/idggPlaceOrder.html', controller: 'NewDesignBuildCtrl'
//            })
//            .when('/design/:styleId/dress/:designCode', {
////        templateUrl: 'views/idggDesignBuild.html', controller: 'NewDesignBuildCtrl'
//                templateUrl: '/views/ng-partials/designBuild.html', controller: 'NewDesignBuildCtrl'
//            })


      .when('/admin/:styleId', {
        templateUrl: 'views/ng-partials/dbAdmin.html', controller: 'DesignBuildCtrl'
      })
            // Admin Page routes
//      .when('/adminCollection', {
//        templateUrl: 'views/adminCollection.html', controller: 'CollectionCtrl'
//      })
//      .when('/adminCollection/:styleId', {
//        templateUrl: 'views/adminRangeDetails.html', controller: 'RangeDetailsCtrl'
//      })

            // Catch-all route
            .otherwise({
                redirectTo: '/collection'
            });
    });
