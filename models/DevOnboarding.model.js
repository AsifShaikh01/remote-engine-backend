const mongoose = require('mongoose');

// Define the schema for Professional Experience
const professionalExperienceSchema = new mongoose.Schema({
    companyName: String,
    techStack: [String],
    skillsUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    timePeriod: String
});


const educationalExperienceSchema = new mongoose.Schema({
    degreeName: String,
    schoolName: String,
    timePeriod: String
});


const developerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: { type: String, unique: true }, 
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }], 
    professionalExperience: [professionalExperienceSchema],
    educationalExperience: [educationalExperienceSchema]
});

const DeveloperBoardModel = mongoose.model('Developer', developerSchema);

module.exports = {
    DeveloperBoardModel
};