'use strict';

var express           = require('express')
    , path            = require('path')
    , bodyParser      = require('body-parser')
    , cookieParser    = require('cookie-parser')
    , errorHandler    = require('errorhandler')
    , morgan          = require('morgan')
    , methodOverride  = require('method-override')
    , favicon  = require('static-favicon')
    , cons            = require('consolidate')
    , colors = require('colors')    // node.js h5bp server-config
    , gzippo = require('gzippo')
    , cacheAge = 24 * 60 * 60 * 1000// node.js h5bp server-config
    , config          = require('./config')
//    passport = require('passport'),
//    mongoStore = require('connect-mongo')(express)
     ;

var env = process.env.NODE_ENV || 'development';

/**
 * Express configuration
 */
module.exports = function(app) {
// https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
//    app.configure('development', function(){
    if ('development' == env) {
        app.use(require('connect-livereload')());

        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

//        alert("config.root : "+ config.root);
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.use("/", express.static(path.join(config.root, '.tmp/html/')));
//        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
        app.use(errorHandler());
//        app.set('views', config.root + '/app/views');
        app.set('views', config.root + '/dist/public/');
    }
    else if ('test' == env) {
        app.use(favicon(path.join(config.root, '/dist/public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, '/dist/public'))); // set the static files location /public/img will be /img for users
        app.use(errorHandler());
        app.set('views', config.root + '/dist/public/views');
    }
    else if ('production' == env) {
//    app.configure('production', function(){
//        app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(favicon(path.join(config.root, '/dist/public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, '/dist/public'))); // set the static files location /public/img will be /img for users
        app.use(errorHandler());
        app.set('views', config.root + '/dist/public/views');
    };

//    app.configure(function(){
//        app.engine('html', cons.ejs.renderFile);
//        app.engine('html', require('ejs').renderFile);
        // Register ejs as .html.
        // If we did not call this, we would need to name our views foo.ejs instead of foo.html.
        // The __express method is simply a function that engines use to hook into the Express view system by default,
        // so if we want to change "foo.ejs" to "foo.html" we simply pass _any_ function, in this case `ejs.__express`.
        app.engine('.html', require('ejs').__express);
//        app.set('views', __dirname + '/public');

        // Without this you would need to supply the extension to res.render()
        // ex: res.render('users.html').
        app.set('view engine', 'html');
        app.use(morgan('dev')); // log every request to the console
        app.use(cookieParser());
        app.use(bodyParser());
        app.use(methodOverride());


        // Replace the default express static provider with gzippo's (see: http://tomg.co/gzippo)
        // app.use(express.static(__dirname + '/public'));
        app.use(gzippo.staticGzip(__dirname + '/public'));//, { maxAge: cacheAge});
        app.use(gzippo.staticGzip(path.join(config.root, 'public')));//, { maxAge: cacheAge});

        // Persist sessions with mongoStore
//        app.use(express.session({
//            secret: 'angular-fullstack secret',
//            store: new mongoStore({
//                url: config.mongo.uri,
//                collection: 'sessions'
//            })
//        }));

        //use passport session
//        app.use(passport.initialize());
//        app.use(passport.session());

        // Router needs to be last
//    https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
//        app.use(app.router);
//    };
};