"use strict";

const common = require("../common.js");

const config = common.serverConfig;

const Database = require('better-sqlite3');

const db = new Database(config.db.database, { verbose: console.log });



db.exec(`CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT PRIMARY KEY
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "games" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "bookmarks" (
        "id" INTEGER PRIMARY KEY,
        "user_id" TEXT NOT NULL,
        "name" TEXT,
        "uri" TEXT NOT NULL CHECK (uri <> ''),
        FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT unique_bookmark UNIQUE(user_id,uri)
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "games_bookmarks" (
        "bookmark_id" INTEGER NOT NULL,
        "game_id" TEXT NOT NULL,
        FOREIGN KEY(bookmark_id) REFERENCES bookmarks(id),
        FOREIGN KEY(game_id) REFERENCES games(id)
        );`);



db.close();

console.log('db closed');
console.log('db ' + config.db.database + ' created');
