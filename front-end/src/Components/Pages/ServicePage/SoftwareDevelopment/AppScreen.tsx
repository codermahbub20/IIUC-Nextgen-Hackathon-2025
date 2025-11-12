

export default function AppScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Content */}
        <div className="space-y-2">
          <h1 className="text-black text-xl font-bold ">
            Seamless Across Every Screen
          </h1>
          
          <p className="text-gray-700 text-sm leading-relaxed">
            In today's mobile-first world, your software needs to work perfectly on any device — from desktops to smartphones and tablets. At OrbitOps, we design with responsive principles from day one, ensuring your users enjoy the same speed, clarity, and functionality no matter where they access your product. This means higher engagement, better accessibility, and a consistent brand experience everywhere.
          </p>

          <div className="space-y-1 pt-4">
            <p className="text-gray-800 text-sm leading-relaxed">
              Adaptive Design – Fluid layouts that adjust to any screen size.
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              Performance Optimised – Fast load times for mobile networks.
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              Touch-Friendly Interfaces – Smooth navigation for all users.
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              Cross-Browser Compatibility – Reliable performance on all major browsers.
            </p>
          </div>
        </div>

        {/* Right Side - Animated Phone Mockups */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Phone 1 */}
          

          {/* Phone 2 - Center */}
          <div className="animate-float-medium z-20">
            <div className="bg-black rounded-[3rem] p-3 shadow-2xl w-64">
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                <img 
                  src="https://static.wixstatic.com/media/f95d09_84ffd546f5c94d968722f8ebe86f95f9~mv2.png/v1/fill/w_846,h_535,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/f95d09_84ffd546f5c94d968722f8ebe86f95f9~mv2.png" 
                  alt="Mobile App Screen 2"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-25px) rotate(-6deg);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(0deg);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px) rotate(6deg);
          }
          50% {
            transform: translateY(-20px) rotate(6deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 3.5s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}