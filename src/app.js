const express = require('express');
const mongoDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const user = (req.body);

        const newUser = new User(user);

        await newUser.save();
        res.send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/user", async (req,res) => {
    const UserEmailId = req.body.emailID;
    try {
        const user = await User.findOne({emailID: UserEmailId});
        if (user.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
    }   
});

app.get("/feed", async (req,res) => {
     
    try {
        const user = await User.find({});
        if (user.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/id", async (req,res) => {

    try {
        const user = await User.findById({_id: req.body._id});
        if (user.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        console.error("Error fetching user:", err);
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

