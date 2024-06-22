// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile'); // Assuming you have an endpoint to fetch user profile
        setUser(response.data); // Assuming the response contains user data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>User Type: {user.userType}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default Profile;
