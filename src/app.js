const express = require('express');
const mongoDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    try {
        const user = ({ firstName: "Gajanan",
             lastName: "Nilajkar", 
             emailID: "gajanannilajkar06@gmail.com",
             password: "gajanan123",
        });

        const newUser = new User(user);

        await newUser.save();
        res.send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Internal Server Error");
    }
});

mongoDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

