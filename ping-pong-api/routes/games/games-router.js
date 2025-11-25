const express = require("express");
const router = express.Router();

const postGameRecord = require("./post-game-record.js");
const getGameRecord = require("./get-game-record.js");

router.post("/games", async (req, res) => {
  await postGameRecord(req, res);
});

router.get("/games/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  await getGameRecord(gameId, res);
});

module.exports = router;
