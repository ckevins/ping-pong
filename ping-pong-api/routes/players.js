const express = require('express');
const db = require('../database');

const router = express.Router();

// GET /api/players
router.get('/players', (req, res) => {
  console.log('Request processing...');
  const sql = `
    SELECT  p.id,
            p.name,
            p.handedness,
			COALESCE(w.wins, 0) AS wins,
			COALESCE(l.losses, 0) AS losses
        FROM Players p
        LEFT JOIN (
			SELECT
				winnerId AS playerId,
				COUNT(*) AS wins
			FROM Games 
			GROUP BY
				winnerId
		) w
			ON p.id = w.playerId
		LEFT JOIN (
			SELECT
				loserId AS playerId,
				COUNT(*) AS losses
			FROM Games 
			GROUP BY 
				loserId
		) l 
			ON p.id = l.playerId;
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
