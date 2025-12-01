const express = require('express');
const router = express.Router();

const getPlayers = require('./get-players.js');
const getTestPlayers = require('./get-test-players.js');
const createPlayer = require('./create-player.js');
const deletePlayer = require('./delete-player.js');

router.route('/players')
  .get(async (req, res) => {
    await getPlayers(req, res);
  })
  .post(async (req, res) => {
    await createPlayer(req, res);
  });

router.delete('/players/:playerId', async (req, res) => {
  const playerId = req.params.playerId
  await deletePlayer(playerId, res);
});

router.get('/test-players', async (req, res) => {
  await getTestPlayers(req, res);
});


module.exports = router;
