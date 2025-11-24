// index.js
const express = require('express');
const db = require('./database');
    
const app = express();
const port = 3000; // Or any desired port

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for your Vue app (adjust origins as needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Your Vue app's origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/players', (req, res) => {
    console.log('Request processing...');
    const sql = `
        WITH playerGames AS (SELECT  p.id,
            p.name,
            p.handedness,
            g.winner,
            g.loser
        FROM Players p
        LEFT JOIN Games g
            ON 
                p.id = g.playerOne
                OR 
                p.id = g.playerTwo
        ) SELECT
            name,
            handedness,
            COUNT(winner = id) AS wins,
            COUNT(loser = id) AS losses
        FROM playerGames
        GROUP BY 
            name,
            handedness
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
            return;
        }
        res.json({
            data: rows
        })
    })
});

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});