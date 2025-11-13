import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  User, 
  LogOut, 
  Rocket, 
  Map, 
  ClipboardCheck, 
  Trophy, 
  MessageCircle, 
  TrendingUp, 
  Mic, 
  FileText, 
  Building2, 
  DollarSign, 
  Video, 
  Network, 
  Sparkles, 
  Zap, 
  Calendar, 
  Users, 
  Lightbulb, 
  Globe, 
  GitCompare,
  Menu,
  X
} from 'lucide-react';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface UserData {
  full_name: string;
  email: string;
}

const navigationItems: NavigationItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Daily Actions", url: "/daily-actions", icon: Calendar },
  { title: "Jobs", url: "/jobs", icon: Briefcase },
  { title: "Gig Marketplace", url: "/gig-marketplace", icon: Zap },
  { title: "Job Market Trends", url: "/job-market-trends", icon: TrendingUp },
  { title: "Applications", url: "/applications", icon: ClipboardCheck },
  { title: "Company Research", url: "/company-research", icon: Building2 },
  { title: "Compare Offers", url: "/compare-offers", icon: GitCompare },
  { title: "Resume Builder", url: "/resume-builder", icon: FileText },
  { title: "Success Stories", url: "/success-stories", icon: Trophy },
  { title: "Interview Prep", url: "/interview-prep", icon: Mic },
  { title: "Salary Negotiation", url: "/salary-negotiation", icon: DollarSign },
  { title: "Video Practice", url: "/video-practice", icon: Video },
  { title: "Career Simulator", url: "/career-simulator", icon: Sparkles },
  { title: "Career Roadmap", url: "/career-roadmap", icon: Map },
  { title: "Networking Hub", url: "/networking-hub", icon: Network },
  { title: "Cold Outreach", url: "/cold-outreach", icon: MessageCircle },
  { title: "Peer Matching", url: "/peer-matching", icon: Users },
  { title: "Hidden Skills", url: "/hidden-skills", icon: Lightbulb },
  { title: "Remote Readiness", url: "/remote-readiness", icon: Globe },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "AI Advisor", url: "/ai-advisor", icon: MessageCircle },
  { title: "Profile", url: "/profile", icon: User },
];

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/dashboard');
  
  // Mock user data - replace with your auth logic
  const user: UserData = {
    full_name: "John Doe",
    email: "john.doe@example.com"
  };

  const handleNavigation = (url: string) => {
    setCurrentPage(url);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
      {/* Sidebar for desktop and mobile */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-white/80 backdrop-blur-sm border-r border-slate-200/60
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="border-b border-slate-200/60 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">CareerLaunch</h2>
                <p className="text-xs text-slate-500">Your Path to Success</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.url;
                return (
                  <button
                    key={item.title}
                    onClick={() => handleNavigation(item.url)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 text-left
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
                          : 'text-slate-700 hover:bg-blue-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-200/60 p-4 bg-white/80 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-semibold text-sm">
                  {user.full_name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">
                  {user.full_name || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
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
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">CareerLaunch</h1>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Welcome to CareerLaunch
                  </h2>
                  <p className="text-slate-600">
                    Your comprehensive career development platform
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {navigationItems.slice(0, 8).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleNavigation(item.url)}
                      className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left"
                    >
                      <Icon className="w-7 h-7 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-600">
                        Explore {item.title.toLowerCase()}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  🚀 Quick Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-xs text-slate-600">Features</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">100%</div>
                    <div className="text-xs text-slate-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-slate-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">AI</div>
                    <div className="text-xs text-slate-600">Powered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;