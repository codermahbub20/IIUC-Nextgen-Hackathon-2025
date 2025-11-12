

const MobileResponsivenessSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/f95d09_41efe74d807e4d4aa8aac375b4ec0c8d~mv2.png/v1/fill/w_1426,h_700,al_c,q_90,enc_avif,quality_auto/f95d09_41efe74d807e4d4aa8aac375b4ec0c8d~mv2.png')`,
        }}
      >
        {/* Dark Overlay - Stronger */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16">
          <div className="max-w-2xl">
            {/* Heading */}
            <h1 className="text-xl font-bold text-white mb-8 leading-tight">
              Mobile Responsiveness & Cross-Platform Functionality
            </h1>

            {/* Description */}
            <p className="text-lg  text-gray-300 mb-12 leading-relaxed">
              Every integration we build works across all devices and platforms. Whether your team is in the office or on the go, they can access connected tools with full functionality and real-time updates.
            </p>

            {/* CTA Button */}
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Notification Bell Icon (Top Right) */}
      <div className="absolute top-6 right-6 z-20">
        <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 border border-white/10">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileResponsivenessSection;