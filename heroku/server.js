
/**
 * Module dependencies.
 */

var express = require('express')
  , connect  = require('connect') // node.js h5bp server-config
  , colors = require('colors')    // node.js h5bp server-config
  , routes = require('./routes')
//    , api = require('./routes/api')
  , h5bp = require('h5bp')
  , gzippo = require('gzippo')
  , cacheAge = 24 * 60 * 60 * 1000// node.js h5bp server-config
  , envProd = process.env['PRODUCTION']
  , prod = envProd != null ? envProd : false// node.js h5bp server-config
//    , root = prod ? 'path/to/prod/public': 'path/to/dev/public' // TODO - ???
  , port = prod ? 80 : 8080;// node.js h5bp server-config


var app = module.exports = express();


// Configuration
app.configure(function(){

  // app.use(h5bp.server());

  // Register ejs as .html. If we did
  // not call this, we would need to
  // name our views foo.ejs instead
  // of foo.html. The __express method
  // is simply a function that engines
  // use to hook into the Express view
  // system by default, so if we want
  // to change "foo.ejs" to "foo.html"
  // we simply pass _any_ function, in this
  // case `ejs.__express`.
  app.engine('.html', require('ejs').__express);

  app.set('views', __dirname + '/public');
  // app.set('view engine', 'jade');

  // Without this you would need to
  // supply the extension to res.render()
  // ex: res.render('users.html').
  app.set('view engine', 'html');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(connect.logger('dev'));

  // Replace the default express static provider with gzippo's (see: http://tomg.co/gzippo)
  // app.use(express.static(__dirname + '/public'));
  app.use(gzippo.staticGzip(__dirname + '/public'));//, { maxAge: cacheAge});

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
//========
// Routes
//========
app.get('/', routes.index);
//app.get('/:partial', routes.partial);
//app.get('/:partial/:id', routes.id);

// JSON API
//app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);
// Always keep this route last // node.js h5bp server-config
app.get('*', routes.index, function(req, res, next) {

  var url = req.url
    , ua = req.headers['user-agent'];

  // Block access to hidden files and directories that begin with a period
  if (url.match(/(^|\/)\./)) { // node.js h5bp server-config
    res.end("Not allowed");
  }

  // Better website experience for IE users - Force the latest IE version, in cases when it may fall back to IE7 mode
  if(ua && ua.indexOf('MSIE') && /htm?l/.test(ua)) {  // node.js h5bp server-config
    res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
  }

  // CORS - Use ChromeFrame if it's installed, for a better experience with IE folks Control cross domain using CORS http://enable-cors.org
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Start server
app.listen(process.env.PORT || 3000, function(){
//    connect.logger(''
//        + '\\n  ' + ':date'.bold.underline + '\\n\\n' + '  IP: '.cyan.bold
//        + ' ' + ':remote-addr'.white + '\\n' + '  Method: '.red.bold
//        + ':method'.white + '\\n' + '  URL: '.blue.bold + ':url'.white
//        + '\\n' + '  Status: '.yellow.bold + ':status'.white + '\\n'
//        + '  User Agent: '.magenta.bold + ':user-agent'.white)
//        , connect.router(routes)
//        , connect["static"](root, { maxAge: cacheAge })
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

////=====================
//// Routes
//// TODO - should we move this to a separate server routes file?
////=====================
//exports.index = function(req, res){
//  res.render('index');
//};
//
//exports.partials = function (req, res) {
//  var name = req.params.name;
//  res.render('views/' + name);
//};