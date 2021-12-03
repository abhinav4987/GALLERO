const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { response } = require("express");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("authenticating : ", token);
    if (!token) {
        return res.status(401).json("Please Login to access this resource");
    }


    const decodedData = jwt.verify(token,"adfbjhsberjgsygfwegaaegaegehwbsrbhe");

    req.user = await User.findById(decodedData.id);

    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return  res.status(403).json(`Role: ${req.user.role} is not allowed to access this resouce `);
        }
        next();
    };
};
  