const mongoose=require("mongoose");

const teamRCSchema=new mongoose.Schema({

    team_name:{
        type:String,
        required:false
    },

    email1:{
        type:String,      
        required:true       
    },

    email2:{
        type:String,       
        required:false
    },

    isRC:{
        type:Boolean,
        
        default:false
    },

    username1:String,
    username2:String,

    password1:String,
    password2:String,

});

module.exports=mongoose.model("TeamRC",teamRCSchema);

