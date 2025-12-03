const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "ping-pong.db"; // Name of your SQLite database file

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if it doesn't exist
        // db.run(`CREATE TABLE IF NOT EXISTS users (
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     name TEXT,
        //     email TEXT UNIQUE,
        //     password TEXT
        // )`,
        // (err) => {
        //     if (err) {
        //         // Table already created or other error
        //         console.error(err.message);
        //     } else {
        //         // Table created, optionally insert some default data
        //         // const insert = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
        //         // db.run(insert, ["admin", "admin@example.com", "hashed_password"]);
        //     }
        // });
    }
});

module.exports = db;