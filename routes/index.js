'use strict';

var express = require('express');
var router = express.Router();

const common = require('../common.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    globalTitle: 'Bookmarks - Steam browser',
    user: req.user
  });
});



router.get('/account', common.ensureAuthenticated, function (req, res) {
  res.render('account', {
    globalTitle: 'Bookmarks - Steam browser',
    user: req.user
  });
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
