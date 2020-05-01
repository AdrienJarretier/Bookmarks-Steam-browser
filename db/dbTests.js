"use strict";

const db = require('./db.js');
const dbUtils = require('./dbUtils.js');

let user = { id: '10' };
let bookmark = {
    name: 'test',
    uri: 'http://test'
};

console.log('-------------------- TEST --------------------');

console.log(db.insertUserIfNotExists(user));

// console.log(db.getBookmarks({ id:'7' }));

// console.log(db.insertBookmark(user,bookmark));

// let userExists = dbUtils.executeStatement(
//     'SELECT EXISTS(SELECT 1 FROM users WHERE id = ?) as userExists;',
//     [user.id],
//     'get').userExists

//     console.log(userExists);
// console.log(

//     userExists ? 'y' : 'n'
    
// );


console.log('------------------ FIN TEST ------------------');