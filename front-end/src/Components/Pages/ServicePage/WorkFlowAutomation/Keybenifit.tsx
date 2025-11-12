import React from "react";

interface Benefit {
  number: string;
  title: string;
  description: string;
}

const KeyBenefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      number: "1",
      title: "Save Time",
      description:
        "Automate daily tasks so your team can focus on high-value work.",
    },
    {
      number: "2",
      title: "Cut Costs",
      description:
        "Reduce operational inefficiencies and labour expenses.",
    },
    {
      number: "3",
      title: "Boost Accuracy",
      description:
        "Minimise human error through precise, repeatable processes.",
    },
    {
      number: "4",
      title: "Scale with Ease",
      description:
        "Add workflows without increasing overhead.",
    },
  ];

  return (
    <section className="bg-[#0e0e0e] text-center py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-10">
          Key Benefits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center px-4 sm:px-6 py-4 md:py-6"
            >
              {/* Big background number */}
              <span className="absolute top-[40%] -translate-y-1/2 text-[100px] sm:text-[130px] md:text-[160px] font-extrabold text-[#1e1e1e] leading-none select-none">
                {benefit.number}
              </span>

              {/* Text content */}
              <div className="relative z-20 mt-[70px] sm:mt-[85px] md:mt-[100px]">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed max-w-[240px] sm:max-w-[260px] mx-auto">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;