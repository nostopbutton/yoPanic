//
// test/midway/routesSpec.js
//
// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-testacular.html#testing-routes
//
// Testing Goal:
// - To see that the correct controller handles the route.
//
describe("Midway: Testing Routes", function() {

  var test;  //, onChange;

  beforeEach(function(done) {
    ngMidwayTester.register('panicApp', function(instance) {
      test = instance;
      done();
    });
  });

//  it("should have x routes", function() {
//    console.log(test.routes);
//  });

//  it("should have a working home_path route", function() {
//    expect(ROUTER.routeDefined('home_path')).to.equal(true);
//    var url = ROUTER.routePath('home_path');
//    expect(url).to.equal('/');
//  });
//
//  it("should have a home_path route that should goto the StaticPageCtrl controller", function() {
//    var route = ROUTER.getRoute('home_path');
//    route.params.controller.should.equal('StaticPageCtrl');
//  });
//
//  it("should have a working video_path route", function() {
//    expect(ROUTER.routeDefined('video_path')).to.equal(true);
//    var url = ROUTER.routePath('video_path', { id : 10 });
//    expect(url).to.equal('/videos/10');
//  });
//
//  it("should have a videos_path route that should goto the VideoCtrl controller", function() {
//    var route = ROUTER.getRoute('video_path');
//    route.params.controller.should.equal('VideoCtrl');
//  });
//
//  it("should have a working watched_videos_path route", function() {
//    expect(ROUTER.routeDefined('watched_videos_path')).to.equal(true);
//    var url = ROUTER.routePath('watched_videos_path');
//    expect(url).to.equal('/watched-videos');
//  });
//
//  it("should have a videos_path route that should goto the WatchedVideosCtrl controller", function() {
//    var route = ROUTER.getRoute('watched_videos_path');
//    route.params.controller.should.equal('WatchedVideosCtrl');
//  });
//
//  it("should have a home_path route that should be the same as the videos_path route", function() {
//    expect(ROUTER.routeDefined('home_path')).to.equal(true);
//    var url1 = ROUTER.routePath('home_path');
//    var url2 = ROUTER.routePath('videos_path');
//    expect(url1).to.equal(url2);
//  });
//
//  it("should have a home_path route that should goto the VideosCtrl controller", function() {
//    var route = ROUTER.getRoute('home_path');
//    route.params.controller.should.equal('VideosCtrl');
//  });

});
