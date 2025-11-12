import logo from '../../../assets/Home/Group 1171275020.png';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Footer = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100, 
    });
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Navigation */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div data-aos="fade-up"  className="mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2 relative">
                <img src={logo} alt="" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">OrbitOps</div>
                <div className="text-xs text-gray-600">
                  by <span className="font-semibold">kmg</span>
                  <span className="text-gray-400">marketinggroup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav data-aos="fade-up"  className="flex flex-wrap justify-center gap-8 mb-6">
            <a href="#about" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Contact
            </a>
            <a href="#blog" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Blog
            </a>
            <a href="#login" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Login
            </a>
            <a href="#signup" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Sign Up
            </a>
          </nav>

          {/* Description */}
          <p className="text-center text-gray-600 text-sm max-w-3xl mb-6">
            OrbitOps is a future-focused tech partner, delivering intelligent systems, software, and AI solutions that help businesses work smarter and grow faster. Powered by Kazi Marketing Group.
          </p>

          {/* Phone Button */}
          <a 
            href="tel:0123456789" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            (01) 2345 6789
          </a>
        </div>

        {/* Bottom Bar */}
        <div data-aos="fade-up"  className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>Copyright ©2025 OrbitOps |</span>
              <span className="font-semibold text-gray-900">Powered by kmg</span>
              <span className="text-gray-400">marketinggroup</span>
            </div>
            <div className="flex gap-8">
              <a href="#privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-gray-900 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;