const db = require("../../database/database");
const { executeQueryAsync } = require("../../database/query-helpers");

async function deletePlayer (playerId, res) {
  console.log("Deleting player...");
  console.log("PlayerId:", playerId);

  const insertPlayerSql = `DELETE FROM main.players WHERE id = ${ playerId }`;

  await executeQueryAsync(insertPlayerSql);

  res.json({ message: 'Player deleted.'})
}

module.exports = deletePlayer;