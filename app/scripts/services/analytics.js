

'use strict';
var _gaq = _gaq || [];

angular.module('analytics',[])
    .run(['$http', function($http) {
        console.log("analytics.js: $http - setting UA-42859790-4")
        console.log("run analytics");

//        _gaq.push(['_setAccount', 'UA-42859790-4']);  // PRODUCTION - AURZA.COM
        _gaq.push(['_setAccount', 'UA-42859790-4']);
        _gaq.push(['_setDomainName', 'none']);
        //	_gaq.push(['_trackPageview']);

        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }])
    .service('analytics', function($rootScope, $window, $location, $routeParams) {
        console.log("analytics.js: trackPageInGoogleAnalytics - setting $viewContentLoaded")
        $rootScope.$on('$viewContentLoaded', track);
        console.log("analytics.js: analytics service");

        var track = function() {
            console.log("analytics.js: in track");
            var path = convertPathToQueryString($location.path(), $routeParams)
            $window._gaq.push(['_trackPageview', path]);
        };

        var convertPathToQueryString = function(path, $routeParams) {
            console.log("Controllers.js:: convertPathToQueryString");
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
