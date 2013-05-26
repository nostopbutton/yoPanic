'use strict';

var designBuild = angular.module('panicApp.designBuildFilters', []);

designBuild.filter('filterSets', function () {

  return function(sets, filter) {

    var filteredResult = [];

    for (var filterFabric in filter)
        for(var fabricSet in sets) {
          if(filter[filterFabric].setId == sets[fabricSet].setId){
            filteredResult.push(sets[fabricSet]);
            break;
          }
        }

    return filteredResult;

  };
});