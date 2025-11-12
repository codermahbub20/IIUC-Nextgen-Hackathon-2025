import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import bannerVideo from "../../../assets/Home/banner-video.mp4"; 
import bannerCirclelogo from "../../../assets/Home/Group 1171275020.png";

import AOS from "aos";
import "aos/dist/aos.css";

const HeroBanner: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email submitted:", email);
    // Handle form submission logic here
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (ms)
      once: true, // animate only once per scroll
      offset: 100, // trigger offset
    });
  }, []);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 🎥 Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Optional dark overlay for better text visibility */}
        {/* <div className="absolute inset-0 bg-black/40"></div> */}
      </div>

      {/* 🌟 Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-20">
        {/* Logo */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div data-aos="fade-up" className="relative w-20 h-20 md:w-24 md:h-24">
            <img src={bannerCirclelogo} alt="OrbitOps Logo" />
          </div>
        </div>

        {/* Subtitle */}
        <p data-aos="fade-up" className="text-gray-300 text-xs sm:text-sm md:text-base mb-6 md:mb-8 tracking-wide">
          OrbitOps Powered by Kazi Marketing Group
        </p>

        {/* Heading */}
        <h1 data-aos="fade-up" className="text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight px-4">
          Smarter Systems. Designed for Growth.
        </h1>

        {/* Description */}
        <p data-aos="fade-up" className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
          AI, automation, software development and product design, built to streamline
          <br className="hidden sm:block" />
          your operations and scale your impact.
        </p>

        {/* Email Input */}
        <div className="max-w-xl mx-auto mb-8 md:mb-10 px-4">
          <div data-aos="fade-up" className="flex flex-col sm:flex-row gap-3 sm:gap-0 bg-white rounded-lg shadow-2xl overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-gray-900 transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white text-sm md:text-base">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span>On Demand Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span>Seamless AI Technology</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
