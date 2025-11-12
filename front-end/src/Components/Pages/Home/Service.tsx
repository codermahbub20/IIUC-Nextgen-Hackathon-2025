import  { useEffect } from "react";
import {
  ArrowRight,
  Cog,
  PenTool,
  Zap,
  Layers,
  BarChart3,
  Brain,
} from "lucide-react";

import "aos/dist/aos.css";
import Aos from "aos";

const services = [
  {
    title: "Workflow Automation",
    description: "Save time and reduce manual work with smart automation flows.",
    icon: Zap,
  },
  {
    title: "Software Development",
    description: "Custom web and mobile apps tailored to your business needs.",
    icon: Cog,
  },
  {
    title: "Product Design (UI/UX)",
    description:
      "User-centred design that looks great and performs even better.",
    icon: PenTool,
  },
  {
    title: "AI Consultancy & Tools",
    description:
      "Leverage artificial intelligence to work faster, smarter and more strategically.",
    icon: Brain,
  },
  {
    title: "System Integration",
    description:
      "Seamless connections between the tools you already use.",
    icon: Layers,
  },
  {
    title: "Data & Insights Dashboards",
    description:
      "Turn raw data into clear, actionable insights with custom dashboards.",
    icon: BarChart3,
  },
];

const ServicesSection = () => {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      offset: 100, 
    });
  }, []);

  return (
    <section className="relative mt-8 text-gray-800 bg-gray-50">
      
      {/* Main container */}
      <div data-aos="fade-up" className="relative bg-white px-6 md:px-12 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Intelligent Solutions That Orbit Around You
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            At OrbitOps, we design and build intelligent systems that help
            businesses scale smarter. From workflow automation and bespoke
            software development to product design and AI consultancy, we
            deliver end-to-end solutions that simplify operations, enhance user
            experiences, and unlock growth. Whether you're a start-up or a
            growing enterprise, we combine human-centred design with
            cutting-edge technology to transform the way you work – efficiently,
            intelligently, and effortlessly.
          </p>
        </div>

        {/* Subheading */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-2">What We Offer</h3>
          <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
            Smart solutions for modern businesses. From automation to AI, our
            services are built to simplify, streamline, and scale.
          </p>
        </div>

        {/* Services grid */}
        <div className=" mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
              data-aos="fade-up"
                key={service.title}
                className="group relative rounded-xl p-6 transition-all duration-300 bg-white shadow-xl  flex flex-col min-h-[200px]"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 mb-6">
                  <h4 className="font-bold text-base mb-3 leading-snug text-gray-900">
                    {service.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Read More button */}
                <div className="flex">
                  <button
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:gap-3 group/btn"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>Read More</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;