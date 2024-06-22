// routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../modules/Property'); // Correct import path
const authenticateUser = require('../middleware/authenticateUser')

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename to ensure uniqueness
  }
});
const upload = multer({ storage });

// Route to add a new property
router.post('/api/properties', authenticateUser, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from authenticated user
    const { title, description, price, propertyLocation, ownerContactAddress, ownerContactNumber, ownerAlternateContactNumber, bedrooms, bathrooms, size, kitchen, bhk } = req.body;
    const imageFilename = req.file.filename; // Get the filename of the uploaded image

    const property = new Property({
      userId,
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size,
      kitchen,
      bhk,
      imageUrl: `/uploads/${imageFilename}`, // Set the image URL
      imageFilename // Save the filename of the uploaded image
    });

    await property.save();

    res.status(201).json({ message: 'Property added successfully' });
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete property route
router.delete('/api/properties/:propertyId', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { propertyId } = req.params;

    // Ensure that the property belongs to the authenticated user
    const property = await Property.findOne({ _id: propertyId, userId: userId });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete the property
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// routes/propertyRoutes.js

// Update property route
router.put('/api/properties/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size

    } = req.body;

    const updatedProperty = {
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size
    };

    // Check if an image file was uploaded
    if (req.file) {
      updatedProperty.imageUrl = `/uploads/${req.file.filename}`; // Set the image URL to the path where the image is stored
      updatedProperty.imageFilename = req.file.filename; // Set the image filename
    }

    // Find the property by ID and update it
    const property = await Property.findByIdAndUpdate(id, updatedProperty, { new: true });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;



