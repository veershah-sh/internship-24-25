require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT;


app.use(express.static('public'));

// Middleware for parsing the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI; // Replace with your MongoDB URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Handle form submission
app.post('/submit-form', async (req, res) => {
  const { farmer_name, farmer_email, farmer_phone, survey_number } = req.body;

  // Log the email value to check if it's being passed correctly
  console.log('Received email:', farmer_email);

  // Check if the email is empty or null
  if (!farmer_email) {
    return res.status(400).send('Email is required.');
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ farmer_email });
    if (existingUser) {
      return res.status(400).send('Email already exists. Please use a different email.');
    }

    // Create and save the new user
    const newUser = new User({ farmer_name, farmer_email, farmer_phone, survey_number });
    await newUser.save();
    res.status(201).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error submitting form.');
  }
});

// API to fetch all data
app.get('/api/view-data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Update a user by ID
app.put('/api/update/:id', async (req, res) => {
    const { id } = req.params;
    const { farmer_name, farmer_email, farmer_phone, survey_number } = req.body;
  
    if (!farmer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(farmer_email)) {
      return res.status(400).send('A valid email is required.');
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { farmer_name, farmer_email, farmer_phone, survey_number },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send('User not found.');
      }
  
      res.status(200).send('User updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
  
      if (error.code === 11000) {
        res.status(400).send('The email provided is already in use.');
      } else {
        res.status(500).send('Error updating data.');
      }
    }
  });
  
  // Delete a user by ID
  app.delete('/api/delete-data/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.findByIdAndDelete(id);
      if (result) {
        res.send('Record deleted successfully!');
      } else {
        res.status(404).send('Record not found.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Error deleting data.');
    }
  });
  