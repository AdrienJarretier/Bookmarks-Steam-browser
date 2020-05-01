"use strict";

const fs = require('fs');
const local_config_loader = require('env-config-prompt');

const serverConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const local_config = local_config_loader(false, 'localConfig.json', 'localConfig_template.json', 'server config');
Object.assign(serverConfig, local_config);

// console.log(JSON.stringify(serverConfig, null, 4));
// console.log()


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

exports.ensureAuthenticated = ensureAuthenticated;

exports.serverConfig = serverConfig;
