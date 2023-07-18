const mongoose=require("mongoose");

const teamSchema=new mongoose.Schema({

    team_name:{
        type:String,
        required:true
    },

    email1:{
        type:String,
        unique:true,
        required:true
        
    },

    email2:{
        type:String,
        unique:true,
        required:true
    },

    isDatawiz:{
        type:Boolean,
        
        default:false
    },

    isNCC:{
        type:Boolean,
        
        default:false
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






// // Generate a unique user ID
// const generateUsername = () => {
//     // Generate a timestamp-based ID
//     const timestamp = Date.now().toString();
//     // Append a random number to avoid collisions
//     const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//     return timestamp + randomNum;
//   };
  
  // Generate a random password
//   const generatePassword = (length) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let password = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       password += characters.charAt(randomIndex);
//     }
//     return password;
//   };
  
//   // Usage
//   const userId = generateUsername();
//   const password = generatePassword(10); // Specify the desired password length
//   console.log("User ID:", userId);
//   console.log("Password:", password);

module.exports=mongoose.model("Team",teamSchema);

