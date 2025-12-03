const { executeQueryAsync } = require("../../../database/query-helpers");

async function deletePlayer (playerId, res) {
  console.log("Deleting player:", playerId);

  const deletePlayerSql = `DELETE FROM main.players WHERE id = ${ playerId }`;

  await executeQueryAsync(deletePlayerSql);

  res.json({ message: 'Player deleted.'})
}

module.exports = deletePlayer;