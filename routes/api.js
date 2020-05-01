
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



router.post('/', function (req, res, next) {

    console.log('post bookmark')

    console.log(req.user);
    console.log(req.body.bookmark);

    res.json(db.insertBookmark(req.user, req.body.bookmark));
});

router.put('/', function (req, res, next) {

    res.json('["not implemented yet"]');
});

router.delete('/', function (req, res, next) {

    res.json('["not implemented yet"]');
});

module.exports = router