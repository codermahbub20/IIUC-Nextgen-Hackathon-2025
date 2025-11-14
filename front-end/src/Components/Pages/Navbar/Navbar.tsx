/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/features/auth/authSlice';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  
  // Get both user and token from Redux state
  const authState = useSelector((state: any) => state.auth);
  const { user, token } = authState;
  
  // Decode JWT token to get user info
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (token || user?.data?.token) {
      try {
        const tokenToUse = token || user?.data?.token;
        // Decode JWT token (payload is the middle part)
        const base64Url = tokenToUse.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        console.log("Decoded token:", decoded);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setUserInfo(null);
    }
  }, [user, token]);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("authToken");
    setUserInfo(null);
    closeAllMenus();
  };

  // Helper functions to get user data
  const getUserName = () => {
    if (!userInfo) return 'Welcome';
    return userInfo.name || userInfo.displayName || userInfo.username || userInfo.fullName || 'User';
  };

  const getUserEmail = () => {
    if (!userInfo) return '';
    return userInfo.email || userInfo.userEmail || '';
  };

  const getUserPhoto = () => {
    if (!userInfo) return null;
    return userInfo.photoURL || userInfo.photo || userInfo.profilePicture || userInfo.avatar || null;
  };

  // Check if user is logged in (has token)
  const isLoggedIn = !!(user?.data?.token || token || userInfo);

  return (
    <nav className="bg-white text-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={closeAllMenus} className="font-bold text-xl text-gray-900">
            CareerPath AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
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

                {/* Profile Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300 overflow-hidden transition"
                    aria-label="Open profile menu"
                  >
                    {getUserPhoto() ? (
                      <img 
                        src={getUserPhoto()!} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getUserName()}
                        </p>
                        {getUserEmail() && (
                          <p className="text-sm text-gray-500 truncate">
                            {getUserEmail()}
                          </p>
                        )}
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
              <Link to="/auth">
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-4 space-y-2 px-4 sm:px-6 lg:px-8">
          {isLoggedIn ? (
            <>
              <Link 
                to="/dashboard" 
                onClick={closeAllMenus} 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                Dashboard
              </Link>
              <Link 
                to="/jobs" 
                onClick={closeAllMenus} 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                Jobs
              </Link>
              <Link 
                to="/resources" 
                onClick={closeAllMenus} 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                Resources
              </Link>

              {/* Mobile Profile */}
              <div>
                <button
                  onClick={toggleProfileMenu}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  <span className="flex items-center">
                    {getUserPhoto() ? (
                      <img 
                        src={getUserPhoto()!} 
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
                    <div className="px-4 py-2 text-xs border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">{getUserName()}</p>
                      {getUserEmail() && (
                        <p className="text-gray-500 truncate">{getUserEmail()}</p>
                      )}
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={closeAllMenus} 
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
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
            <div className="px-4 pt-2">
              <Link to="/auth" onClick={closeAllMenus}>
                <button className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;