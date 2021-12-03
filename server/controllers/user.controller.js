const cloudinary = require("cloudinary");
const User = require("../models/user.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorhandler");
const fs = require('fs')
const registerUser = catchAsyncErrors(async (request, response, next) => {

    const { name, email, password} = request.body;
    const isPresent = await User.findOne({ email });
    if (isPresent) {
        return  response.status(401).json({
            message: "User already registerred",
        })
        
    }
    
    const user = await User.create({
        name,
        email,
        password,
    });
    // user.save();
    response.set("Access-Control-Allow-Credentials", true)
    response.set("withCredentials",true);
    sendToken(user, 201, response);
});



const loginUser = catchAsyncErrors( async(request, response, next) => {

    console.log(request.body);
    const { email, password } = request.body;
    if(!email || !password) {
        return  response.status(400).json({
            message: "Please Enter Email & Password",
        })
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return  response.status(401).json({
            message: "Invalid email or password",
        })
        
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return  response.status(402).json({
            message: "Invalid email or password",
        })
    }

    sendToken(user, 200, response);
});

const logout = catchAsyncErrors( async (request, response, next) => {

    response.cookie("token", null ,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    response.status(200).json({
        success: true,
        message: "Logged Out",
    })
});


module.exports = {
    registerUser,
    loginUser,
    logout,
}

