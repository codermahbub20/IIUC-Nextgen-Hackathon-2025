/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Briefcase, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/features/auth/authSlice';

// --- Utility: JWT Decoding ---

// This function decodes the payload of a JWT token
const decodeJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const Navbar: React.FC = () => {
  // --- State Management ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // --- Refs & Redux ---
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  
  const authState = useSelector((state: any) => state.auth);
  // Prefer the token directly from state, or fallback to nested structure
  const token = authState.token || authState.user?.data?.token; 
  
  const isLoggedIn = !!token;

  // --- Handlers & Helpers ---
  
  // Memoized function to close all menus
  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("authToken"); // Good practice to clear associated storage item
    setUserInfo(null);
    closeAllMenus();
  };

  // Helper functions to get display data from userInfo
  const getUserName = () => userInfo?.name || userInfo?.displayName || userInfo?.username || userInfo?.fullName || 'User';
  const getUserEmail = () => userInfo?.email || userInfo?.userEmail || '';
  const getUserPhoto = () => userInfo?.photoURL || userInfo?.photo || userInfo?.profilePicture || userInfo?.avatar || null;


  // --- Effects ---

  // 1. JWT Decoding Effect
  useEffect(() => {
    if (token) {
      const decoded = decodeJwt(token);
      console.log("Decoded token:", decoded);
      setUserInfo(decoded);
    } else {
      setUserInfo(null);
    }
  }, [token]);

  // 2. Click Outside Profile Menu Effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // --- JSX Rendering ---

  // --- Profile Dropdown Component (Desktop/Mobile) ---
  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50">
        <div className="px-4 py-3 border-b border-gray-100/70">
            <p className="text-sm font-semibold text-gray-900 truncate">
                {getUserName()}
            </p>
            {getUserEmail() && (
                <p className="text-xs text-gray-500 truncate">
                    {getUserEmail()}
                </p>
            )}
        </div>
        <div className="py-1">
            <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                onClick={closeAllMenus}
            >
                <LayoutDashboard className="w-4 h-4 mr-3 text-indigo-500" />
                Dashboard
            </Link>
            <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                onClick={closeAllMenus}
            >
                <User className="w-4 h-4 mr-3 text-emerald-500" />
                My Profile
            </Link>
            <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t mt-1"
            >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
            </button>
        </div>
    </div>
  );

  // --- Main Component Render ---
  return (
    <nav className="bg-white text-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <Link to="/" onClick={closeAllMenus} className="font-extrabold text-xl text-indigo-600 hover:text-indigo-800 transition">
            CareerPath AI
          </Link>

          {/* 2. Desktop Menu & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium transition flex items-center gap-1">
                <Briefcase className="w-4 h-4"/> Jobs
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-indigo-600 font-medium transition flex items-center gap-1">
                <BookOpen className="w-4 h-4"/> Resources
            </Link>

            {isLoggedIn ? (
              /* Desktop: Logged In User */
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-10 h-10 bg-indigo-500/10 text-indigo-600 rounded-full hover:bg-indigo-500/20 overflow-hidden transition ring-2 ring-indigo-300/50"
                  aria-label="Open profile menu"
                >
                  {getUserPhoto() ? (
                    <img 
                      src={getUserPhoto()!} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>
                {isProfileOpen && <ProfileDropdown />}
              </div>
            ) : (
              /* Desktop: Guest User */
              <Link to="/auth">
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30">
                  Login / Register
                </button>
              </Link>
            )}
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="p-2 text-gray-700 hover:text-indigo-600 focus:outline-none rounded-md transition"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-4 pt-2 border-t border-gray-100 bg-white shadow-inner">
          {isLoggedIn ? (
            /* Mobile: Logged In User Links */
            <div className="space-y-1 px-4 sm:px-6">
                <Link 
                    to="/dashboard" 
                    onClick={closeAllMenus} 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                >
                    <LayoutDashboard className="w-4 h-4 mr-3 text-indigo-500" />
                    Dashboard
                </Link>
                <Link 
                    to="/jobs" 
                    onClick={closeAllMenus} 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                >
                    <Briefcase className="w-4 h-4 mr-3" />
                    Jobs
                </Link>
                <Link 
                    to="/resources" 
                    onClick={closeAllMenus} 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                >
                    <BookOpen className="w-4 h-4 mr-3" />
                    Resources
                </Link>
                
                {/* Mobile Profile Section (Expanded) */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <button
                        onClick={toggleProfileMenu}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                        <span className="flex items-center">
                            {getUserPhoto() ? (
                            <img 
                                src={getUserPhoto()!} 
                                alt="Profile" 
                                className="w-6 h-6 rounded-full mr-2 object-cover ring-1 ring-indigo-400" 
                            />
                            ) : (
                            <User className="w-5 h-5 mr-2" />
                            )}
                            Profile Menu
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProfileOpen && (
                        <div className="pl-4 space-y-1 mt-1 bg-gray-50 rounded-lg">
                            <Link 
                                to="/profile" 
                                onClick={closeAllMenus} 
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                My Profile
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
          ) : (
            /* Mobile: Guest User Button */
            <div className="px-4 pt-2">
              <Link to="/auth" onClick={closeAllMenus}>
                <button className="w-full bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Login / Register
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