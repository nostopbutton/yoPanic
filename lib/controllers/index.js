'use strict';

var path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function(err, html) {
        if(err) {
            res.send(404);
        } else {
            res.send(html);
        }
    });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
    res.render('index');
};

exports.shop = function(req, res) {
    res.render('shop');
};

exports.howItWorks = function(req, res) {
    res.render('how-it-works');
};

exports.craftmanship = function(req, res) {
    res.render('craftmanship');
};

exports.party = function(req, res) {
    res.render('party');
};

exports.about = function(req, res) {
    res.render('about');
};
