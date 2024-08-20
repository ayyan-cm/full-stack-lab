
const express = require('express');
const greet = require('./Greet'); // Import the function from Greet.js

const app = express();

app.get('/', (req, res) => {
    const message = greet('Riki'); // Calling the function
    res.send(message);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
