const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Serve the form from index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the form submission
app.post('/', (req, res) => {
    const { name, dept } = req.body;

    // Check if the required fields are present
    if (!name || !dept) {
        return res.status(400).send('Name and department are required.');
    }

    // Read the current data from user-details.json
    const filePath = path.join(__dirname, 'user-details.json');
    let userDetails = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Update the data with the new values
    userDetails.name = name;
    userDetails.dept = dept;

    // Write the updated data back to user-details.json
    fs.writeFileSync(filePath, JSON.stringify(userDetails, null, 2));

    // Print the greeting message on the console
    console.log(`Hello ${name}`);

    // Redirect back to the form
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
