const express = require("express");
const {ValidateSignupData} = require('../utils/validation');
const bcrypt = require('bcrypt');

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
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


authRoutes.post("/login", async (req,res) => {
    const { emailID, password } = req.body;

    try {
        const user = await User.findOne({ emailID});
        if (!user){
            throw new Error("Invalid Email ID");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            throw new Error("Invalid Password");
        } else{

        const token = jwt.sign(
         { _id: user._id },
            "DevTinder@12345",
           { expiresIn: "1h" }
           );

        res.cookie("Token", token);
        res.send("Login successful");
        }
        
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

authRoutes.post("/logout", (req,res) => {
    res.cookie("Token", null, {expires: new Date(0)});
    res.send("Logout successful");
});


module.exports = authRoutes;