const db = require("../../database/database");
const { executeQueryAsync } = require("../../database/query-helpers");

async function getPlayers (req, res) {
  console.log("Fetching players...");
  const sql = `
SELECT  
  p.id,
  p.name,
  p.handedness,
  COALESCE(w.wins, 0) AS wins,
  COALESCE(l.losses, 0) AS losses,
  ROUND(CAST(COALESCE(w.wins, 0) AS FLOAT)/ (COALESCE(w.wins, 0) + COALESCE(l.losses, 0)), 3) AS winningPct,
  stats.gamesPlayed,
  stats.pointsPlayed,
  stats.pointsWon,
  stats.pointWinPct,
  stats.serves,
  stats.servesWon,
  stats.serveWinPct
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
  LEFT JOIN (
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
      ) AS FLOAT)/COUNT(po.id), 3) AS pointWinPct,
      COUNT(
        CASE
          WHEN po.servingPlayer = p.id THEN 1
          ELSE NULL
        END
      ) AS serves,
      COUNT(
        CASE
          WHEN po.servingPlayer = p.id AND po.pointWinner = p.id THEN 1
          ELSE NULL
        END
      ) AS servesWon,
      ROUND(CAST(COUNT(
        CASE
          WHEN po.servingPlayer = p.id AND po.pointWinner = p.id THEN 1
          ELSE NULL
        END
      ) AS FLOAT)/COUNT(
        CASE
          WHEN po.servingPlayer = p.id THEN 1
          ELSE NULL
        END
      ), 3) AS serveWinPct
    FROM players p 
    JOIN games g 
      ON p.id = g.playerOneId OR p.id = g.playerTwoId
    JOIN points po 
      ON g.id = po.gameId
    GROUP BY p.id
  ) stats 
  ON p.id = stats.id
WHERE isTestUser = 1;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
}

module.exports = getPlayers;