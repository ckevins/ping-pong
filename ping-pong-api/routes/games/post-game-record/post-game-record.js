const db = require("../../../database/database");
const { executeQueryAsync } = require("../../../database/query-helpers");
const { readFile } = require("../../../database/read-file");

async function postGameRecord (req, res) {
  console.log("Saving game record...");

  const insertGameSql = readFile('../routes/games/post-game-record/insert-game.sql');
  
  const insertGameParameters = [
    req.body.playerOne.id,
    req.body.playerTwo.id,
    req.body.winner,
    req.body.loser,
    req.body.finalWinningScore,
    req.body.finalLosingScore,
  ];

  await executeQueryAsync(insertGameSql, insertGameParameters);
  const gameId = (await executeQueryAsync('SELECT last_insert_rowid() AS gameId;'))[0].gameId

  const allPointsParameters = req.body.points.map((point) => {
    return [
      gameId,
      point.pointNumber,
      point.servingPlayer,
      point.pointWinner,
      point.playerOneScore,
      point.playerTwoScore
    ]
  });

  const insertPointSql = readFile('../routes/games/post-game-record/insert-point.sql');

  db.serialize(() => {
    allPointsParameters.forEach((pointParameters) => {
      executeQueryAsync(insertPointSql, pointParameters);
    });
  });

  res.json({ data: { gameId }});
}

module.exports = postGameRecord;