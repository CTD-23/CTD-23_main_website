const express = require('express');
const dotenv=require("dotenv").config({path:"config/config.env"}); //configuring 
const connectDB=require("./config/dbConnection");
const app=require("./app");

const errorHandler=require("./middlewares/errors.js");

connectDB();



//function to start server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); 
});





// app.get("api/v1",(req,res)=>{
//     res.json({message:"h1"});
// });



app.use(errorHandler);
