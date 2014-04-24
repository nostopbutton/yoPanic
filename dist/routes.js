'use strict';

var index = require('./controllers/index.js');
//    api = require('./controllers/api')

var middleware = require('./middleware')
    , express        = require('express');

/**
 * Application routes
 */
module.exports = function(app) {

//    var router = express.Router();

    // Server API Routes
//    app.get('/api/awesomeThings', api.awesomeThings);
//
//    app.post('/api/users', users.create);
//    app.put('/api/users', users.changePassword);
//    app.get('/api/users/me', users.me);
//    app.get('/api/users/:id', users.show);
//
//    app.post('/api/session', session.login);
//    app.del('/api/session', session.logout);

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*').get( index.partials)
//    app.route('/').get( function(req, res) {
//        res.send('Hello World');
//        res.render('index');
//    });
    app.route('/').get(middleware.setUserCookie, index.index)
    app.route('/shop/').get(middleware.setUserCookie, index.shop)
    app.route('/how-it-works/').get(middleware.setUserCookie, index.howItWorks)
    app.route('/craftmanship/').get(middleware.setUserCookie, index.craftmanship)
    app.route('/party/').get(middleware.setUserCookie, index.party)
    app.route('/about/').get(middleware.setUserCookie, index.about)
//        router.get('/', middleware.setUserCookie, index.index);
//    router.get('/shop/', middleware.setUserCookie, index.shop);
//    router.get('/how-it-works/', middleware.setUserCookie, index.howItWorks);
//    router.get('/craftmanship/', middleware.setUserCookie, index.craftmanship);
//    router.get('/party/', middleware.setUserCookie, index.party);
//    router.get('/about/', middleware.setUserCookie, index.about);
    // Always keep this route last // node.js h5bp server-config
//    router.get('*', index.index, function(req, res, next) {
//
//        var url = req.url
//            , ua = req.headers['user-agent'];
//
//        // Block access to hidden files and directories that begin with a period
//        if (url.match(/(^|\/)\./)) { // node.js h5bp server-config
//            res.end("Not allowed");
//        }
//
//        // Better website experience for IE users - Force the latest IE version, in cases when it may fall back to IE7 mode
//        if(ua && ua.indexOf('MSIE') && /htm?l/.test(ua)) {  // node.js h5bp server-config
//            res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
//        }
//
//        // CORS - Use ChromeFrame if it's installed, for a better experience with IE folks Control cross domain using CORS http://enable-cors.org
//        res.setHeader('Access-Control-Allow-Origin', '*');
//        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
//        next();
//    });
};


/* This file maps your route matches to functions defined in controller classes
 */
//app = module.parent.exports.app;

/* Put routes here */

// main site routes
//app.get('/', siteController.index);
//app.get('/shop', siteController.detail);

// admin routes
//app.get('/admin', adminController.admin);

//app.get('/:partial', routes.partial);
//app.get('/:partial/:id', routes.id);

// JSON API
//app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);
// Always keep this route last // node.js h5bp server-config
//app.get('*', siteController.index, function(req, res, next) {
//
//    var url = req.url
//        , ua = req.headers['user-agent'];
//
//    // Block access to hidden files and directories that begin with a period
//    if (url.match(/(^|\/)\./)) { // node.js h5bp server-config
//        res.end("Not allowed");
//    }
//
//    // Better website experience for IE users - Force the latest IE version, in cases when it may fall back to IE7 mode
//    if(ua && ua.indexOf('MSIE') && /htm?l/.test(ua)) {  // node.js h5bp server-config
//        res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
//    }
//
//    // CORS - Use ChromeFrame if it's installed, for a better experience with IE folks Control cross domain using CORS http://enable-cors.org
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
//    next();
//});