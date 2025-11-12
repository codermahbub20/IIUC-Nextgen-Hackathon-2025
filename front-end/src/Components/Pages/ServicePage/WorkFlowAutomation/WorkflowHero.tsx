

export default function WorkflowHero() {
  return (
    <>
      {/* Workflow Automation Hero Section */}
      <div className="relative h-[150vh] p-16 overflow-hidden">
        {/* Background Image with Overlay - Fixed Position */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('https://static.wixstatic.com/media/f95d09_68421cd455354f0f9e2ff3966d82942f~mv2.png/v1/fill/w_1916,h_1293,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/f95d09_68421cd455354f0f9e2ff3966d82942f~mv2.png')",
          }}
        >
         
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8">
          {/* Header Text */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-4xl">
            <h1 className="text-white text-xl  font-bold mb-4 sm:mb-6 leading-tight">
              Workflow Automation: Work Smarter. Scale Faster.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed px-4">
              Streamline repetitive tasks, eliminate human error, and free your team to focus on what matters most — growth, innovation, and customer experience.
            </p>
          </div>

          {/* Animated Dashboard Mockup */}
          <div className="w-full max-w-6xl mt-8  px-4">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-float-dashboard">
              <img 
                src="https://static.wixstatic.com/media/f95d09_f0d08f6a655743c1a454a5f8f112879d~mv2.png/v1/fill/w_1319,h_853,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/f95d09_f0d08f6a655743c1a454a5f8f112879d~mv2.png" 
                alt="Dashboard Interface"
                className="w-full h-[550px] "
              />
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes float-dashboard {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        .animate-float-dashboard {
          animation: float-dashboard 4s ease-in-out infinite;
        }

        /* Ensure fixed background works on mobile */
        @media (max-width: 768px) {
          .bg-fixed {
            background-attachment: scroll;
          }
        }
      `}</style>
    </>
  );
}