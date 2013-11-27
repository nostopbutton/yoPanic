'use strict';

var designBuildFilter = angular.module('panicApp.designBuildFilters', []);

designBuildFilter.filter('filterSets', function () {

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

designBuildFilter.filter('rollover', function () {
  return function(img) {
    return img.replace(/_bk$/, "");
  };
});

designBuildFilter.filter('designString', function () {
  return function(design) {
    var returnString = JSON.stringify(design);
//    alert("Here");
//    for (var element in design){
//      returnString += element.type + element.id + "\n";
//    }
    console.log("Returning---: "+returnString);
    return returnString;
  };
});