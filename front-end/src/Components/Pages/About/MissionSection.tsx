

const MissionSection = () => {
  const stats = [
    { value: "15K", label: "TRUSTED REVIEWS" },
    { value: "98%", label: "CLIENT SATISFACTION" },
    { value: "10+", label: "COUNTRIES AHEAD" },
  ];

  const principles = [
    {
      number: "01.",
      title: "Clarity over Complexity",
      description: "We simplify the technical so you can stay focused on what matters.",
    },
    {
      number: "02.",
      title: "Purposeful Innovation",
      description: "We don't chase trends. We build what works and scales.",
    },
    {
      number: "03.",
      title: "Collaboration First",
      description: "Your goals drive our strategy.",
    },
    {
      number: "04.",
      title: "People + Tech",
      description: "True progress happens when human insight meets smart systems.",
    },
  ];

  return (
    <section className="w-full">
      {/* Top Section - Dark Background with Stats */}
      <div className="bg-gray-900 text-white px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-xl md:text-xl mb-1">
                Happy Customers. Real Results.
              </h2>
              <p className="text-gray-300 text-base md:text-sm leading-relaxed">
                We're proud to support forward-thinking teams, founders, and organisations 
                in transforming how they work and grow. Every number here reflects a project 
                with purpose and a partnership built on trust.
              </p>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-4xl md:text-2xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-semibold tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Light Background with Mission */}
      <div className="bg-gray-50 px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Mission Statement */}
            <div>
              <div className="mb-6 md:mb-8">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-gray-600 mb-4">
                  OUR MISSION
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  More Than Code.
                </h3>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  It's Intelligent Change.
                </h3>
              </div>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                At OrbitOps, our mission goes beyond building software. We're here to 
                create smarter systems, automate the manual, and design purposeful tech 
                that helps people and businesses unlock their full potential.
              </p>

              <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium text-sm md:text-base hover:bg-gray-800 transition-colors duration-300">
                Contact Us
              </button>
            </div>

            {/* Right: Principles List */}
            <div className="space-y-2">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex gap-4">
                    <span className="text-gray-400  text-sm flex-shrink-0">
                      {principle.number}
                    </span>
                    <div>
                      <h4 className="text-gray-900 text-sm mb-2">
                        {principle.title}
                      </h4>
                      <p className="text-gray-600 text-sm  leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;