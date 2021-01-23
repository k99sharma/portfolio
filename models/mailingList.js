const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creationInfo = require('../models/plugins');

const mailingListSchema = new Schema({
    emailAddress: {
        type: String,
        required: true
    }
});


// adding plugin
mailingListSchema.plugin(creationInfo);

const mailingList = mongoose.model('mailingList', mailingListSchema);


module.exports = mailingList;