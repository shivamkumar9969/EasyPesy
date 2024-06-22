import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListProperty = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [ownerContactAddress, setOwnerContactAddress] = useState('');
    const [ownerContactNumber, setOwnerContactNumber] = useState('');
    const [ownerAlternateContactNumber, setOwnerAlternateContactNumber] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [size, setSize] = useState('');
    const [bhk, setbhk] = useState('');
    const [kitchen, setkitchen] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [ownerDetails, setOwnerDetails] = useState(null);

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOwnerDetails(response.data);
            } catch (error) {
                console.error('Error fetching owner details:', error);
                setError('Failed to fetch owner details. Please try again.');
            }
        };

        fetchOwnerDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userId', ownerDetails._id); // Add user ID to form data
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('propertyLocation', propertyLocation);
            formData.append('ownerContactAddress', ownerContactAddress);
            formData.append('ownerContactNumber', ownerContactNumber);
            formData.append('ownerAlternateContactNumber', ownerAlternateContactNumber);
            formData.append('bedrooms', bedrooms);
            formData.append('bathrooms', bathrooms);
            formData.append('size', size);
            formData.append('bhk', bhk);
            formData.append('kitchen', kitchen);
            formData.append('image', image);

            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/properties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setTitle('');
            setDescription('');
            setPrice('');
            setPropertyLocation('');
            setOwnerContactAddress('');
            setOwnerContactNumber('');
            setOwnerAlternateContactNumber('');
            setBedrooms('');
            setBathrooms('');
            setSize('');
            setImage(null);
            setError('');
        } catch (error) {
            console.error('Error adding property:', error);
            setError('Failed to add property. Please try again.');
        }
    };



    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Fill Your Property Details</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="propertyLocation" className="block text-gray-700 font-bold mb-2">Property Location:</label>
                            <input type="text" id="propertyLocation" value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="ownerContactAddress" className="block text-gray-700 font-bold mb-2">Owner Contact Address:</label>
                            <input type="text" id="ownerContactAddress" value={ownerContactAddress} onChange={(e) => setOwnerContactAddress(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="ownerContactNumber" className="block text-gray-700 font-bold mb-2">Owner Contact Number:</label>
                            <input type="text" id="ownerContactNumber" value={ownerContactNumber} onChange={(e) => setOwnerContactNumber(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="ownerAlternateContactNumber" className="block text-gray-700 font-bold mb-2">Owner Alternate Contact Number:</label>
                            <input type="text" id="ownerAlternateContactNumber" value={ownerAlternateContactNumber} onChange={(e) => setOwnerAlternateContactNumber(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="bhk" className="block text-gray-700 font-bold mb-2">BHK:</label>
                            <input type="number" id="bhk" value={bhk} onChange={(e) => setbhk(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="size" className="block text-gray-700 font-bold mb-2">Size (sqft):</label>
                            <input type="number" id="size" value={size} onChange={(e) => setSize(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="bathrooms" className="block text-gray-700 font-bold mb-2">Bathrooms:</label>
                            <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="bedrooms" className="block text-gray-700 font-bold mb-2">Bedrooms:</label>
                            <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="kitchen" className="block text-gray-700 font-bold mb-2">kitchen:</label>
                            <input type="number" id="kitchen" value={kitchen} onChange={(e) => setkitchen(e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>








                    <div className="grid grid-cols-1">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image:</label>
                        <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListProperty;

