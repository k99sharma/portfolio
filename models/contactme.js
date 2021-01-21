const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creationInfo = require('../models/plugins');

const contactSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }
});


contactSchema.plugin(creationInfo);

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;