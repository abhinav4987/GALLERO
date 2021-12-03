const sendToken = (user, statusCode, response) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };  

    
    response.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};
  
module.exports = sendToken;