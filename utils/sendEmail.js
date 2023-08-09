const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    let testAccount=await nodemailer.createTestAccount();
    
    //connect to the SMTP
   
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: 'ctd23notifications@gmail.com',
            pass: 'sbYfOXA8j2FycL4g'
        }
     });
 
     const mailOptions= {
         
        from :'ctd23notifications@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message,
        
     }

    await transporter.sendMail(mailOptions);

};

module.exports=sendEmail;