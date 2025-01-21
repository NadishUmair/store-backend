const mongoose = require("mongoose");


const mongo_url = "mongodb+srv://store:store1@cluster0.skin7.mongodb.net/store";



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
