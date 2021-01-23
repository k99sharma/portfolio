const express = require('express');
const router = express.Router();

const contact = require('../models/contactme');

const sendEmail = require('../middlewares/sendEmail');
const addEmail = require('../middlewares/addEmail');

/* POST newsletter form ====> Mailing List */

router.post('/mailingList', async (req, res) => {
    const {email} = req.body;

    if(addEmail(email))
        res.redirect('/ghost_32/');

    else
        res.redirect('/ghost_32/');
});


/* POST contact form ====> Message me by filling the form */

router.post('/contact', async (req, res)=>{
    const { firstname, lastname, email, message } = req.body;

    // new message 
    const newMessageEntry = new contact({
        firstName : firstname,
        lastName : lastname,
        senderEmail : email,
        message : message
    });

    await newMessageEntry.save()
        .then(()=>{
            console.log('Message entry saved successfully !');
        })
        .catch(err => {
            console.log('Message cannot be saved !');
            console.log(err);
        })

    const myEmail = process.env.MYEMAIL;
    const mail_type = 1;

    // send email function calling
    sendEmail(`${firstname} ${lastname}`, email, myEmail, message, mail_type)
        .then(()=>{
            console.log('Email Sent!');
        })
        .catch(err => {
            console.log('Email cannot be sent !');
            console.log(err);
        })

    res.redirect('/ghost_32/');
});


module.exports = router;