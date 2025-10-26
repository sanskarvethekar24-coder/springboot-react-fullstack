import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white text-gray-800 px-6 py-3 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://i.pinimg.com/originals/56/5c/2a/565c2a824c7c184e326c751a0fb7e73e.png"
            alt="Airbnb Logo"
            className="w-10 h-10 md:w-12 md:h-12"
            style={{
              filter:
                "invert(50%) sepia(100%) saturate(600%) hue-rotate(100deg) brightness(90%) contrast(90%)",
            }}
          />
          <span className="text-2xl md:text-3xl font-bold text-[#00A86B]">
            HotelBooking
          </span>
        </Link>

        {/* Desktop Links + Profile */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          <Link
            to="/login"
            className="px-3 py-1 md:px-4 md:py-2 border border-gray-800 rounded hover:bg-gray-200 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 md:px-4 md:py-2 border border-gray-800 rounded hover:bg-gray-200 transition-colors duration-300"
          >
            Register
          </Link>
          <Link to="/profile">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-800 hover:border-[#00A86B] transition-all duration-300 cursor-pointer">
              <FaUser className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 bg-white rounded-lg p-4 space-y-2 shadow-md">
          <Link
            to="/login"
            className="block text-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Register
          </Link>
          <Link
            to="/profile"
            className="block text-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
