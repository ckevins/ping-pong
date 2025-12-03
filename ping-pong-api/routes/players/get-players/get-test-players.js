const { executeQueryAsync } = require("../../../database/query-helpers");
const { readFile } = require("../../../database/read-file");

async function getPlayers (res) {
  console.log("Fetching test players...");

  const sql = readFile('../routes/players/get-players/get-test-players.sql');
  const playerData = await executeQueryAsync(sql);
  res.json({ data: playerData });
}

module.exports = getPlayers;