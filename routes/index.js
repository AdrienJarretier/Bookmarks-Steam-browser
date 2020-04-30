var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    globalTitle: 'Bookmarks - Steam browser',
    user: req.user
  });
});



router.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', {
    globalTitle: 'Bookmarks - Steam browser',
    user: req.user
  });
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;
