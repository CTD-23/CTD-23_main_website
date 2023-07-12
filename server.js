const express = require('express');
const dotenv=require("dotenv").config({path:"config/config.env"}); //configuring 
const connectDB=require("./config/dbConnection");
const app=require("./app");


connectDB();



//function to start server
const server=app.listen(process.env.PORT,()=>{
    console.log(`PORT running on http:://localhost:${process.env.PORT}`);
});
