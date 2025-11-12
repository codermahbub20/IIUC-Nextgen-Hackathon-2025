import React from "react";

const SeamlessIntegration: React.FC = () => {
  return (
    <section className="relative bg-[#1a1a1a] py-24 sm:py-24 md:py-36 overflow-hidden">
      {/* Animated background image */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/f95d09_d0df7444dfd34469a25e9f6dd1feeab2~mv2.png/v1/fill/w_1893,h_637,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Group%201171277944.png')",
          backgroundSize: 'cover',
          animation: 'floatBackground 8s ease-in-out infinite',
        }}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/50" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <div className="w-10 h-1 bg-white rotate-45"></div>
              <div className="w-10 h-1 bg-white -rotate-45 absolute"></div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-6 leading-tight">
          Seamless System Integration for a Connected Business
        </h2>

        <p className="text-base  text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Break down silos and make your tools work as one. At OrbitOps, we
          connect your software, platforms, and data so your business runs
          smoother, faster, and smarter.
        </p>
      </div>

      <style>{`
        @keyframes floatBackground {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default SeamlessIntegration;