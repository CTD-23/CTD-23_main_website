const express = require('express');
const app = express();
//Port

// /*const start = async () => {
//     try{
//         app.listen(PORT , function(){
//        console.log( `connected at ${PORT} Master port `);
       

//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// };*/
const contacts=require("./routes/contactRoutes");
app.use("/api/v1",contacts)

module.exports=app;










