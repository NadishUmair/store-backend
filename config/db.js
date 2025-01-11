const mongoose = require("mongoose");
// nD4lMeKCvlwGO0rS
const mongo_url = "mongodb+srv://shopcirclestore:nD4lMeKCvlwGO0rS@cluster0.h1iet.mongodb.net/store"; 



const ConnectDb = () => {
    mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
     
  
    })
    .catch((error) => {
      console.error("Error in connecting to the database:", error.message);
      process.exit(1); 
    });
  };
  
  

  
 


module.exports = ConnectDb;
