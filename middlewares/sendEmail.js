const nodemailer = require('nodemailer');

const sendEmail = async (name, from_email, to_email, message, mail_type) => {
    let setMailBody = undefined;

    // mail body 1 is selected if message is sent to me.
    const mailBody_1 = `<div class="card text-center">
    <div class="card-header">
    Incoming Portfolio Message
    </div>
    <div class="card-body">
    <h5 class="card-title">Sender Name: ${name}</h5>
    <h5 class="card-title">Sender Email: ${from_email}</h5>
    <br>
    <p class="card-text"><strong>Message: </strong>${message}</p>
    </div>
    </div>`;

    // mail body 2 is selected for newletter notification.
    const mailBody_2 = 'None';

    // setting mail body according to the type
    setMailBody = (mail_type === 1) ? mailBody_1 : mailBody_2;

    // creating a transporter 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            // need to change this 
            user: 'kalash.ghost32@gmail.com',
            pass: 'darthVader@99'
        }
    });

    // mail body
    const mailOptions = {
        from: `${name}`,
        to: to_email,
        subject: 'New Portfolio Message',
        html: setMailBody
    };

    // sending email
    await transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log('Email Sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;