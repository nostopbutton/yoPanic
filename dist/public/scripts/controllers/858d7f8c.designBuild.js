'use strict';

//angular.module('panicApp.Controllers', ['ngSocial'])
angular.module('panicApp.Controllers')//, ['ngSocial'])
  .controller('NewDesignBuildCtrl', ['$scope', '$routeParams', 'Range', 'ReferenceDataCache', 'DesignBuilder',
    '$rootScope', '$window', '$location',
    function ($scope, $routeParams, Range, ReferenceDataCache, DesignBuilder,
              $rootScope, $window, $location) {

      trackPageInGoogleAnalytics($rootScope, $window, $location, $routeParams);
      var master="",
        categoryId = "dresses",//$routeParams.categoryId;
        styleId = $routeParams.styleId,
        itemId = $routeParams.itemId,
        designCode = $routeParams.designCode,
        allFabricSets = {},
        range = {};

      $scope.current_title = 'Test';
      $scope.current_description = 'Test description';
      $scope.headline = "test";

      // Put Style data into page scope
      ReferenceDataCache.getStyleById($routeParams.styleId, $scope);
      ReferenceDataCache.getItemById($routeParams.itemId, $scope);

      $scope.isDebugCollapsed = true;
      $scope.styleId = styleId;
      $scope.categoryId = categoryId;

      if(designCode) {
      $scope.designCode = designCode;
      $scope.deparam = $.deparam(designCode)
}
//    $scope.location =  $location.protocol()+"://" +
//    $location.host()+ ":" +
//      $location.port()+ "/#!/" +
//        $location.path() +"?"+
//        $location.search(string,"DES");


      var clearTrim = function(partType) {
        partType.trim = "";
      }
      $scope.clearTrim = clearTrim;

//      var clearFabric = function(partType) {
//        console.log("partType");
//        console.log(partType);
//
//        partType.trim = "";
//      }
//      $scope.clearFabric = clearFabric;

      $scope.dressPartCode = function(selection) {
        console.log ("SELCTION:" + selection);
        return selection.type + "-"
          + selection.id + selection.length+ "-"
          + selection.fabric
      }


      if(itemId) {
        Range.itemCollection(function(itemData){
            console.log("Looking up item: "+itemId);
//            console.log("itemData.length: "+itemData.length);

            for (var i=0; i<itemData.length; i++){
//              console.log("-Checking item: "+itemData[i].itemId);

              if (itemData[i].itemId === itemId) {
//                console.log("---Found item: "+itemId + " -> "+itemData[i].design);
                master = angular.copy(itemData[i].design);
                break;
              }
            }
          },
          function(data) {
            console.log("Oops - failed to getItemColection: " + data.length)
          })
      }


//      $scope.isActive = function(cat) {
//        return cat.category.categoryName.designs.id === styleId;
//      };

      $scope.ranges = Range.styleCatalogue(
        function (data) {   //success

//          category  = getCategoryById(data, categoryId);
////          console.log('category.designs: '+category.designs);
//          design  = getDesignById(category.designs, styleId);
//          console.log('design.desName: '+design.desName);
//          $scope.category = category;
//          $scope.design = design;
          console.log("==================");
          loadStyle($scope);//, data, categoryId, styleId);

        }
      );
//      $scope.category = ReferenceDataCache.getCategory(categoryId);
//      $scope.design = ReferenceDataCache.getDesign(styleId);

      $scope.range = DesignBuilder.get({fileId: $routeParams.styleId},
        function (data) {   //success
          if(!itemId) {
            master = angular.copy(data.default);
          }
          range = angular.copy(data);
          $scope.master = master;     // so it can be viewed in debug screen
          $scope.params = $.param(master);
          $scope.cancel();            // set form to master
        },
        function (data) {             //failure
          alert("ooops - loading range");
        });

      $scope.cancel = function() {
        $scope.form = angular.copy(master);
      };


      $scope.fabricSets = DesignBuilder.fabricSets(
        function(data) {   // success
          allFabricSets = angular.copy(data);

          for (var option in range.options){
            for(var set in range.options[option].fabricSets){
              for(var fabricSet in allFabricSets) {
                if(range.options[option].fabricSets[set].set == allFabricSets[fabricSet].setId){
                  $scope.range.options[option].fabricSets[set] = allFabricSets[fabricSet];
                  break;
                }
              }
            }
          }

        }, function (data) {             //failure
          alert("ooops - loading fabrics");
        });
//      );

      $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
      };

      $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
      };

//      $scope.loadStyle = loadStyle;//, styleId);

//    $scope.isSaveDisabled = function() {
//        return $scope.form.$invalid || angular.equals(master, $scope.form);
//    };

//    $scope.cancel();

//      $scope.setType = function(attr, type) {
//        attr
//      }

    }])

var loadStyle = function($scope){//, catalogue, catId, desId) {
  var category  = getCategoryById($scope.ranges, $scope.categoryId),
    style  = getStyleById(category.styles, $scope.styleId);

  $scope.category = category;
  $scope.style = style;
}

var getCategoryById = function(categories, id) {
//  console.log("categories.length:"+categories.length);

  var category = [];
  for (var i=0; i<categories.length; i++){
//    console.log("categoryName:"+categories[i].catId);
    if (categories[i].catId === id) {
//      console.log("Found category: "+id + " -> "+categories[i].catId);
      category = angular.copy(categories[i]);
      break;
    }
  }
  console.log("Returning: "+category);

  return category;
}

var getStyleById = function(styles, id) {
//  console.log("styles.length: "+styles.length);

  var style = {};
  for (var i=0; i<styles.length; i++){
//    console.log("id: "+styles[i].styleId);
    if (styles[i].styleId === id) {
//      console.log("Found style: "+id + " -> "+styles[i].styleId);
      style = angular.copy(styles[i]);
      break;
    }
  }
  console.log("Returning: "+style);

  return style;
}

var decodeDesign = function(code){
//  skt-002-04-120-slv-008-00-089-nek-015-03-089-trm-nek-015-03-000-blt-003-00-087-ext-002-00-000-ext-003-00-000

//  var skt = code.substr(0,14)
//  var slv = code.substr(15,14)
//  var nek = code.substr(30,14)
//  var trm = code.substr(45,18)
//  var blt = code.substr(64,14)
//  var pep = code.substr(79,14)
//  var ros = code.substr(94,14)
//
//  console.log(skt);
//  console.log(slv);
//  console.log(nek);
//  console.log(trm);
//  console.log(blt);
//  console.log(pep);
//  console.log(ros);


  $.deparam(code)

  // skt - 14
  // - 1
  // slv - 14
  // - 1
  // nek - 14
  // - 1
  // trm - 18
  // - 1
  // blt - 14
  // - 1
  // ext pep - 14
  // - 1
  // ext rose - 14


}
