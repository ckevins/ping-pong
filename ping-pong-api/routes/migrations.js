const express = require('express');
const db = require('../database');

const router = express.Router();

router.post('/run-migrations', (req, res) => {
  console.log('Running migration queries...');
  const queries = [
    `
      CREATE TABLE "games" (
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
    CREATE TABLE "players" (
    "id"	INTEGER NOT NULL UNIQUE,
    "name"	TEXT,
    "handedness"	TEXT,
    "isTestUser" INTEGER NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
    );
    `,
    `
    CREATE TABLE "points" (
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
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Barry Bluejeans', 'left', 1);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Shlabethany', 'right', 1);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Jimothy', 'right', 1);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Rob Handsome', 'right', 1);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Tommy Pickles', 'right', 1);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Cody', 'L', 0);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Tanner', 'L', 0);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Meg', 'R', 0);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Minnie', 'L/R', 0);`,
    `INSERT INTO "main"."players" ("name", "handedness", "isTestUser") VALUES ('Cello', 'L/R', 0);`
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
    res.json({ message: 'Migrations completed successfully.' });
  });
});

module.exports = router;
