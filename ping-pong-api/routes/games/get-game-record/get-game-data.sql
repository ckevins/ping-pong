SELECT
  x.*,
  numberOfTies
FROM
(
  SELECT
    g.id AS gameId,
    w.name AS winner,
    l.name AS loser,
    g.finalWinningScore,
    g.finalLosingScore,
    firstServe.name AS firstServe
  FROM games g
  JOIN players w
    ON g.winnerId = w.id
  JOIN players l 
    ON g.loserId = l.id 
  JOIN players firstServe
    ON g.playerOneId = firstServe.id
  WHERE g.Id = ?
) x
JOIN (
  SELECT
    gameId,
    COUNT(CASE 
      WHEN scoreDiff = 0 THEN 1
      ELSE NULL
    END) AS numberOfTies
  FROM (
    SELECT
      p.gameId AS gameId,
      pointNumber,
      playerOneScore,
      playerTwoScore,
      playerOneScore - playerTwoScore AS scoreDiff
    FROM points p
    WHERE gameId = ?
  ) scoreDifferentials
  GROUP BY
    gameId
) y
  ON x.gameId = y.gameId;