const db = require("../../database/database");
const { executeQueryAsync } = require("../../database/query-helpers");

async function createPlayer (req, res) {
  console.log("Creating player...");
  console.log("Player:", req.body);

  const player = {
    name: req.body.name,
    handedness: req.body.handedness,
    isTestUser: req.body.isTestUser ? 1 : 0
  };

  const insertPlayerSql = `
    INSERT INTO main.players ("name", "handedness", "isTestUser")
    VALUES ("${player.name}", "${player.handedness}", ${player.isTestUser});
  `;

  await executeQueryAsync(insertPlayerSql);

  res.json({
    message: 'Player created successfully',
    data: player
  })
}

module.exports = createPlayer;