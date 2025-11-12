
import { Check } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const TestimonialSection = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100, 
    });
  }, []);
  const testimonials = [
    {
      quote: "OrbitOps transformed the way we work. Their team quickly understood our challenges and delivered an automation solution that saved us hours every week.",
      author: "Sophie M.",
      role: "Operations Manager, GrowthLab"
    },
    {
      quote: "We needed a partner who could help us innovate fast — OrbitOps delivered with speed, clarity, and serious attention to detail. A total game-changer.",
      author: "Junaid A.",
      role: "Co-Founder, BrightStack"
    },
    {
      quote: "The AI consultation was incredibly insightful. OrbitOps didn't just talk trends — they gave us practical tools we could implement straight away.",
      author: "Amira K.",
      role: "Director of Digital Strategy, NovaEdge"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-16">
          {/* Avatar Group */}
          <div data-aos="fade-right" className="flex -space-x-4">
            <div className="w-20 h-20 rounded-full border-4 border-gray-50 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
              <img className='rounded-full' src="https://static.wixstatic.com/media/34a173_e0b6c666a70243f2b3a3fce08eda5197~mv2.jpg/v1/fill/w_128,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/34a173_e0b6c666a70243f2b3a3fce08eda5197~mv2.jpg" alt="" />
            </div>
            <div className="w-20 h-20  rounded-full border-4 border-gray-50 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
              <img className='rounded-full'  src="https://static.wixstatic.com/media/34a173_2800026ebb76420cb1e1c8061c4369a7~mv2.jpg/v1/fill/w_128,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/34a173_2800026ebb76420cb1e1c8061c4369a7~mv2.jpg" alt="" />
            </div>
            <div className="w-20 h-20  rounded-full border-4 border-gray-50 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
              <img className='rounded-full'  src="https://static.wixstatic.com/media/34a173_cee1d33e631e4c3a9fc498cdfa7e9f1d~mv2.jpg/v1/fill/w_128,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/34a173_cee1d33e631e4c3a9fc498cdfa7e9f1d~mv2.jpg" alt="" />
            </div>
          </div>

          {/* Title */}
          <h2 data-aos="fade-up" className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Trusted by Forward-Thinking Leaders
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
            data-aos="fade-up"
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="text-6xl font-serif text-gray-900 mb-4 leading-none">
                ,,
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonial.author}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div data-aos="fade-up"  className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                Ready to Scale Smarter?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">On Demand Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">Seamless AI Technology</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Contact us
              </button>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900">4.80/5</div>
                <div className="text-sm text-gray-600">From 300+ Customer Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;