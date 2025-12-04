INSERT INTO games 
  (
    "playerOneId", 
    "playerTwoId",
    "winnerId",
    "loserId",
    "finalWinningScore",
    "finalLosingScore",
    "date"
  ) 
VALUES 
  (
    ?, 
    ?, 
    ?, 
    ?, 
    ?, 
    ?,
    datetime('now') || 'Z'
  );