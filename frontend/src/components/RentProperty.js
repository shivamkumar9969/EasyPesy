import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BASE_URL = 'http://localhost:5000';

const RentProperty = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        bhk: '',
        bedrooms: '',
        propertyType: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/properties`, {
                    params: filters
                });
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('Failed to fetch properties. Please try again.');
            }
        };

        fetchProperties();

        // Check if the screen is mobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.toLowerCase();
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: filteredValue
        }));
    };

    return (
        <div className='flex flex-col w-full h-full items-center justify-center py-8 bg-gradient-to-br bg-[#fcfcfc]  text-stone-800 '>
            <div className="w-full bg-transparent p-3  mb-4 rounded-lg shadow-2xl mx-auto">
                <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex flex-wrap gap-3'}`}>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input type="text" name="location" id="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input type="number" name="minPrice" id="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input type="number" name="maxPrice" id="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="bhk" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input type="number" name="bhk" id="bhk" placeholder="BHK" value={filters.bhk} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input type="number" name="bedrooms" id="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <select name="propertyType" id="propertyType" value={filters.propertyType} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}>
                            <option value="">Select Property Type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Builder Floor">Builder Floor</option>
                            <option value="Villa">Villa</option>
                            <option value="Independent House">Independent House</option>
                            <option value="Studio Apartment">Studio Apartment</option>
                            {/* Add more property types as needed */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto">
                    {error && <p className="text-red-500 col-span-full">{error}</p>}
                    {properties.map(property => (
                        <div key={property._id} className="shadow-2xl rounded-lg p-4">
                            <div>
                                {property.imageUrls && property.imageUrls.length > 1 ? (
                                    <Slider dots infinite slidesToShow={1} slidesToScroll={1}>
                                        {property.imageUrls.map((imageUrl, index) => (
                                            <div key={index}>
                                                <img src={`${BASE_URL}${imageUrl}`} alt={`Image ${index}`} className="w-full h-48 object-cover mb-2 rounded-lg" />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : property.imageUrls && property.imageUrls.length === 1 ? (
                                    <div key={property._id}>
                                        <img src={`${BASE_URL}${property.imageUrls[0]}`} alt="Property Image" className="w-full h-48 object-cover mb-2 rounded-lg" />
                                    </div>
                                ) : (
                                    <div key={property._id}>No images available</div>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <h2 className="mt-4 text-lg flex pl-3 text-gray-700 mb-2"><strong>{property.title}</strong></h2>
                                <div className='flex flex-col'>
                                    <p className="text-gray-800 mb-2">{property.description}</p>
                                    <p className="text-gray-700 mb-2"><strong>Location:</strong> {property.propertyLocation}</p>
                                    <div className='flex justify-between'>
                                        <p className="text-gray-700 mb-2"><strong>Price:</strong> ₹{property.price}</p>
                                        <p className="text-gray-700"><strong>Size (sqft):</strong> {property.size}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700 mb-2"><strong>BHK:</strong> {property.bhk}</p>
                                        <p className="text-gray-700 mb-2"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                        <p className="text-gray-700 mb-2"><strong>Kitchen:</strong> {property.kitchen}</p>
                                    </div>
                                    <p className="text-gray-700 mb-2"><strong>Property Type:</strong> {property.propertyType}</p>
                                    <div className='flex justify-between'>
                                        <p className="text-gray-700 mb-2"><strong>Contact:</strong> {property.ownerContactNumber}</p>
                                        <p className="text-gray-700 mb-2"><strong>Alt. Contact:</strong> {property.ownerAlternateContactNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentProperty;
