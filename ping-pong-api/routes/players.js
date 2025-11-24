const express = require('express');
const db = require('../database');

const router = express.Router();

// GET /api/players
router.get('/players', (req, res) => {
  console.log('Request processing...');
  const sql = `
        WITH playerGames AS (SELECT  p.id,
            p.name,
            p.handedness,
            g.winnerId,
            g.loserId
        FROM Players p
        LEFT JOIN Games g
            ON 
                p.id = g.playerOneId
                OR 
                p.id = g.playerTwoId
        ) SELECT
            id,
            name,
            handedness,
            COUNT(winnerId = id) AS wins,
            COUNT(loserId = id) AS losses
        FROM playerGames
        GROUP BY 
            id,
            name,
            handedness
    `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

module.exports = router;
