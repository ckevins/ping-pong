const { readQueryFile, executeQueryAsync } = require("../../../database/query-helpers");

async function getPlayers (res) {
  console.log("Fetching test players...");

  const sql = readQueryFile('../routes/players/get-players/get-test-players.sql');
  const playerData = await executeQueryAsync(sql);
  res.json({ data: playerData });
}

module.exports = getPlayers;