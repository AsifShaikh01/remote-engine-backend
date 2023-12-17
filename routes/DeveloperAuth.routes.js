const express = require('express');
const DevAuthrouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {DeveloperSignupModel} = require("../models/DeveloperSignup.model")


// Developer  registration
DevAuthrouter.post('/register', async (req, res) => {
    const { name,email, password } = req.body;
  
    try {
      // Checking if the email is already registered
      const existingDev = await DeveloperSignupModel.findOne({ email });
      if (existingDev) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Creating a new Developer
      const newDeveloper = new DeveloperSignupModel({
        name,
        email,
        password: hashedPassword,
        
      });
  
      await newDeveloper.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Developer login
  DevAuthrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Checking if the dveloper exists
      const existingDev = await DeveloperSignupModel.findOne({ email });
      if (!existingDev) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Comparing password to the hashed password
      const passwordMatch = await bcrypt.compare(password, existingDev.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generating JWT token here
      const token = jwt.sign({ email: existingDev.email }, 'masai');
      
      res.status(200).json({ token }); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = {
     DevAuthrouter
  };