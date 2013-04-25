// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '../';

// list of files / patterns to load in the browser
files = [
//  JASMINE
//  , JASMINE_ADAPTER
//TODO - Change to MOCHA after angular upgrade on bower
  MOCHA
  , MOCHA_ADAPTER
  , './config/mocha.conf.js'

  //3rd Party Code
  , 'app/components/angular/angular.js'
  , 'app/components/angular-mocks/angular-mocks.js'
  , 'app/components/angular-bootstrap/ui-bootstrap-tpls.js'
//  './app/lib/app.router.js',

  //App-specific Code
  , 'app/scripts/**/*.js'
  , 'app/scripts/*.js'

  //Test-Specific Code
  , 'node_modules/chai/chai.js'
  , 'test/lib/chai-should.js'
  , 'test/lib/chai-expect.js'
  , 'vendor/ngMidwayTester/Source/ngMidwayTester.js'

  //Test-Specs
  , './test/midway/**/*.js'
];

// list of files to exclude
exclude = [];

// Root url for the karma proxy.
urlRoot = '/midway/';

port = 9202;
runnerPort = 9302;
captureTimeout = 5000;


shared = require(__dirname + "/testacular.shared.conf.js").shared
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
browsers  = shared.defaultBrowsers;
reporters = shared.defaultReporters;
proxies   = shared.defaultProxies;
