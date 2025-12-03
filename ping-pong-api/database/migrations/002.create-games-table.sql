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