const express = require("express");
const router = express.Router();

const postGameRecord = require("./post-game-record/post-game-record.js");
const getGameRecord = require("./get-game-record/get-game-record.js");
const getGameList = require("./get-game-list/get-game-list.js");

router.post("/games", async (req, res) => {
  await postGameRecord(req, res);
});

router.get("/games", async (_, res) => {
  await getGameList(res);
})

router.get("/games/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  await getGameRecord(gameId, res);
});

module.exports = router;
