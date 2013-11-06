'use strict';

var metaDataService = angular.module('panicApp.metaDataService');

metaDataService.factory('MetaData', function($location){
  return {
    og_image: "http://img.aurza.com/skt-001-02-013-slv-009-00-013-nek-001-00-003-blt-002-00-000-ext-002-00-000-ext-003-00-000.png",
    og_title: "Sheath Dress",
    og_url: $location.absUrl(),
    og_site_name: "AURZA",
    og_type: "dress"
  }
})