const mongoose = require("mongoose");

const mongoDB = async () =>{
    await mongoose.connect("mongodb+srv://Gajanan06:Gaju%40006@gajanandb.azwcvzh.mongodb.net/devTinder?retryWrites=true&w=majority");
};

module.exports = mongoDB;


