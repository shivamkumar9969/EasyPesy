// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Pic1 from '../images/Pic1.jpg';
import Pic2 from '../images/Pic2.jpg';
import Pic3 from '../images/Pic3.jpg';

const LandingPage = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000 // adjust as needed
  };

  return (
    <div className="w-full h-full bg-[#fcfcfc] flex flex-col justify-between">

      <div className='w-1/2 h-1/2'>
        <div className=''>
          <Slider {...settings}>
            <div>
              <img src={Pic1} className=' object-cover rounded-lg' alt="Pic1" />
            </div>
            <div>
              <img src={Pic2} className=' object-cover rounded-lg' alt="Pic2" />
            </div>
            <div>
              <img src={Pic3} className=' object-cover rounded-lg' alt="Pic3" />
            </div>
          </Slider>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center px-4'>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Rental</h1>
          <p className="text-stone-800 mb-8">
            Browse through thousands of properties and book your dream rental with ease.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4">
            <Link to="/rent-property" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Rent a Property
            </Link>
            <Link to="/list-property" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              List Your Property
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
