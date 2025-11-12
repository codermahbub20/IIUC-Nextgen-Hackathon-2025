

const PricingSection = () => {
  const pricingPlans = [
    {
      name: 'Connect',
      price: 'From £1,499',
      description: 'Small businesses linking 2–3 core systems',
      popular: false,
      features: [
        'Up to 3 integrations',
        'Basic data synchronisation',
        'API-based connections',
        'Email support',
        '30 days post-launch support'
      ]
    },
    {
      name: 'Sync',
      price: 'From £3,999',
      description: 'Medium-sized teams needing multiple platform integrations',
      popular: true,
      features: [
        'Up to 8 integrations',
        'Advanced automation workflows',
        'Real-time data synchronisation',
        'Priority support',
        '90 days post-launch support'
      ]
    },
    {
      name: 'Masterpiece',
      price: 'Custom Quote',
      description: 'Large-scale products requiring comprehensive design systems',
      popular: false,
      features: [
        'Unlimited integrations',
        'Complex, multi-system architecture',
        'Enterprise-grade security',
        'Dedicated account manager',
        'Ongoing optimisation & monitoring'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-16">
          System Integration Pricing
        </h1>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col relative hover:shadow-xl transition-shadow duration-300"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-6 right-6">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-4">
                <h3 className="text-lg font-normal text-gray-700 mb-2">
                  {plan.name}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {plan.price}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 min-h-[3rem]">
                {plan.description}
              </p>

              {/* Choose Plan Button */}
              <button className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 mb-8">
                Choose Plan
              </button>

              {/* Features List */}
              <ul className="space-y-4 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="mr-3 mt-1 flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="10" cy="10" r="3" />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;