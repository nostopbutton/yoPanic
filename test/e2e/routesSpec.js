//
// test/e2e/routesSpec.js
//
// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-testacular.html#testing-routes
//
// Testing Goal:
// - To check to see that route works, doesn't work or redirects.
// - To see that the correct controller handles the route.
//
describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
    console.log("navigate");
  });

  describe("Static Pages", function() {
    it('should automatically redirect to / when location hash/fragment is empty', function() {
      expect(browser().location().path()).toBe("/");
      expect(element('#ng-view').html()).toContain('homePageView');
    });

    it('should jump to the / when / is accessed', function() {
      browser().navigateTo('#/');
      expect(browser().location().path()).toBe("/");
      expect(element('#ng-view').html()).toContain('homePageView');
    });

    it('should have a working /fabrics route', function() {
      browser().navigateTo('#/fabrics');
      expect(browser().location().path()).toBe("/fabrics");
      expect(element('#ng-view').html()).toContain('fabricsView');
    });

    it('should have a working /party route', function() {
      browser().navigateTo('#/party');
      expect(browser().location().path()).toBe("/party");
      expect(element('#ng-view').html()).toContain('partyView');
    });

    it('should have a working /contact route', function() {
      browser().navigateTo('#/contact');
      expect(browser().location().path()).toBe("/contact");
      expect(element('#ng-view').html()).toContain('contactView');
    });

    it('should have a working /about route', function() {
      browser().navigateTo('#/about');
      expect(browser().location().path()).toBe("/about");
      expect(element('#ng-view').html()).toContain('aboutView');
    });

    it('should jump to the / when unknown route is entered', function() {
      browser().navigateTo('#/gibberish');
      expect(browser().location().path()).toBe("/");
      expect(element('#ng-view').html()).toContain('homePageView');
    });
  });

  describe("Collection Pages", function() {
    it('should have a working /collection route', function() {
      browser().navigateTo('#/collection');
      expect(browser().location().path()).toBe("/collection");
      expect(element('#ng-view').html()).toContain('collectionView');
    });
  });

  describe("Design Pages", function() {
    it('should have a working /design route', function() {
      browser().navigateTo('#/design');
      expect(browser().location().path()).toBe("/design");
      expect(element('#ng-view').html()).toContain('silhouettesView');
    });

    it('should have a working /design/ID route', function() {
      browser().navigateTo('#/design/coco');
      expect(browser().location().path()).toBe("/design/coco");
      expect(element('#ng-view').html()).toContain('designBuildView');
    });
  });

  describe("Admin Pages", function() {
    it('should have a working /adminCollection route', function() {
      browser().navigateTo('#/adminCollection');
      expect(browser().location().path()).toBe("/adminCollection");
      expect(element('#ng-view').html()).toContain('adminCollectionView');
    });

    it('should have a working /adminCollection/ID route', function() {
      browser().navigateTo('#/adminCollection/coco');
      expect(browser().location().path()).toBe("/adminCollection/coco");
      expect(element('#ng-view').html()).toContain('adminRangeView');
    });
  });

});
