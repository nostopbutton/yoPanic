//
// test/midway/appSpec.js
//
// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-testacular.html#testing-modules
//
// Testing Goal:
// - To test to see that the module is there and it works.
// - To check to see if the dependencies are set for the module.
//
describe("Midway: Testing Modules", function() {
  describe("panicApp Module:", function() {

    var module;
    beforeEach(function() {
      module = angular.module("panicApp");
    });

    it("should be registered", function() {
      expect(module).not.to.equal(null);
    });

    describe("Dependencies:", function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      var numberOfModules = function(m) {
        return deps.length === m;
      };
      beforeEach(function() {
        deps = module.value('appName').requires;
      });

      //you can also test the module's dependencies
      it("should have 3 dependencies", function() {
        console.log("number of modules= "+ deps.length)
        expect(numberOfModules(3)).to.equal(true);
      });
      it("should have panicApp.Controllers as a dependency", function() {
        expect(hasModule('panicApp.Controllers')).to.equal(true);
      });
      it("should have ui.bootstrap as a dependency", function() {
        expect(hasModule('ui.bootstrap')).to.equal(true);
      });
      it("should have analytics as a dependency", function() {
        expect(hasModule('analytics')).to.equal(true);
      });



//      it("should have App.Controllers as a dependency", function() {
//        expect(hasModule('App.Controllers')).to.equal(true);
//      });
//
//      it("should have App.Directives as a dependency", function() {
//        expect(hasModule('App.Directives')).to.equal(true);
//      });
//
//      it("should have App.Filters as a dependency", function() {
//        expect(hasModule('App.Filters')).to.equal(true);
//      });
//
//      it("should have App.Routes as a dependency", function() {
//        expect(hasModule('App.Routes')).to.equal(true);
//      });
//
//      it("should have App.Services as a dependency", function() {
//        expect(hasModule('App.Services')).to.equal(true);
//      });
    });
  });
});
