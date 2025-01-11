const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDb = require("./config/db");
const path = require('path');
const PORT=4000;
app.use(cors());


app.use(express.json());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const ProductRoutes=require("./routes/productsRoutes");
const AdminRoutes=require("./routes/adminRoutes")
ConnectDb();

app.use("/api/product",ProductRoutes)
app.use("/api/admin",AdminRoutes)
app.listen(PORT,()=>{
    console.log("app is running at port",PORT);
})