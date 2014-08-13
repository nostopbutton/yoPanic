'use strict';

angular.module('panicApp',
    ['ngRoute'
        , 'panicApp.Controllers'
        , 'panicApp.referenceDataServices'
        , 'panicApp.designBuildDirectives'
        , 'panicApp.designBuildFilters'
        , 'ui.bootstrap'
        , 'socialLinks'
    ])//, 'analytics', 'ui'
    .config(function ($routeProvider, $locationProvider) {

//        $provide.decorator('$sniffer', function($delegate) {
//            $delegate.history = false;
//            return $delegate;
//        });

        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');

        $routeProvider
//     Shop The Collection routes
            .when('/collection', {
                templateUrl: '/views/ng-partials/dressCollection.html', controller: 'DressCollectionCtrl'
            })
            .when('/collection/:collection', {
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

//      Mobile Design Builder routes
            .when('/mobile/:styleId', {
                templateUrl: '/views/ng-partials/mobDesignBuild.html', controller: 'DesignBuildCtrl'
            })
            .when('/mobile/:styleId/:itemId', {
                templateUrl: '/views/ng-partials/mobDesignBuild.html', controller: 'DesignBuildCtrl'
            })
            .when('/mobile/:styleId/:itemId/:tab', {
                templateUrl: '/views/ng-partials/mobDesignBuild.html', controller: 'DesignBuildCtrl'
            })

            .when('/shop/:url1', {
                redirectTo: function ($routeParams, $path, $search) {
                    console.log($routeParams);console.log($path);console.log($search);
                    return "/" + $routeParams.url1;
                }
            })
            .when('/shop/:url1/:url2', {
                redirectTo: function ($routeParams, $path, $search) {
                    console.log($routeParams);console.log($path);console.log($search);
                    return "/" + $routeParams.url1 + "/" + $routeParams.url2;
                }
            })
            .when('/shop/:url1/:url2/:url3', {
                redirectTo: function ($routeParams, $path, $search) {
                    console.log($routeParams);console.log($path);console.log($search);
                    return "/" + $routeParams.url1 + "/" + $routeParams.url2 + "/" + $routeParams.url3;
                }
            })
            .when('/shop/:url1/:url2/:url3/:url4', {
                redirectTo: function ($routeParams, $path, $search) {
                    console.log($routeParams);console.log($path);console.log($search);
                    return "/" + $routeParams.url1 + "/" + $routeParams.url2 + "/" + $routeParams.url3
                        + "/" + $routeParams.url4;
                }
            })
//            .when('/:url.html', {
//                redirectTo: $window.location.href($routeParams.url+'.html')
//            })



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
                redirectTo: function ($routeParams, $path, $search) {
                    console.log($routeParams);console.log($path);console.log($search);
                    return 'collection';
                }
//                redirectTo: 'collection'
            });
    });
