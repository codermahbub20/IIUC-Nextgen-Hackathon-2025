import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import About from "../Components/Pages/About/About";
import ContactSection from "../Components/Pages/ContactPage/Contact";
import Career from "../Components/Pages/Career/Career";
import SoftwareDevelopment from "../Components/Pages/ServicePage/SoftwareDevelopment/SoftwareDevelopment";
import WorkFlowAutomation from "../Components/Pages/ServicePage/WorkFlowAutomation/WorkFlowAutomation";
import SystemIntegration from "../Components/Pages/ServicePage/SystemIntegration/SystemIntegration";




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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactSection/>,
      },
      {
        path: "/careers",
        element: <Career/>,
      },
      {
        path: "/services/software-development",
        element: <SoftwareDevelopment/>,
      },{
        path: "/services/workflow-automation",
        element: <WorkFlowAutomation/>,
      },
      {
        path: "/services/system-integration",
        element: <SystemIntegration/>,
      }
    ],
  }

]);
