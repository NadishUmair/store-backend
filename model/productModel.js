const mongoose = require("mongoose");
const { Schema } = mongoose;


const ProductSchema=new Schema({
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    prevPrice:{
        type:Number
    },
    productCategory:{
     type:String,
    },
 
    product_Description:{
        type:String
    },
    productImg:{
        type:String
    }
})
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;