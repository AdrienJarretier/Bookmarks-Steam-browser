'use strict';

var express = require('express')
  , router = express.Router()
  , passport = require('passport');

const db = require('../db/db.js');

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {

    console.log(req.headers.cookie);
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail 
  function (req, res, next) {

    console.log(req.headers.cookie);

    req.url = req.originalUrl;
    next();
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {

    db.insertUserIfNotExists(req.user);

    console.log('user id          : ' + req.user.id);
    console.log('game played name : ' + req.user._json.gameextrainfo);
    console.log('game played id   : ' + req.user._json.gameid);

    res.redirect('/');
  });

module.exports = router;