import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between">
        <div className="footer-links">
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3 className="text-lg font-bold mb-2">Social</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;