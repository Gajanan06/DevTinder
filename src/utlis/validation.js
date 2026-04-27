const validator = require("validator");

const ValidateSignupData = (data) => {
    const { firstName, lastName, emailID, password } = data;

    if (!firstName || firstName.trim() === "") {
        throw new Error("First Name is required");
    }

    if (!validator.isEmail(emailID)) {
        throw new Error("Invalid Email ID");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Weak password");
    }
};

module.exports = { ValidateSignupData };