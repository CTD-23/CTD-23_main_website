// Generate a unique user ID
const generateUsername=()=>{
    // Generate a timestamp-based ID
    const timestamp = Date.now().toString();
    // Append a random number to avoid collisions
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return timestamp + randomNum;
 };
 
 // Generate a random password
 const generatePassword=()=>{
     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     let password = '';
     for (let i = 0; i < 8; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       password += characters.charAt(randomIndex);
     }
     return password;
  };


  module.exports={generateUsername,generatePassword};
 