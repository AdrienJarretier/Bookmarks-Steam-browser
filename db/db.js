"use strict";

const dbUtils = require('./dbUtils.js');

let executeStatement = dbUtils.executeStatement;

exports.insertUserIfNotExists = function (user) {

    let userExists = dbUtils.executeStatement(
        'SELECT EXISTS(SELECT 1 FROM users WHERE id = ?) as userExists;',
        [user.id],
        'get').userExists

    if (!userExists) {

        return executeStatement('INSERT INTO users(id) VALUES(?) ; ',
            [user.id],
            'run');

    }
    else {

        return {changes:0};
    }

}

exports.insertBookmark = function (user, bookmark) {

    return executeStatement('INSERT INTO bookmarks(user_id, name, uri) VALUES(?, ?, ?) ; ',
        [user.id, bookmark.name, bookmark.uri],
        'run');

}

exports.getBookmarks = function (user) {

    return executeStatement(`
    SELECT *
    FROM bookmarks
    WHERE user_id = ? ; `,
        [user.id],
        'all');

}
