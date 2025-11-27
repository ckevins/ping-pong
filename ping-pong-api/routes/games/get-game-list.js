const db = require("../../database");
const { executeQueryAsync } = require("../../query-helpers");

async function getGamesList (req, res) {
  console.log("Fetching game records..");

  const getGameDataSql = `
    SELECT
      g.id AS gameId,
      w.name AS winner,
      l.name AS loser,
      g.finalWinningScore,
      g.finalLosingScore,
      firstServe.name AS firstServe
    FROM games g
    JOIN players w
      ON g.winnerId = w.id
    JOIN players l 
      ON g.loserId = l.id 
    JOIN players firstServe
      ON g.playerOneId = firstServe.id
  `;

  const gameData = await executeQueryAsync(getGameDataSql);

  res.json({ data: { gameData } });
}

module.exports = getGamesList;