const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, request, response,next) =>  {

    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
        error = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (error.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        error = new ErrorHandler(message, 400);
    }

    // JWT EXPIRE error
    if (error.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        error = new ErrorHandler(message, 400);
    }

    response.status(error.statusCode).json({
        success: false,
        message: err.message,
    });
};