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

// Define a simple GET route
app.get('/api/data', (req, res) => {
    console.log('Request processing...');
    res.json({ message: 'Hello from the API!', data: ['item1', 'item2'] });
});

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});