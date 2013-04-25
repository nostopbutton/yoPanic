// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '../';

// list of files / patterns to load in the browser
files = [
  JASMINE
  , JASMINE_ADAPTER
// TODO - Change to MOCHA after angular upgrade on bower
//  MOCHA,
//  MOCHA_ADAPTER,
//  './config/mocha.conf.js',

  //3rd Party Code
  , 'app/components/jquery/jquery.js'
  , 'app/components/angular/angular.js'
  , 'app/components/angular-mocks/angular-mocks.js'
  , 'app/components/angular-bootstrap/ui-bootstrap-tpls.js'

  //App-specific Code
  , 'app/scripts/*.js'
  , 'app/scripts/**/*.js'

  //Test-Specific Code
  , 'node_modules/chai/chai.js'
  , 'test/lib/chai-should.js'
  , 'test/lib/chai-expect.js'
//  './vendor/ngMidwayTester/Source/ngMidwayTester.js'

  //Test-Specs
  , 'test/mock/**/*.js'
  , 'test/spec/**/*.js'
];

// list of files to exclude
exclude = [];

// Root url for the karma proxy.
urlRoot = '/unit/';

port = 9201;
runnerPort = 9301;
captureTimeout = 5000;

singleRun = false
autoWatch = true
colors    = true
growl     = true

reporters = ['progress'];
browsers = ['Chrome'];
proxies = {
  '/': 'http://localhost:8000/'
};

//shared = require(__dirname + "/testacular.shared.conf.js").shared
//shared = require("/Users/Pete/dev/WebstormProjects/yoPanic/config/testacular.shared.conf.js").shared
//growl     = shared.colors;
//colors    = shared.colors;
//singleRun = shared.singleRun;
//autoWatch = shared.autoWatch;
//browsers  = shared.defaultBrowsers;
//reporters = shared.defaultReporters;
//proxies   = shared.defaultProxies;
