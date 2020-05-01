'use strict';

var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var session = require('express-session');
var SteamStrategy = require('passport-steam');


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var authRoutes = require('./routes/auth');

const common = require("./common.js");

const db = require('./db/db.js');



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, {

    id: user.id,
    displayName: user.displayName,
    photo: user.photos[2].value,
    gamePlayed: {
      id: user._json.gameid,
      extrainfo: user._json.gameextrainfo
    }

  });
});

passport.deserializeUser(function (user, done) {

  // console.log(' -------- user -------- ');
  // console.log(user);
  // console.log(' -------- /// user -------- ');

  done(null, user);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3000/auth/steam/return',
  realm: 'http://localhost:3000/',
  apiKey: common.serverConfig.steamApiKey
},
  function (identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(Object.keys(common.serverConfig.api)[0], apiRouter);

// See views/auth.js for authentication routes
app.use('/auth', authRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
