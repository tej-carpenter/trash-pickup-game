const express = require('express');
const path = require('path');

const app = express();
const PORT = 5500;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
