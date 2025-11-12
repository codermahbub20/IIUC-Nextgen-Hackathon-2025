

const PricingCard = ({ title, price, description, features, isPopular = false }: { title: string; price: string; description: string; features: string[]; isPopular?: boolean }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col h-full relative">
      {isPopular && (
        <div className="absolute -top-4 right-8">
          <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-gray-700 text-lg mb-2">{title}</h3>
        <p className="text-black text-4xl font-bold">{price}</p>
      </div>

      <p className="text-gray-700 text-base mb-8 min-h-[60px]">
        {description}
      </p>

      <button className="w-full bg-black text-white py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors mb-8">
        Choose Plan
      </button>

      <ul className="space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-800 text-base">
            <span className="text-black mt-1 flex-shrink-0">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Launch",
      price: "From £2,499",
      description: "Start-ups & small businesses looking for an MVP or essential platform",
      features: [
        "Up to 5 core features/modules",
        "Mobile responsive design",
        "Basic integrations (e.g. payment gateway, email)",
        "1 design revision round",
        "30 days post-launch support"
      ],
      isPopular: false
    },
    {
      title: "Scale",
      price: "From £6,499",
      description: "Growing businesses needing advanced, scalable solutions",
      features: [
        "Up to 15 features/modules",
        "Mobile app or advanced web app",
        "API development & integrations",
        "3 design revision rounds",
        "90 days post-launch support",
        "Performance optimisation"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom Quote",
      description: "Large organisations needing fully custom automation",
      features: [
        "Unlimited features/modules",
        "Bespoke architecture & enterprise-level security",
        "Dedicated project manager",
        "On-site or remote training",
        "Continuous optimisation & monitoring",
        "Long-term maintenance contract options"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-black text-5xl font-bold">
            Software Development Pricing
          </h1>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </div>
  );
}