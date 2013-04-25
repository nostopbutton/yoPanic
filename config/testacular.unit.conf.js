basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  './config/mocha.conf.js',

  //3rd Party Code
  './app/components/jquery/jquery.min.js',
  './app/components/angular/angular.min.js',
  './app/components/angular-bootstrap/ui-bootstrap-tpls.js',
//  './app/lib/app.router.js',

  //App-specific Code
  './app/scripts/controllers/*.js',
  './app/scripts/directives/*.js',
  './app/scripts/filters/*.js',
  './app/scripts/services/*.js',
  './app/scripts/config/*.js',
  './app/scripts/app.js',

  //Test-Specific Code
  './node_modules/chai/chai.js',
  './test/lib/chai-should.js',
  './test/lib/chai-expect.js',
  './test/lib/angular/angular-mocks.js',

  //Test-Specs
  './test/unit/**/*.js'
];

port = 9201;
runnerPort = 9301;
captureTimeout = 5000;

shared = require(__dirname + "testacular.shared.conf.js").shared
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
browsers  = shared.defaultBrowsers;
reporters = shared.defaultReporters;
proxies   = shared.defaultProxies;