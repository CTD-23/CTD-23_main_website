const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    let testAccount=await nodemailer.createTestAccount();
    
    //connect to the SMTP
   
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: 'mailpostg1010@gmail.com',
            pass: 'IDR8UNOgGYFQv56y'
        }
     });
 
     const mailOptions= {
         
        from :'mailpostg1010@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message,
        
     }

    await transporter.sendMail(mailOptions);

};

module.exports=sendEmail;