'use strict';

var express = require('express')
//    , connect  = require('connect') // node.js h5bp server-config
    , colors = require('colors')    // node.js h5bp server-config
//    path = require('path'),
//    fs = require('fs'),
//    mongoose = require('mongoose');
//    , h5bp = require('h5bp')
//    , gzippo = require('gzippo')
//    , cacheAge = 24 * 60 * 60 * 1000// node.js h5bp server-config
//    , envProd = process.env['PRODUCTION']
//    , prod = envProd != null ? envProd : false// node.js h5bp server-config
//    , root = prod ? 'path/to/prod/public': 'path/to/dev/public' // TODO - ???
//    , port = prod ? 80 : 8080;// node.js h5bp server-config
;
/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./config/config');

// Connect to database
//var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
//var modelsPath = path.join(__dirname, 'lib/models');
//fs.readdirSync(modelsPath).forEach(function (file) {
//    require(modelsPath + '/' + file);
//});

// Populate empty DB with sample data
//require('./lib/config/dummydata');

// Passport Configuration
//require('./lib/config/passport')();

var app = express();

// Express settings
require('./config/express')(app);

// Routing
require('./routes')(app);

// Start server
app.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;