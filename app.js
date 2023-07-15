const express = require('express');
const app = express();

//const contacts=require("./routes/contactRoutes");

app.use(express.json());

//routing
app.use("/api",require("./routes/contactRoutes"));
app.use("/api",require("./routes/generalRoutes"));

module.exports=app;










