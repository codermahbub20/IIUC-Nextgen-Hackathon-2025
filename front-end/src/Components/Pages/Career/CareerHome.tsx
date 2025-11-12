import React from "react";

const CareerHome: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://static.wixstatic.com/media/f95d09_5ff33977240347fd8a4a201e9f4a7c27~mv2.jpg/v1/crop/x_0,y_28,w_3085,h_1474/fill/w_1898,h_915,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f95d09_5ff33977240347fd8a4a201e9f4a7c27~mv2.jpg"
          alt="Team of professionals"
          className="w-full h-full object-cover object-center"
        />
        {/* Optional overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fadeInUp">
        <h1 className="text-lg font-semibold text-black -mt-[160px] leading-tight tracking-tight">
          <span className="drop-shadow-lg">
            Shape the Future of AI, Automation & Design with OrbitOps
          </span>
        </h1>

        <p className="text-sm text-black max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed ">
          Join a team of innovators, problem-solvers, and creators who are
          passionate about building smarter businesses and delightful digital
          experiences.
        </p>
      </div>
    </section>
  );
};

export default CareerHome;
