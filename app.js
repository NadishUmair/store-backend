const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDb = require("./config/db");
const path = require('path');
const PORT=4000;
app.use(cors());


app.use(express.json());



// const allowedOrigins = ['http://localhost:3000', 'http://192.168.56.1:3000', 'https://playnestfrontend.vercel.app'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS')); 
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],  
//   credentials: true,  
// }));



const allowedOrigins = ['http://localhost:3000', 'http://192.168.56.1:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const ProductRoutes=require("./routes/productsRoutes");
const AdminRoutes=require("./routes/adminRoutes")
ConnectDb();

app.use("/api/product",ProductRoutes)
app.use("/api/admin",AdminRoutes)


app.use("/",()=>{
    res.send("app is running")
})

app.listen(PORT,()=>{
    console.log("app is running at port",PORT);
})