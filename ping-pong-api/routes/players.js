const express = require('express');
const db = require('../database');

const router = express.Router();

// GET /api/players
router.get('/players', (req, res) => {
  console.log('Request processing...');
  const sql = `
SELECT  
  p.id,
  p.name,
  p.handedness,
  COALESCE(w.wins, 0) AS wins,
  COALESCE(l.losses, 0) AS losses,
  ROUND(CAST(COALESCE(w.wins, 0) AS FLOAT)/ (w.wins + l.losses), 3) AS winningPct,
  stats.gamesPlayed,
  stats.pointsPlayed,
  stats.pointsWon,
  stats.pointWinPct
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
  ON p.id = l.playerId
  JOIN (
    SELECT
      p.id,
      COUNT(DISTINCT g.id) AS gamesPlayed,
      COUNT(po.id) AS pointsPlayed,
      COUNT(
        CASE
          WHEN po.pointWinner = p.id THEN 1
          ELSE NULL
        END
      ) AS pointsWon,
      ROUND(CAST(COUNT(
        CASE
          WHEN po.pointWinner = p.id THEN 1
          ELSE NULL
        END
      ) AS FLOAT)/COUNT(po.id), 3) AS pointWinPct
    FROM players p 
    JOIN games g 
      ON p.id = g.playerOneId OR p.id = g.playerTwoId
    JOIN points po 
      ON g.id = po.gameId
    GROUP BY p.id
  ) stats 
  ON p.id = stats.id;
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
