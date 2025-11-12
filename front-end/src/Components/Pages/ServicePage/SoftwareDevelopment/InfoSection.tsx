
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Info() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Content */}
        <div className="space-y-8">
          <h1 className="text-white text-2xl font-bold">Key Benefits</h1>
          
          <ul className="space-y-6">
            <li className="text-gray-300 text-base leading-relaxed flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span><strong className="text-white">Tailored to You</strong> - Every line of code is written with your goals in mind.</span>
            </li>
            <li className="text-gray-300 text-base leading-relaxed flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span><strong className="text-white">Built to Scale</strong> – Solutions that grow with your business.</span>
            </li>
            <li className="text-gray-300 text-base leading-relaxed flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span><strong className="text-white">Secure & Compliant</strong> – Security-first development to protect your data.</span>
            </li>
            <li className="text-gray-300 text-base leading-relaxed flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span><strong className="text-white">Future-Proof</strong> – Flexible architecture ready for tomorrow's needs.</span>
            </li>
          </ul>

          <Link to="/contact" className="mt-2">
          <button  className="bg-white text-black px-8 py-4 mt-2 rounded-full flex items-center gap-3 text-lg font-medium hover:bg-gray-100 transition-colors group">
            <span className="underline">Connect with us</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
        </div>

        {/* Right Side - Animated Dashboard Image */}
        <div className="relative flex items-center justify-center">
          <div className="animate-float">
            <img 
              src="https://static.wixstatic.com/media/f95d09_6d75c5c1570841c5a3066d335ff11f6c~mv2.png/v1/fill/w_860,h_574,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Grousp%201171275044.png" 
              alt="Analytics Dashboard"
              className="rounded-2xl shadow-2xl w-full max-w-2xl"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}