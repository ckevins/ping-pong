SELECT
  pl.name AS name,
  COUNT(*) AS numberOfServes,
  COUNT(CASE
    WHEN pointWinner = servingPlayer THEN 1
    ELSE NULL
  END) AS numberOfServesWon,
  CASE
    WHEN servingPlayer = g.playerOneId
    THEN MAX(playerOneScore - playerTwoScore)
    WHEN servingPlayer = g.playerTwoId
    THEN MAX(playerTwoScore - playerOneScore)
  END AS largestLead,
  w.wins,
  l.losses
FROM points p
JOIN games g 
  ON p.gameId = g.id
JOIN players pl 
  ON p.servingPlayer = pl.id
LEFT JOIN (
  SELECT
    winnerId AS playerId,
    COUNT(*) AS wins
  FROM Games 
  GROUP BY
    winnerId
) w
  ON pl.id = w.playerId
LEFT JOIN (
  SELECT
    loserId AS playerId,
    COUNT(*) AS losses
  FROM Games 
  GROUP BY 
    loserId
) l 
  ON pl.id = l.playerId
WHERE p.gameId = ?
GROUP BY
  servingPlayer;