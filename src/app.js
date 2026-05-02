const express = require('express');
const mongoDB = require('./config/database');
const app = express();
const User = require('./models/user');
const cookieeParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('./MiddleWare/auth');

app.use(express.json());
app.use(cookieeParser());

const authRoutes = require("./routes/authh");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/request");
const userRoutes = require("./routes/users");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);
app.use("/", userRoutes);



mongoDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

