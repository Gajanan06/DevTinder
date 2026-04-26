const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send('This is a test route!');
});

app.get('/contact', (req, res) => {
    res.send('Contact us at');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});