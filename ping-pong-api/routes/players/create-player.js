const db = require("../../database");
const { executeQueryAsync } = require("../../query-helpers");

async function createPlayer (req, res) {
  console.log("Creating player...");
  console.log("Player:", req.body);

  const player = {
    name: req.body.name,
    handedness: req.body.handedness,
  };

  const insertPlayerSql = `
    INSERT INTO main.players ("name", "handedness", "isTestUser")
    VALUES ("${player.name}", "${player.handedness}", 0);
  `;

  await executeQueryAsync(insertPlayerSql);

  res.json({
    message: 'Player created successfully',
    data: player
  })
}

module.exports = createPlayer;