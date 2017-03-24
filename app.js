var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('basic-auth');

var index = require('./routes/index');
var users = require('./routes/users');
var sectors = require('./routes/sectors');
var tasks = require('./routes/tasks');

var app = express();

var loginName = process.env.LOGIN;
var loginPass = process.env.PASS;

var env = process.env.NODE_ENV;

if (env === 'development') {

  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/local');

} else {
  // Authenticator
  app.use(function(req, res, next) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== loginName || credentials.pass !== loginPass) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="example"');
      res.end('Access denied');
    } else {
      next();
    }

  });

  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/local', { config: { autoIndex: false } });

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/sectors', sectors);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
