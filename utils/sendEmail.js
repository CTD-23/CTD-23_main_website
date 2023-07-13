const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    let testAccount=await nodemailer.createTestAccount();
    
    //connect to the SMTP
   
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
            auth: {
                user: 'brain.hilpert@ethereal.email',
                pass: 'v1FDYJUXHKujAMMDGE'
            }
     });
 
     const mailOptions= {
         
        from :'brain.hilpert@ethereal.email',
        to:options.email,
        subject:options.subject,
        text:options.message,
        
     }

    await transporter.sendMail(mailOptions);

};

module.exports=sendEmail;