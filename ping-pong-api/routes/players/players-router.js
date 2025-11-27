const express = require('express');
const router = express.Router();

const getPlayers = require('./get-players.js');
const getTestPlayers = require('./get-test-players.js');

router.get('/players', async (req, res) => {
  await getPlayers(req, res);
});

router.get('/test-players', async (req, res) => {
  await getTestPlayers(req, res);
});

module.exports = router;
