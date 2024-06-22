import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [error, setError] = useState('');
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [updatedProperty, setUpdatedProperty] = useState({
    title: '',
    description: '',
    price: 0,
    location: '',
    image: null
  });

  useEffect(() => {
    fetchUserDetails();
    fetchUserProperties();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details. Please try again.');
    }
  };

  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/properties', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProperties(response.data);
    } catch (error) {
      console.error('Error fetching user properties:', error);
      setError('Failed to fetch user properties. Please try again.');
    }
  };

  const handleEditProperty = (propertyId, propertyDetails) => {
    setEditPropertyId(propertyId);
    setUpdatedProperty({ ...propertyDetails });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty({ ...updatedProperty, [name]: value });
  };

  const handleImageChange = (e) => {
    setUpdatedProperty({ ...updatedProperty, image: e.target.files[0] });
  };

  const handleUpdateProperty = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', updatedProperty.title);
      formData.append('description', updatedProperty.description);
      formData.append('price', updatedProperty.price);
      formData.append('location', updatedProperty.location);
      formData.append('image', updatedProperty.image);

      await axios.put(`http://localhost:5000/api/properties/${editPropertyId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      fetchUserProperties();
      setEditPropertyId(null);
      setUpdatedProperty({
        title: '',
        description: '',
        price: 0,
        location: '',
        image: null
      });
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Failed to update property. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {userDetails && (
        <div>
          <h3 className="text-xl font-semibold mb-2">User Details</h3>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      )}
      {userProperties.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Uploaded Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userProperties.map(property => (
              <div key={property._id} className="bg-white shadow-md p-6 rounded-lg">
                {editPropertyId === property._id ? (
                  <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={updatedProperty.title} onChange={handleInputChange} className=" h-10 block w-1/2 border-gray-700 rounded-md shadow-sm mt-1 text-gray-900-300 bg-gray-300" />
                    <label htmlFor="description">Description:</label>
                    <textarea type="text" id="description" name="description" value={updatedProperty.description} onChange={handleInputChange} className="block w-full   border-gray-700 rounded-md shadow-sm mt-1 text-gray-900-300 bg-gray-300" />
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={updatedProperty.price} onChange={handleInputChange} className="w-1/4 block h-10 border-gray-700 rounded-md shadow-sm mt-1 text-gray-900-300 bg-gray-300" />
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={updatedProperty.location} onChange={handleInputChange} className="block w-full h-10 border-gray-700 rounded-md shadow-sm mt-1 text-gray-900-300 bg-gray-300" />
                    <img src={`http://localhost:5000${property.imageUrl}`} alt={property.title} className="h-48 object-cover mt-3 mb-2 rounded-lg" />
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="block mt-2" />
                    <button onClick={handleUpdateProperty} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Update Property</button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <img src={`http://localhost:5000${property.imageUrl}`} alt={property.title} className="w-full h-48 object-cover mb-2 rounded-lg" />
                    <p className="text-gray-700 mb-2">{property.description}</p>
                    <p className="text-gray-700 mb-2">Price: ${property.price}</p>
                    <p className="text-gray-700 mb-2">Location: {property.location}</p>
                    <button onClick={() => handleEditProperty(property._id, property)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit Property</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};