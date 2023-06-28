import nodeMailer from "node-mailer";


const createMailTransporter = () =>{
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        auth: {
            user :'sathakjha1999@gmail.com' ,
            pass:process.env.EMAIL_PASS,
        },
    });
    return transporter;
}; 

const SendMail = async ({ from, to, subject, text, attachments }) => {
      const transporter = createMailTransporter();
      const mailOptions = {
        from: user,
        to,
        subject,
        text,
        attachments,
      };
  
      await transporter.sendMail(mailOptions);
   
  };
  
  export default SendMail;