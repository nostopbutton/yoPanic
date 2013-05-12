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
  console.log("trackPageInGoogleAnalytics");
  $rootScope.$on('$viewContentLoaded', track($window, $location, $routeParams));
}

var track = function($window, $location, $routeParams) {
  var path = convertPathToQueryString($location.path(), $routeParams)
  console.log("track: about to push: " + path);
  $window._gaq.push(['_trackPageview', path]);
  console.log("track: pushed ");
};

var convertPathToQueryString = function(path, $routeParams) {
  console.log("convertPathToQueryString");
  console.log("path="+path);
  for (var key in $routeParams) {
    var queryParam = '/' + $routeParams[key];
    console.log("queryParam="+queryParam);
    path = path.replace(queryParam, '');
    console.log("path ADDED="+path);
  }

  console.log("path NOW="+path);

  for (key in $routeParams)
  {
    console.log("key="+key);
  }
  var querystring = decodeURIComponent($.param($routeParams));

  console.log("querystring="+querystring);

  if (querystring === '') return path;

  return path + "?" + querystring;

};
