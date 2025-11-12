import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Footer";
import Navbar from "../Pages/Home/Navbar/Navbar";
import TestimonialSection from "../Pages/Home/TestMonial";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
             <TestimonialSection/>
            <Footer/>
        </div>
    );
};

export default MainLayout;