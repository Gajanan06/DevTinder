const express = require('express');
const { authMiddleware } = require('../MiddleWare/auth');
const {validateEditProfileData} = require('./utlis/validation');

const profileRoutes = express.Router();

profileRoutes.get("/profile/view", authMiddleware, (req, res) => {
    try{
  res.send("User profile: " + req.user);
} catch (err) {
    res.status(400).send("Internal Server Error");
}
});

profileRoutes.patch("/profile/edit", authMiddleware, (req, res) => {
    try{
       if (!validateEditProfileData(req)){
        res.status(400).send("Invalid updates");
       }
       const loggedInUser = req.user;
         object.keys(req.body).forEach((update) => {
            loggedInUser[update] = req.body[update];
         });

        loggedInUser.save();

        res.send("Profile updated successfully");

    } catch (err) {
       res.status(400).send("Internal Server Error");
}
});

module.exports = profileRoutes;