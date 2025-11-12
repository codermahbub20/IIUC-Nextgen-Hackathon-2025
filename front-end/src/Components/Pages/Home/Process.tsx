import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ProcessSection: React.FC = () => {

  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100, 
      });
    }, []);

  const steps = [
    {
      title: "Discover",
      description: "We learn about your goals, challenges and systems.",
    },
    {
      title: "Design",
      description:
        "We create smart, user-friendly solutions tailored to your needs.",
    },
    {
      title: "Build",
      description:
        "We develop your system with speed, precision and security.",
    },
    {
      title: "Launch",
      description:
        "We help you go live, smoothly and confidently.",
    },
    {
      title: "Optimise",
      description:
        "We fine-tune for performance, insights and growth.",
    },
  ];

  return (
    <section className="relative bg-white  md:py-10">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-12">
          Our Process
        </h2>
<p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-12">
          Our process is built around clarity, collaboration, and outcomes. We start by understanding your goals, then design and build smart solutions tailored to your needs. From concept to launch — and beyond — we work closely with you to ensure every system we create delivers long-term value, efficiency, and growth.
        </p>
        {/* Timeline Wrapper */}
        <div className="relative">
          {/* Horizontal Line */}
          <div className="hidden md:block absolute top-[12px] left-0 w-full h-[2px] bg-[#0b1623]" />

          {/* Steps */}
          <div data-aos="fade-right" className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-0 justify-items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative"
              >
                {/* Dot */}
                <div className="w-6 h-6 bg-[#0b1623] rounded-full mb-6 z-10" />

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#0b1623] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 max-w-[200px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
