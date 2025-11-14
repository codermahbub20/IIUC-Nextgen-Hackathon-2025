import React, { useEffect } from "react";


import AOS from "aos";
import "aos/dist/aos.css";

const HeroBanner: React.FC = () => {


 

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (ms)
      once: true, // animate only once per scroll
      offset: 100, // trigger offset
    });
  }, []);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
     This Is Home Page
    </section>
  );
};

export default HeroBanner;
