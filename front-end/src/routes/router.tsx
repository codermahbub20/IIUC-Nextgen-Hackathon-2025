import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import AuthPage from "../Components/Auth/AuthPage/AuthPage";
import Jobs from "../Components/Pages/Jobs/Jobs";
import Resources from "../Components/Pages/Resources/Resources";
import Profile from "../Components/Pages/Profile/Profile";
import DashboardLayout from "../Components/DashBoardLayout/DashboardLayout";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";

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
      {
        index: true, 
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "resources", 
        element: <Resources />,
      },
    ],
  },
]);
