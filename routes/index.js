'use strict';

var express = require('express');
var router = express.Router();

const common = require('../common.js');

const globalTitle = 'Bookmarks - Steam browser';

const PAGES = {
  'Bookmarks': {
    route: '/'
  },
  'Spreadsheets': {
    route: '/spreadsheets'
  },
}

/* GET home page. */
router.get(PAGES['Bookmarks'].route, function (req, res, next) {

  res.render('index', {
    globalTitle: globalTitle,
    user: req.user,
    pages:PAGES,
    page: 'Bookmarks'
  });
});

/* GET home page. */
router.get(PAGES['Spreadsheets'].route, function (req, res, next) {

  res.render('spreadsheets', {
    globalTitle: globalTitle,
    user: req.user,
    pages:PAGES,
    page: 'Spreadsheets'
  });
});



// router.get('/account', common.ensureAuthenticated, function (req, res) {
//   res.render('account', {
//     globalTitle: 'Bookmarks - Steam browser',
//     user: req.user
//   });
// });


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
