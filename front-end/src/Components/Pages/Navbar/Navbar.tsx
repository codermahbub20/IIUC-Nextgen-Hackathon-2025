/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
// Assuming your AuthProvider file exports both the context and the type
import { AuthContext } from '../../../Provider/AuthProvider'; 

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // --- Auth State from Context ---
  // We use useContext here and type it
  const { user, SignOutUser, logOutToast } = useContext(AuthContext) ;
  const navigate = useNavigate();



  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false); // Close profile menu when opening mobile menu
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    SignOutUser()
      .then(() => {
        closeAllMenus();
        if (logOutToast) logOutToast();
        navigate('/'); // Redirect to home after logout
      })
      .catch((error: any) => {
        console.error("Logout Error: ", error);
      });
  };

  return (
    <nav className="bg-white text-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center py-2">
            <Link to="/" onClick={closeAllMenus} className="flex-shrink-0">
              <span className="font-bold text-xl text-gray-900">CareerPath AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* --- LOGGED IN STATE --- */}
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition">
                  Dashboard
                </Link>
                <Link to="/jobs" className="text-gray-700 hover:text-gray-900 transition">
                  Jobs
                </Link>
                <Link to="/resources" className="text-gray-700 hover:text-gray-900 transition">
                  Resources
                </Link>
                
                {/* Profile Dropdown (Desktop) */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition overflow-hidden"
                    aria-label="Open profile menu"
                  >
                    {/* REQUIREMENT 1: Show profile pic if exists, else show icon */}
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.displayName || 'Welcome'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                          onClick={closeAllMenus}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // --- LOGGED OUT STATE ---
              <>
                {/* <Link to="/auth" className="text-gray-700 hover:text-gray-900 transition">
                  Login
                </Link> */}
                <Link to="/auth">
                  <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-4 space-y-2 px-4 sm:px-6 lg:px-8">
          {/* --- LOGGED IN (MOBILE) --- */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                onClick={closeAllMenus}
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                onClick={closeAllMenus}
              >
                Jobs
              </Link>
              <Link
                to="/resources"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                onClick={closeAllMenus}
              >
                Resources
              </Link>

              {/* Profile Accordion (Mobile) */}
              <div>
                <button
                  onClick={toggleProfileMenu}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  <span className='flex items-center'>
                    {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="Profile"
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 mr-2" />
                    )}
                    Profile
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                      onClick={closeAllMenus}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // --- LOGGED OUT (MOBILE) ---
            <>
              
              <div className="px-4 pt-2">
                <Link to="/auth" onClick={closeAllMenus}>
                  <button className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;