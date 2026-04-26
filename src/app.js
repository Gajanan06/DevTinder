const express = require('express');

const app = express();

app.get('/user', (req, res) => {
    res.send({firstname: "Gajanan",lastname:"Nilajkar"});
});

app.post('/user', (req, res) => {
    res.send('Saved data to the Database');
});

app.delete('/user', (req, res) => {
    res.send("Deleted Successfully");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});