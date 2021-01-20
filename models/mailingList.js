const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailingListSchema = new Schema({
    emailAddress: {
        type: String,
        required: true
    }
});


const mailingList = mongoose.model('mailingList', mailingListSchema);

module.exports = mailingList;