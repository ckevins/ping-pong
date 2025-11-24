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

// Move API routes to separate router files in ./routes
const playersRouter = require('./routes/players');
const migrationsRouter = require('./routes/migrations');
// mount the players router at /api
app.use('/api', playersRouter);
app.use('/api', migrationsRouter)

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});