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
import CareerBot from "../Components/Dashboard/CareerBot";
import CVAssistant from "../Components/Dashboard/CVAssistant";
import CareerRoadmapGenerator from "../Components/Dashboard/CareerRoadmap";
import SkillGapAnalysis from "../Components/Dashboard/SkillgapAnalysis";
import Index from "../Components/ChatBot/Index";
// import CareerBot from "../Components/Dashboard/ChatGptWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  // ✅ Dashboard Layout Route
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "resume-build", element: <ResumeBuild /> },
      { path: "careerbot", element: <CareerBot /> },
      { path: "cvassistant", element: <CVAssistant /> },
    ]
  }
  
      {
        index: true, 
        element: <Dashboard />,
      },
      {
        path: "career-roadmap",
        element: <CareerRoadmapGenerator />,
      },
      {
        path: "skill-gap",
        element: <SkillGapAnalysis />,
      },
      {
        path: "resources", 
        element: <Resources />,
      },
      {
        path:"chatbot",
        element:<Index/>
      }
    ],
  },
]);
