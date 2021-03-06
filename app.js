/**
 * Module dependencies.
 */

var express = require('express'),
  conf = require('./conf.js'),
  userRoutes = require('./routes/users.js'),
  http = require('http'),
  path = require('path');

var app = express();

app.configure(function() {
  app.set('port', conf.listenPort);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/signup', userRoutes.showsignup);
app.post('/register', userRoutes.register);

app.get('/login', userRoutes.showlogin);
app.post('/authenticate', userRoutes.authenticate);

app.post('/starttimer', userRoutes.starttimer);


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});