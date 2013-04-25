'use strict';

angular.module('panicApp.Controllers', [])
  .run(['$http', function($http) {

    console.log("run analytics");
    _gaq.push(['_setAccount', 'UA-38964974-1']);
    _gaq.push(['_setDomainName', 'none']);
    //	_gaq.push(['_trackPageview']);

    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  }])

var trackPageInGoogleAnalytics = function($rootScope, $window, $location, $routeParams){
  // Fire Google Analytics on Angular page load
//  $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams));
}

var track = function($window, $location, $routeParams) {
  var path = convertPathToQueryString($location.path(), $routeParams)
  console.log("track: about to push: " + path);
  $window._gaq.push(['_trackPageview', path]);
};

var convertPathToQueryString = function(path, $routeParams) {
  for (var key in $routeParams) {
    var queryParam = '/' + $routeParams[key];
    path = path.replace(queryParam, '');
  }

  var querystring = decodeURIComponent($.param($routeParams));

  if (querystring === '') return path;

  return path + "?" + querystring;
};