/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Rocket,
  Menu,
  X,
  NotebookIcon,
  FocusIcon
} from 'lucide-react';
import { useGetUserQuery } from '../../redux/features/users/usersApi';
import { useSelector } from 'react-redux';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface DecodedToken {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

// --- Menu for users ---
const userMenu: NavigationItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Resume Build", url: "/dashboard/resume-build", icon: NotebookIcon },
  // { title: "CareerBot", url: "/dashboard/CareerBot", icon: NotebookIcon },
  { title: "CVAssistant", url: "/dashboard/cvassistant", icon: NotebookIcon },
  { title: "Career Roadmap", url: "/dashboard/career-roadmap", icon: FocusIcon },
  { title: "My Skill Gap", url: "/dashboard/skill-gap", icon: FocusIcon },
  { title: "Chat Assistant", url: "/dashboard/chatbot", icon: FocusIcon },
];

// --- Menu for admin ---
const adminMenu: NavigationItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
  { title: "Service Page", url: "/dashboard/service-page", icon: ServerCog },
 
];

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const authState = useSelector((state: any) => state.auth);
  const token =
    authState?.token || authState?.user?.data?.token || authState?.user?.token || null;

  const currentPage = location.pathname;

  // Decode JWT token
  useEffect(() => {
    if (!token) return setUserId(null);
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded: DecodedToken = JSON.parse(jsonPayload);
      setUserId(decoded.id || null);
    } catch (error) {
      console.error("Error decoding token:", error);
      setUserId(null);
    }
  }, [token]);

  // Fetch user data
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId || "", {
    skip: !userId,
  });

  const user = userData?.data || userData?.user || userData || {};
  const role = user?.role || "user";

  const displayName = user?.fullName || user?.name || "User";
  const displayEmail = user?.email || "user@example.com";
  const displayInitial = displayName[0]?.toUpperCase() || "U";

  const menuItems = role === "admin" ? adminMenu : userMenu;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleNavigation = (url: string) => {
    navigate(url);
    setIsSidebarOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-sm border-r border-slate-200/60
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="border-b border-slate-200/60 p-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">CareerLaunch</h2>
                  <p className="text-xs text-slate-500">Your Path to Success</p>
                </div>
              </div>
            </Link>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.url;
              return (
                <button
                  key={item.title}
                  onClick={() => handleNavigation(item.url)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left
                    ${isActive ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md" : "text-slate-700 hover:bg-blue-50"}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-200/60 p-4 bg-white/80 backdrop-blur-sm">
          <div className="space-y-3">
            {isUserLoading ? (
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse flex-shrink-0"></div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-semibold text-sm">{displayInitial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{displayName}</p>
                  <p className="text-xs text-slate-500 truncate">{displayEmail}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-start gap-2 px-4 py-2 text-sm border border-red-200 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen ml-72 overflow-y-auto">
        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200">
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">CareerLaunch</h1>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
