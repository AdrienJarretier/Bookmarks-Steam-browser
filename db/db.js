"use strict";

const dbUtils = require('./dbUtils.js');

let executeStatement = dbUtils.executeStatement;

exports.insertUser = function (user) {

    return executeStatement('INSERT INTO users(id) VALUES(?) ; ',
        [user.id],
        'run');

}

exports.insertBookmark = function (user, bookmark) {

    return executeStatement('INSERT INTO bookmarks(user_id, name, uri) VALUES(?, ?, ?) ; ',
        [user.id, bookmark.name, bookmark.uri],
        'run');

}

exports.getBookmarks = function (user) {

    return executeStatement('SELECT * FROM bookmarks WHERE user_id = ? ; ',
        [user.id],
        'all');

}
