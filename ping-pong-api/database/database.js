const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "ping-pong.db";
const { readFile } = require('./read-file');

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        const createPlayersTableSql = readFile('./migrations/001.create-players-table.sql');
        const createGamesTableSql = readFile('./migrations/002.create-games-table.sql');
        const createPointsTableSql = readFile('./migrations/003.create-points-table.sql');
        
        const queries = [
            createPlayersTableSql,
            createGamesTableSql,
            createPointsTableSql,
        ];

        db.serialize(() => {
            queries.forEach((query) => {
                db.all(query, (err) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                });
            });
            console.log('Migrations completed successfully.');
        });
    }
});

module.exports = db;