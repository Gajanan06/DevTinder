const mongoose = require("mongoose");
const {MONGO_URI} = require("../dbCredentials");

const mongoDB = async () =>{
    await mongoose.connect(MONGO_URI);
};

module.exports = mongoDB;


