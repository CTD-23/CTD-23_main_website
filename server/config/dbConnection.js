const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        const connect= await mongoose.connect(process.env.DB_CONNECT);
        console.log("Database connected",
            connect.connection.host,
            connect.connection.name
        );
        }catch(err){
            console.log("not connected",err);
            process.exit(1);
        }
}

module.exports=connectDB;
