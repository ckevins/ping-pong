const db = require("../../database");
const { executeQueryAsync } = require("../../query-helpers");

async function getGameRecord (gameId, res) {
  console.log("Fetching game record " + gameId + '...');

  const getGameDataSql = `
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
      WHERE g.Id = ${gameId}
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
        WHERE gameId = ${gameId}
      ) scoreDifferentials
      GROUP BY
        gameId
    ) y
      ON x.gameId = y.gameId;
  `;
  
  const playerDataSql = `
    SELECT
      pl.name AS player,
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
    WHERE p.gameId = ${gameId}
    GROUP BY
      servingPlayer;
  `

  const pointDataSql = `
    SELECT 
      * 
    FROM points p 
    WHERE gameId = ${gameId};
  `;

  const gameData = (await executeQueryAsync(getGameDataSql))[0];
  const playerData = await executeQueryAsync(playerDataSql);
  const pointData = await executeQueryAsync(pointDataSql);

  res.json({ data: 
    {
      gameData,
      playerData,
      pointData
    } 
  });
}

module.exports = getGameRecord;