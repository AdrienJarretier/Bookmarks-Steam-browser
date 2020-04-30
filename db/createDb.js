"use strict";

const common = require("../common.js");

const config = common.serverConfig;

const Database = require('better-sqlite3');

const db = new Database(config.db.database, { verbose: console.log });



db.exec(`CREATE TABLE IF NOT EXISTS "users" (
        "id" INTEGER PRIMARY KEY
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "games" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "bookmarks" (
        "id" INTEGER PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "name" VARCHAR(255),
        "uri" TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
        );`);

db.exec(`CREATE TABLE IF NOT EXISTS "games_bookmarks" (
        "bookmark_id" INTEGER NOT NULL,
        "game_id" INTEGER NOT NULL,
        FOREIGN KEY(bookmark_id) REFERENCES bookmarks(id),
        FOREIGN KEY(game_id) REFERENCES games(id)
        );`);



db.close();

console.log('db closed');
console.log('db ' + config.db.database + ' created');
