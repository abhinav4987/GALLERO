const mongoose = require("mongoose");

const connectDatabase = () => {
    
    const URI = "mongodb+srv://AURU80:arunima0302@disecto.yakl1.mongodb.net/disecto?retryWrites=true&w=majority";
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("Database server Up!");
    });
};

module.exports = connectDatabase;