const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "ping-pong.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        const queries = [
            `
            CREATE TABLE IF NOT EXISTS "games" (
            "id"	INTEGER NOT NULL UNIQUE,
            "playerOneId"	INTEGER NOT NULL,
            "playerTwoId"	INTEGER NOT NULL,
            "winnerId"	INTEGER NOT NULL,
            "loserId"	INTEGER NOT NULL,
            "finalWinningScore"	INTEGER NOT NULL,
            "finalLosingScore"	INTEGER NOT NULL,
            "date"	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT),
            FOREIGN KEY("loserId") REFERENCES "players"("id"),
            FOREIGN KEY("playerOneId") REFERENCES "players"("id"),
            FOREIGN KEY("playerTwoId") REFERENCES "players"("id"),
            FOREIGN KEY("winnerId") REFERENCES "players"("id")
            );
            `,
            `
            CREATE TABLE IF NOT EXISTS "players" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT,
            "handedness"	TEXT,
            "isTestUser" INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
            );
            `,
            `
            CREATE TABLE IF NOT EXISTS "points" (
            "id"	INTEGER NOT NULL UNIQUE,
            "gameId"	INTEGER NOT NULL,
            "pointNumber"	INTEGER NOT NULL,
            "servingPlayer"	INTEGER NOT NULL,
            "pointWinner"	INTEGER NOT NULL,
            "playerOneScore"	INTEGER NOT NULL,
            "playerTwoScore"	INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT),
            FOREIGN KEY("gameId") REFERENCES "games"("id")
            );
            `,
        ];

        db.serialize(() => {
            queries.forEach((query) => {
                db.all(query, (err, rows) => {
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