import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import AuthPage from "../Components/Auth/AuthPage/AuthPage";
import Jobs from "../Components/Pages/Jobs/Jobs";
import Resources from "../Components/Pages/Resources/Resources";
import Profile from "../Components/Pages/Profile/Profile";

import DashboardLayout from "../Components/DashBoardLayout/DashboardLayout";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import ResumeBuild from "../Components/Dashboard/ResumeBuild";
// import CareerBot from "../Components/Dashboard/CareerBot";
import CVAssistant from "../Components/Dashboard/CVAssistant";
import CareerRoadmapGenerator from "../Components/Dashboard/CareerRoadmap";
import SkillGapAnalysis from "../Components/Dashboard/SkillgapAnalysis";
import Index from "../Components/ChatBot/Index";
import JobTracker from "../Components/Dashboard/JobTracker";
import App from "../Components/Dashboard/Admin/JobManage";

export const router = createBrowserRouter([
  // ----------------------
  // 🌐 Public Routes
  // ----------------------
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <AuthPage /> },
      { path: "jobs", element: <Jobs /> },
      { path: "resources", element: <Resources /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  // ----------------------
  // 📊 Dashboard Routes
  // ----------------------
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      { path: "resume-build", element: <ResumeBuild /> },
      // { path: "careerbot", element: <CareerBot /> },
      { path: "job-tracker", element: <JobTracker /> },
      { path: "cvassistant", element: <CVAssistant /> },
      { path: "career-roadmap", element: <CareerRoadmapGenerator /> },
      { path: "skill-gap", element: <SkillGapAnalysis /> },
      { path: "resources", element: <Resources /> },
      { path: "chatbot", element: <Index /> },
      { path: "job-manage", element: <App /> },
    ],
  },
]);
