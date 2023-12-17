const express = require('express');
const router = express.Router();
const {DeveloperBoardModel} = require('../models/DevOnboarding.model');
const {authMiddleware} = require("../middlewares/Auth.middleware")

router.post('/developersboarding',authMiddleware, async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            skills,
            professionalExperience,
            educationalExperience
        } = req.body;

       
        const newDeveloper = new DeveloperBoardModel({
            firstName,
            lastName,
            phoneNumber,
            email,
            skills,
            professionalExperience,
            educationalExperience
        });

        
        await newDeveloper.save();

        res.status(201).json({ message: 'Developer details saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {router};