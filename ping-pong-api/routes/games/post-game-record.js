const db = require("../../database");
const { executeQueryAsync } = require("../../query-helpers");

async function postGameRecord (req, res) {
  console.log("Saving game record...");

  const gameData = {
    playerOneId: req.body.playerOne.id,
    playerTwoId: req.body.playerTwo.id,
    winnerId: req.body.winner,
    loserId: req.body.loser,
    finalWinningScore: req.body.finalWinningScore,
    finalLosingScore: req.body.finalLosingScore,
  };

  console.log("Game Data:", gameData);

  const insertGameSql =
    `
    INSERT INTO games 
      (
        "playerOneId", 
        "playerTwoId",
        "winnerId",
        "loserId",
        "finalWinningScore",
        "finalLosingScore",
        "date"
      ) 
    VALUES 
      (
        ${gameData.playerOneId}, 
        ${gameData.playerTwoId}, 
        ${gameData.winnerId}, 
        ${gameData.loserId}, 
        ${gameData.finalWinningScore}, 
        ${gameData.finalLosingScore},
        datetime('now') || 'Z'
      );
    `;

  await executeQueryAsync(insertGameSql);
  const gameId = (await executeQueryAsync('SELECT last_insert_rowid() AS gameId;'))[0].gameId

  const pointData = req.body.points.map((point) => {
    return {
      ...point,
      gameId,
    };
  });

  
  console.log("Point Data:", pointData);
  const insertPointSql = pointData.map(point => {
    return `
    INSERT INTO points 
      (
        "gameId", 
        "pointNumber",
        "servingPlayer",
        "pointWinner",
        "playerOneScore",
        "playerTwoScore"
      ) 
    VALUES 
      (
        ${point.gameId}, 
        ${point.pointNumber}, 
        ${point.servingPlayer}, 
        ${point.pointWinner},
        ${point.playerOneScore}, 
        ${point.playerTwoScore}
      );
    `;
  })

  db.serialize(() => {
    insertPointSql.forEach((query) => {
      executeQueryAsync(query);
    });
  });

  res.json({ data: { gameId }});
}

module.exports = postGameRecord;