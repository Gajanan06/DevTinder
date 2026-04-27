const express = require('express');
const mongoDB = require('./config/database');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');

const {ValidateSignupData} = require('./utlis/validation');

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        // console.log("BODY:", req.body);

        //validate the data
        ValidateSignupData(req.body);
    
       // Encrypt the password
        const { firstName, lastName, emailID, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);


    
        const user = (req.body);

        const newUser = new User({
            firstName,
            lastName,
            emailID,
            password: hashedPassword
        });

        await newUser.save();
        res.send("User created successfully");
    } catch (err) {
        // console.error("Error creating user:", err);
        res.status(400).send(err.message);
    }
});

app.post("/login", async (req,res) => {
    const { emailID, password } = req.body;

    try {
        const user = await User.findOne({ emailID});
        if (!user){
            throw new Error("Invalid Email ID");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            throw new Error("Invalid Password");
        }else {
            res.send("Login successful");
        }
    }
    catch (err) {
        res.status(400).send(err.message);
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
        // console.error("Error fetching user:", err);
        res.status(400).send("Internal Server Error");
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
        // console.error("Error fetching user:", err);
        res.status(400).send("Internal Server Error");
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
        // console.error("Error fetching user:", err);
        res.status(400).send("Internal Server Error");
    }
});

app.delete("/user", async (req,res) => {
    const userId = req.body._id;

    try {
        const user = await User.findByIdAndDelete({_id: userId});

        if (user.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    } catch (err) {
        // console.error("Error deleting user:", err);
        res.status(400).send("Internal Server Error");
    }
});

app.patch("/user", async (req,res) => {
    // const userId = req.body._id;
    // const updateData = req.body;

    const { _id, ...updateData } = req.body;
    const userId = _id;

    try {
        const AllowedUpdates = ["age","gender","password","lastName"];

        const updates = Object.keys(updateData);
        const isValid = updates.every((field) => AllowedUpdates.includes(field));
        if (!isValid){
            return res.status(400).send("Cannot update the field");
        }

        const user = await User.findByIdAndUpdate({ _id: userId}, updateData,{
            runValidators: true,
        });

        res.send("User updated successfully");

    } catch (err) {
        // console.error("Error updating user:", err);
        res.status(400).send("Internal Server Error");
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

