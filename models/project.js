const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creationInfo = require('../models/plugins');

const projectSchema = new Schema({
    projectName : {
        type: String, 
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    videoLink : {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    hostingLink: {
        type: String,
        default: undefined
    }
});

// adding plugin
projectSchema.plugin(creationInfo);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;