require("dotenv").config({path:"config/config.env"});
const eventData = require("./data/events");
const connectDB=require("./config/dbConnection");
const Events=require("./models/eventModel");

connectDB();

const importData=async()=>{
      try{
        await Events.deleteMany({});
        await Events.insertMany(eventData);
        console.log("Data Import Success");
        process.exit();
      }
      catch(error){
        console.error("ERROR WITH DATA IMPORT  ",error);
        process.exit(1);
      }
};

importData();