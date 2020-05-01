"use strict";

const db = require('./db.js');

console.log('-------------------- TEST --------------------');

console.log(db.getBookmarks({ id:76561198017624394 }));

// db.insertUnit('Litre');
// db.insertUnit('Kg');
// db.insertProduct('lait', 1, 1, 12);

console.log('------------------ FIN TEST ------------------');