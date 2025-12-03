const { executeQueryAsync } = require("../../../database/query-helpers");
const { readFile } = require("../../../database/read-file");

async function getPlayers (res) {
  console.log("Fetching players...");

  const sql = readFile('../routes/players/get-players/get-players.sql');
  const playerData = await executeQueryAsync(sql);
  res.json({ data: playerData });
}

module.exports = getPlayers;