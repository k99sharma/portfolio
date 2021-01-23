const mailingList = require('../models/mailingList');


// function to add email in mailing list
const addEmail = async (email)=>{
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


module.exports = addEmail;