const express = require('express');
const router = express.Router();

const mailingList = require('../models/mailingList');


/* POST newsletter form ====> Mailing List */

// function to add email in mailing list
const addEmail = async (email, res)=>{
    // first check if it is already in available in list
    const available = await mailingList.findOne({emailAddress : email});
    if(available){
        console.log('Email is already available.');
        return 1;
    }

    // if email is not available 
    else{
        const updatedMailingList = new mailingList({emailAddress : email});
        await updatedMailingList.save()
            .then(()=>{
                console.log('Email is successfully added to mailing list.');
                return 1;
            })
            .catch(err => {
                console.log('Email cannot be added to the mailing list at the moment.');
                console.log(err);
                return 0;
            })
    }
}

router.post('/mailingList', async (req, res) => {
    const {email} = req.body;

    if(addEmail(email))
        res.redirect('/ghost_32/');

    else
        res.redirect('/ghost_32/');
});





module.exports = router;