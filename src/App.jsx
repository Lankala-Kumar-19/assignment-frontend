import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <Router>
      {/* Professional Navbar */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-orange-500">
                MyCompany
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="hover:text-orange-400 font-semibold transition"
              >
                Landing Page
              </Link>
              <Link
                to="/admin"
                className="hover:text-orange-400 font-semibold transition"
              >
                Admin Panel
              </Link>
              {/* Placeholder links */}
              <a
                href="#services"
                className="hover:text-orange-400 font-semibold transition"
              >
                Services
              </a>
              <a
                href="#about"
                className="hover:text-orange-400 font-semibold transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-orange-400 font-semibold transition"
              >
                Contact
              </a>
            </div>
            
            {/* Mobile Hamburger Menu Placeholder */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white focus:outline-none">
                {/* Here you can later add a mobile menu icon */}
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
