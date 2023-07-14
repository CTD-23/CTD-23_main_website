const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    let testAccount=await nodemailer.createTestAccount();
    
    //connect to the SMTP
   
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'elias90@ethereal.email',
            pass: 'GQd9gbUEXuxFUq4ATG'
        }
     });
 
     const mailOptions= {
         
        from :'elias90@ethereal.email',
        to:options.email,
        subject:options.subject,
        text:options.message,
        
     }

    await transporter.sendMail(mailOptions);

};

module.exports=sendEmail;