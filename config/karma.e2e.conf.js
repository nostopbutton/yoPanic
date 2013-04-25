basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  './test/e2e/**/*.js'
];

//I Think this is the root url for the karma proxy.
urlRoot = '/e2e/';

port = 9203;
runnerPort = 9303;
captureTimeout = 5000;

shared = require(__dirname + "/testacular.shared.conf.js").shared
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
//browsers  = shared.defaultBrowsers;
// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Safari'];
reporters = shared.defaultReporters;

proxies = {
  '/': 'http://localhost:8100/'
};

loglevel = LOG_DEBUG;