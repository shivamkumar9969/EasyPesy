const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const propertyRoutes = require('./routes/propertyRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Use CORS middleware
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Use userRoutes for handling user authentication
app.use(userRoutes);

app.use('/uploads', express.static('uploads'));

// Use propertyRoutes for handling property-related requests
app.use(propertyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


