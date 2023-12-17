const express = require('express');
const ClientAuthrouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ClientSignupModel} = require("../models/ClientSignup.model")


// Client  registration
ClientAuthrouter.post('/register', async (req, res) => {
    const { name,email, password } = req.body;
  
    try {
      // Checking if the email is already registered
      const existingClient = await ClientSignupModel.findOne({ email });
      if (existingClient) {
        res.send({ message: 'Email already registered' });
      }
  
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Creating a new Client
      const newClient = new ClientSignupModel({
        name,
        email,
        password: hashedPassword,
        
      });
  
      await newClient.save();
      res.send({ message: 'Registration successful' });
    } catch (err) {
      res.send({ message: err});
    }
  });
  
  // Client login
  ClientAuthrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Checking if the client exists
      const existingClient = await ClientSignupModel.findOne({ email });
      if (!existingClient) {
        res.send("user not found");
      }
  
      // Comparing password to the hashed password
      const passwordMatch = await bcrypt.compare(password, existingClient.password);
      if (!passwordMatch) {
        res.send({ message: 'Invalid email or password' });
      }
  
      // Generating JWT token here
      const token = jwt.sign({ email: existingClient.email }, 'masai');
      
      res.send({"msg":"Login Successfull", token:token }); 
    } catch (err) {
      res.send({ message: err});
    }
  });
  
  module.exports = {
     ClientAuthrouter
  };