const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        lastName: {
            type: String,
        },
        emailID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value){
                if (!validator.isEmail(value)){
                    throw new Error("Invalid Email ID");

                }
            }

        },
        password: {
            type: String,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value){
                if (!["Male", "Female", "Other"].includes(value)){
                    throw new Error("Invalid");
                }
            }
        },
        profile:{
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            validate(value){
                if (!validator.isURL(value)){
                    throw new Error("Invalid URL");
                    
                }
            }
        }
    },
{
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;