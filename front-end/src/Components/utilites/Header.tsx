/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import profile from "../../assets/Profiles/avatar1.jpg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/features/users/usersApi";






// --- Main Header Component ---
const Header2 = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
 
const dispatch = useAppDispatch();
  const avatarDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);
  

   const { user } = useSelector((state: any) => state.auth);
    console.log("User from Redux:", user);
  
    // RTK Query hooks
    const { data: clientData} = useGetUserQuery(user?.id);

    const userName = user?.email || "User Name";
  

    const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("authToken");
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAvatarOpen(false);
      }
      if (
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(event.target as Node)
      ) {
        // setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Left */}
          <a
            href="#"
            className="flex items-center gap-2 flex-shrink-0 text-gray-900 dark:text-gray-100"
          >
          </a>
        </div>
      </div>

      {/* Right Section Fixed */}
      <div className="fixed top-0 right-0 h-16 flex items-center gap-4 pr-6 z-50">
       

        

        

        {/* Avatar */}
        <div className="relative hidden sm:block" ref={avatarDropdownRef}>
  <button
    onClick={() => setIsAvatarOpen(!isAvatarOpen)}
    className="flex items-center gap-2"
  >
    <img
      src={clientData?.data?.profilePic || profile} // Fallback if no profile pic
      alt="User avatar"
      width={60}
      height={60}
      className="h-10 w-10 rounded-lg object-cover"
    />
  </button>

  {isAvatarOpen && (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="flex flex-col items-center p-4">
        <img
          src={clientData?.data?.profilePic || profile}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mb-3"
        />
        {/* <h3 className="text-lg font-semibold">
          {clientData?.data?.fullName || "User Name"}
        </h3> */}
        <p className="text-gray-500 text-sm">
          { userName|| "Kaji Marketing Group"}
        </p>

       

        <Link to="/dashboard/settings">
          <button className="mt-4 bg-black text-white px-5 py-2 rounded-lg w-full">
            Edit Profile
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={handleLogout}
            className="mt-3 text-gray-500 hover:underline"
          >
            Log off
          </button>
        </Link>
      </div>
    </div>
  )}
</div>

      </div>
    </header>
  );
};

export default Header2;
