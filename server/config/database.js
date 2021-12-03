const mongoose = require("mongoose");

const connectDatabase = () => {
    
    const URI = "tmongodb://localhost:27017/disecto";
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("Database server Up!");
    });
};

module.exports = connectDatabase;