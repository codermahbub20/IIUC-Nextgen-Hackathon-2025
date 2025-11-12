import { useEffect } from 'react';
import bgImage from '../../../assets/Home/Group 1171275022.png';
import dashImage from '../../../assets/Home/qpTEokJ2wj7qJyA1739n1eqWPM.svg.png';

import AOS from "aos";
import "aos/dist/aos.css";

export default function OrbitOpsLanding() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100, 
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Diagonal Lines Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

       <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Text */}
        <div data-aos="fade-up"  className="text-center mb-16 max-w-5xl w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-bold text-white mb-8 tracking-tight">
            Build Smarter. Work Faster. Grow Further.
          </h1>
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto px-4">
            At OrbitOps, we craft intelligent systems that help modern businesses move faster and smarter. Whether you're automating workflows, 
            building custom software, or exploring AI, we bring together strategy, design, and tech to deliver solutions that scale with you. Our work is 
            not just about digital transformation — it's about creating real impact, every step of the way.
          </p>
        </div>

        {/* Features Grid - Exactly 3 columns on desktop */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Column - 2 Feature Cards */}
            <div className="space-y-6">
              {/* Human-Centred Card */}
              <div data-aos="fade-up"  className="  p-6 rounded-xl">
                <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Human-Centred, Tech-Driven
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We combine thoughtful design with powerful technology to create systems people actually love to use.
                </p>
              </div>

              {/* End-to-End Card */}
              <div className="  p-6 rounded-xl">
                <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  End-to-End Expertise
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  From strategy and design to development and integration — we handle the full journey, so you don't have to.
                </p>
              </div>
            </div>

            {/* Center Column - Dashboard Card */}
            <div data-aos="fade-up"  className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img src={dashImage} alt="" />
            </div>

            {/* Right Column - 2 Feature Cards */}
            <div className="space-y-6">
              {/* Future-Ready Card */}
              <div data-aos="fade-up"  className="  p-6 rounded-xl">
                <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Future-Ready Solutions
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We build with scalability and sustainability in mind, using automation and AI to future-proof your operations.
                </p>
              </div>

              {/* Collaborative Partnership Card */}
              <div className="  p-6 rounded-xl">
                <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Collaborative Partnership
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We don't just deliver projects — we build long-term relationships focused on your success and growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}