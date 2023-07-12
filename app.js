const express = require('express');
const app = express();

//const contacts=require("./routes/contactRoutes");

app.use(express.json());


app.use("/api",require("./routes/contactRoutes"));
// // app.get('/', function(req, res) {
//     res.send('<p>hello ayush and shreya </p>');
// })

module.exports=app;










