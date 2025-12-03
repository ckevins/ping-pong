// index.js
const express = require('express');
    
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

const playersRouter = require('./routes/players/players-router');
const gamesRouter = require('./routes/games/games-router');

app.use('/api', playersRouter);
app.use('/api', gamesRouter);

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});