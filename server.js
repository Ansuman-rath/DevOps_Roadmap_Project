// server.js
require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic Auth for /secret route
app.use('/secret', basicAuth({
    users: { [process.env.USERNAME]: process.env.PASSWORD },
    challenge: true,
    unauthorizedResponse: () => 'Unauthorized!'
}));

// Public route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Secret route
app.get('/secret', (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
