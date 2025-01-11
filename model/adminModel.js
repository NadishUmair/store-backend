const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
  
   password: {
      type: String,
    },
    email: {
      type: String, 
    },
    resetPasseordOtp:{
      type:Number
    }
 
  },
  {
    timestamps: true,
  }
);
const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
