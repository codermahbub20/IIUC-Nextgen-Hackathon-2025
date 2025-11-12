import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import naveImage from '../../../../assets/Home/Group 1171275019.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white text-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center py-2">
            <Link to="/">
              <img 
                src={naveImage}
                alt="OrbitOps Logo" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition">
              About Us
            </Link>
            
            

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ">
                <div className="py-1 ">
                  <Link
                    to="/services/software-development"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Software Development
                  </Link>
                  <Link
                    to="/services/workflow-automation"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Workflow Automation
                  </Link>
                  <Link
                    to="/services/system-integration"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                   System Integration
                  </Link>
                  <Link
                    to="/services/data-insight-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                   Data & Insight Dashboard
                  </Link>
                  <Link
                    to="/services/ai-consultancy-tool"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                  Ai Consultancy Tool
                  </Link>
                  <Link
                    to="/services/product-ui-ux-design"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                  product UI UX Design
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition">
              Contact
            </Link>
            <Link to="/careers" className="text-gray-700 hover:text-gray-900 transition">
              Careers
            </Link>

            <Link to="/book-appointment">
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Book an Appointment
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/about/our-story"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/about/team"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/about/careers"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/services/consulting"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Consulting
                  </Link>
                  <Link
                    to="/services/development"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Development
                  </Link>
                  <Link
                    to="/services/support"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Support
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="px-4 pt-2">
              <Link to="/book-appointment" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                  Book an Appointment
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;