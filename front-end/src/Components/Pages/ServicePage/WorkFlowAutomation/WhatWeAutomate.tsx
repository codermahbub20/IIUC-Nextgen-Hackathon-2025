/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const WhatWeAutomate: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    console.log('Video playing...');
    // Add your video play logic here
  };

  return (
    <div className="w-full bg-gray-50 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-gray-700 text-2xl  font-bold mb-6 sm:mb-8">
              What We Automate?
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Automation is not just about replacing manual work — it's about rethinking how your business operates for maximum efficiency. At OrbitOps, we help organisations connect systems, streamline processes, and unlock new capacity by removing bottlenecks and repetitive tasks. Here are some of the workflows we can transform for you:
            </p>
          </div>

          {/* Right Column - Video/Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={handlePlayVideo}>
              {/* Main Image */}
              <img 
                src="https://static.wixstatic.com/media/f95d09_1c29cc4cac98461e84d889e1fde6a4d8~mv2.png/v1/fill/w_782,h_397,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f95d09_1c29cc4cac98461e84d889e1fde6a4d8~mv2.png" 
                alt="Person working with automation dashboard"
                className="w-full h-auto aspect-video object-cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Decorative Tech Overlay (Optional) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Decorative Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeAutomate;