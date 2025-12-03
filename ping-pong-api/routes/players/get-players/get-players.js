const { readQueryFile, executeQueryAsync } = require("../../../database/query-helpers");

async function getPlayers (res) {
  const sql = readQueryFile('../routes/players/get-players/get-players.sql');
  console.log("Fetching players...");
  const playerData = await executeQueryAsync(sql);
  res.json({ data: playerData });
}

module.exports = getPlayers;