const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const port = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rolebasedDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Serve static files (e.g., HTML, JS, CSS)
app.use(express.static('public'));

// Route to handle form submissions (POST)
app.post('/submit-form', async (req, res) => {
  const { name, email, phone, survey_number, role } = req.body;

  // Normalize the role (first letter uppercase)
  const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  // Validate role
  if (!normalizedRole || !['Farmer', 'Operator'].includes(normalizedRole)) {
    return res.status(400).send('Invalid role.');
  }

  try {
    const newUser = new User({ name, email, phone, survey_number, role: normalizedRole });
    await newUser.save();
    res.status(201).send('Form submitted successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data.');
  }
});

// Route to fetch data (GET)
// Route to view all user data based on role (GET)
app.get('/api/view-data', async (req, res) => {
  const { role } = req.query;
  const query = role ? { role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() } : {};

  try {
    const users = await User.find(query);  // Find users by role if specified
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data.');
  }
});


// Route to delete a user (DELETE)
app.delete('/api/delete-data/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('User deleted');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user.');
  }
});

// Route to update user data (PUT)
app.put('/api/update-data/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send('User updated');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user.');
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
