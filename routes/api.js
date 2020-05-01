
// ------------------------------------------------------ REQUIRE

var express = require('express');
var router = express.Router();

// parse application/json

const common = require('../common.js');

const db = require('../db/db.js');



// ------------------------------------------------------ CONFIG

const apiDesc = common.serverConfig.api;

function makeSubroutes(routeDesc, completePath) {

    completePath = completePath || '';

    for (let [subPath, subRouteDesc] of Object.entries(routeDesc)) {

        let path = completePath + subPath;

        if (subRouteDesc.methods) {
            for (let [method, methodDesc] of Object.entries(subRouteDesc.methods)) {

                console.log(method + '\t: ' + path + ' :\t' + methodDesc);

            }
        }

        if (subRouteDesc.routes) {
            makeSubroutes(subRouteDesc.routes, path);
        }

    }
}

makeSubroutes(apiDesc);


router.get('/', common.ensureAuthenticated, function (req, res, next) {

    console.log('get bookmarks');

    let bookmarks = db.getBookmarks(req.user);
    res.json(bookmarks);
});

router.post('/', common.ensureAuthenticated, function (req, res, next) {

    console.log('post bookmark');

    let infos = db.insertBookmark(req.user, req.body);

    res.json(db.getBookmark(infos.lastInsertRowid));
});

router.put('/:id', function (req, res, next) {

    res.json('["not implemented yet"]');
});

router.delete('/:id', function (req, res, next) {

    res.json('["not implemented yet"]');
});

module.exports = router