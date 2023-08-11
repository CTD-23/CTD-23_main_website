const mongoose=require("mongoose");
const eventsSchema=mongoose.Schema({
    
    eventName:{
        type:String,
        required:true,
    },

    imageUrl:{
        type: String,
        required:true,
    },

    details:{
        type:String,
        required:true,
    },
    
    contact:
    {
        type:String,
        required:true,
    },
    
    rules:{
        type:String,
        required:true,
    },
});

module.exports=mongoose.model("Events",eventsSchema);
