const mongoose = require("mongoose");
// nD4lMeKCvlwGO0rS
const url = "mongodb+srv://shopcirclestore:nD4lMeKCvlwGO0rS@cluster0.h1iet.mongodb.net/store"; 


const ConnectDb = async () => {
    try {
        
        await mongoose.connect(url, {
            useNewUrlParser: true,   
            useUnifiedTopology: true, 
        });

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};


module.exports = ConnectDb;
