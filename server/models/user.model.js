const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
    },
    role: {
        type: String,
        default: "viewer"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    console.log("saving this");

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, "adfbjhsberjgsygfwegaaegaegehwbsrbhe", {
        expiresIn: "7d",
    });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User",userSchema);