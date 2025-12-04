const { executeQueryAsync } = require("../../../database/query-helpers");
const { readFile } = require("../../../database/read-file");

async function getGameRecord (gameId, res) {
  console.log("Fetching game record " + gameId + '...');

  const gameDataSql = readFile('../routes/games/get-game-record/get-game-data.sql');
  const playerDataSql = readFile('../routes/games/get-game-record/get-player-data.sql');
  const pointDataSql = readFile('../routes/games/get-game-record/get-point-data.sql');

  const gameData = (await executeQueryAsync(gameDataSql, [gameId, gameId]))[0]; // look to rewrite this query to revent the double use of gameId
  const playerData = await executeQueryAsync(playerDataSql, gameId);
  const pointData = await executeQueryAsync(pointDataSql, gameId);

  res.json({ data: 
    {
      gameData,
      playerData,
      pointData
    } 
  });
}

module.exports = getGameRecord;