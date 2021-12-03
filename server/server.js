const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary");
var cors = require("cors");
const path = require('path');
require('dotenv').config()
const connectDatabase = require("./config/database");
// const errorMiddleware = require("./middleware/error");


// middlewares
server.use(cors(
    {
        credentials: true,
        origin:true
    }
));
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());
server.set("trust proxy", 1);
// server.use(errorMiddleware);



// database initialization
connectDatabase();

cloudinary.config({     
    cloud_name: 'dfwfghwgo', 
    api_key: '173534259168265', 
    api_secret: 'OPXdise0-ggyV1hgimBpIj1_2Ak' 
});


// Route imports

const user = require('./routes/user.routes');
const album = require('./routes/album.routes');
server.use("/api/v1/",user);
server.use("/api/v1",album);


if(process.env.NODE_ENV == 'production') {
    server.use(express.static("client/build"));
    const path = require("path");
    server.get("*",(req, response) => {
        response.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000
let runninServer = server.listen(PORT, () => {
    console.log("Server is running!");
})