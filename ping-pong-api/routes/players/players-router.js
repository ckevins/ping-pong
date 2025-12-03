const express = require('express');
const router = express.Router();

const getPlayers = require('./get-players/get-players.js');
const getTestPlayers = require('./get-players/get-test-players.js');
const createPlayer = require('./create-player/create-player.js');
const deletePlayer = require('./delete-player/delete-player.js');

router.route('/players')
  .get(async (_, res) => {
    await getPlayers(res);
  })
  .post(async (req, res) => {
    await createPlayer(req, res);
  });

router.delete('/players/:playerId', async (req, res) => {
  const playerId = req.params.playerId
  await deletePlayer(playerId, res);
});

router.get('/test-players', async (_, res) => {
  await getTestPlayers(res);
});


module.exports = router;
