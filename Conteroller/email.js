const nodemiler = require('nodemailer');

const sendemail =async (option)=>{
    const transporter= nodemiler.createTransport({
        // host:process.env.EMAIL_HOST,
        // port :process.env.EMAIL_PORT,
         service:'yahoo',
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD

        }
    });
   
    const mailOptions = {
        from:'hossam <hossam@thapet.com>',
        to:option.email,
        subject:option.subject,
        text:option.message
    };
 await transporter.sendMail(mailOptions)
}

module.exports =sendemail;