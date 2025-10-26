import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">HotelBooking</h3>
          <p className="text-gray-300">
            Book your stay easily with HotelBooking. Find the best hotels at
            the best prices with real-time availability and secure payments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="/" 
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/hotels" 
                className="text-green-400 hover:text-green-500 transition-colors duration-300"
              >
                Hotels
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="text-yellow-400 hover:text-yellow-500 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="text-pink-400 hover:text-pink-500 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300">123 Main Street, Pune, India</p>
          <p className="text-gray-300">Email: info@hotelbooking.com</p>
          <p className="text-gray-300">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-4 text-2xl">
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors duration-300"><FaFacebook /></a>
            <a href="#" className="text-sky-300 hover:text-sky-400 transition-colors duration-300"><FaTwitter /></a>
            <a href="#" className="text-pink-400 hover:text-pink-500 transition-colors duration-300"><FaInstagram /></a>
            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} HotelBooking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
