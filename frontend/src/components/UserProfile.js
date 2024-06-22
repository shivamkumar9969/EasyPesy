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
    propertyLocation: '',
    ownerContactAddress: '',
    ownerContactNumber: '',
    ownerAlternateContactNumber: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    imageUrl: '',
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
      for (const key in updatedProperty) {
        formData.append(key, updatedProperty[key]);
      }
  
      // Perform the update operation
      await axios.put(`http://localhost:5000/api/properties/${editPropertyId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
     
      // Fetch user properties again to update the state and display the updated image
      fetchUserProperties();
      setEditPropertyId(null);
      setUpdatedProperty({
        title: '',
        description: '',
        price: 0,
        propertyLocation: '',
        ownerContactAddress: '',
        ownerContactNumber: '',
        ownerAlternateContactNumber: '',
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        imageUrl: '',
        image: null
      });
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Failed to update property. Please try again.');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Fetch user properties again to update the state
      fetchUserProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property. Please try again.');
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
                    {/* Edit property form */}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <img src={`http://localhost:5000${property.imageUrl}`} alt={property.imageUrl} className="w-full h-48 object-cover mb-2 rounded-lg" />
                    <p className="text-gray-700 mb-2">{property.description}</p>
                    <p className="text-gray-700 mb-2">Price: ${property.price}</p>
                    <p className="text-gray-700 mb-2">Location: {property.propertyLocation}</p>
                    <p className="text-gray-700 mb-2">Contact Address: {property.ownerContactAddress}</p>
                    <p className="text-gray-700 mb-2">Contact Number: {property.ownerContactNumber}</p>
                    {property.ownerAlternateContactNumber && <p className="text-gray-700 mb-2">Alternate Contact Number: {property.ownerAlternateContactNumber}</p>}
                    <p className="text-gray-700 mb-2">Bedrooms: {property.bedrooms}</p>
                    <p className="text-gray-700 mb-2">Bathrooms: {property.bathrooms}</p>
                    <p className="text-gray-700 mb-2">Size: {property.size}</p>
                    <div className="flex justify-between">
                      <button onClick={() => handleEditProperty(property._id, property)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit Property</button>
                      <button onClick={() => handleDeleteProperty(property._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Property</button>
                    </div>
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

export default UserProfile;
