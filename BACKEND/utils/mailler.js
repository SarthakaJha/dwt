import nodemailer from "nodemailer";


const createMailTransporter = () =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user :'sathakjha1999@gmail.com' ,
            pass: process.env.EMAIL_PASS,
        },
    });
    return transporter;
}; 

const SendMail = async ({ from, to, subject, text, attachments }) => {
      const transporter = createMailTransporter();
      const mailOptions = {
        to,
        subject,
        text,
        attachments,
      };
  
      await transporter.sendMail(mailOptions);
   
  };
  
  export default SendMail;