const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()



const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.mongoURL); // No additional options needed
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit the process if connection fails
    }
  };
module.exports = connectToMongo;