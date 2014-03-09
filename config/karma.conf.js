// Karma configuration
// Generated on Fri Mar 07 2014 23:43:50 GMT+0800 (HKT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //3rd Party Code
        , 'app/components/jquery/dist/jquery.js'
        , 'app/components/underscore/underscore.js'
        , 'app/components/angular/angular.js'
        , 'app/components/angular-resource/angular-resource.js'
        , 'app/components/angular-mocks/angular-mocks.js'
//        , 'app/components/angular-bootstrap/ui-bootstrap-tpls.js'
//
        //App-specific Code
        , 'app/scripts/*.js'
        , 'app/scripts/**/*.js'
//
//        //Test-Specific Code
//        , 'app/components/jasmine-jquery/lib/jasmine-jquery.js'

        //Test-Specs
//        , 'test/mock/**/*.js'
        , 'test/unit/**/*.js'

        // fixtures
        , {pattern: 'app/referenceData/**/*.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
