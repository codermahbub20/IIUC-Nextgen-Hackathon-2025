import React from "react";

interface Platform {
  name: string;
  description: string;
  logo: string;
}

const PlatformsSection: React.FC = () => {
  const platforms: Platform[] = [
    {
      name: "Intuit Quickbooks",
      description: "QuickBooks is an accounting software package developed and marketed by Intuit.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/QuickBooks_logo.svg/2560px-QuickBooks_logo.svg.png"
    },
    {
      name: "BigCommerce",
      description: "BigCommerce is a leading e-commerce software platform that provides startups and established companies",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bigcommerce-logo.svg/2560px-Bigcommerce-logo.svg.png"
    },
    {
      name: "NetSuite",
      description: "Make smarter, faster decisions using the world's most deployed cloud ERP solution.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/NetSuite_logo.svg/2560px-NetSuite_logo.svg.png"
    },
    {
      name: "Mailchimp",
      description: "Mailchimp makes it easy to sell stuff online, even if you don't have an e-commerce store.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mailchimp-Logo-2018.svg/2560px-Mailchimp-Logo-2018.svg.png"
    },
    {
      name: "Microsoft Excel",
      description: "Excel learns your patterns, organizing your data to save you time.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
    },
    {
      name: "Salesforce",
      description: "Salesforce offers a wide variet of CRM categories and systems to meet your needs, including Sales Cloud,",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png"
    }
  ];

  return (
    <section className="bg-[#0e0e0e] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 md:mb-16">
          Making Your Platforms Play Nicely Together
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 hover:border-[#3a3a3a] transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-6 h-16 flex items-center">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="max-h-12 max-w-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                {platform.name}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {platform.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;