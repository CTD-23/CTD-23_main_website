const express = require('express');
const cookieparser=require("cookie-parser");


const app = express();
const cors=require("cors");

//const contacts=require("./routes/contactRoutes");

app.use(express.json());

app.use(cors({
    origin:["http://localhost:4000","https://gentle-cendol-c548cd.netlify.app"], 
    credentials :true ,
}));

app.use(cookieparser());

//routing
app.use("/api",require("./routes/contactRoutes"));
app.use("/api",require("./routes/generalRoutes"));

module.exports=app;


