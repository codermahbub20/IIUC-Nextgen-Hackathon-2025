import React from 'react';
import { Check } from 'lucide-react';
import bgImage from '../../../../assets/Home/Group 1171275022.png';

interface PricingPlan {
  id: string;
  name: string;
  isPopular?: boolean;
  setupPrice: string;
  monthlyPrice?: string;
  description: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  onChoosePlan: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onChoosePlan }) => {
  return (
    <div className="relative bg-transparent bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-3xl p-8 sm:p-10 flex flex-col h-full hover:border-gray-600 transition-all duration-300">
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gray-800 text-gray-200 px-6 py-2 rounded-full text-sm font-medium border border-gray-600">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-white text-2xl font-bold mb-6 tracking-wide">
        {plan.name}
      </h3>

      {/* Pricing */}
      <div className="mb-6">
        <div className="text-white text-3xl font-bold mb-2">
          {plan.setupPrice} <span className="text-xl font-normal">one-time setup</span>
        </div>
        {plan.monthlyPrice && (
          <div className="text-white text-2xl font-semibold">
            + {plan.monthlyPrice}<span className="text-lg font-normal">/month</span>
          </div>
        )}
        {!plan.monthlyPrice && (
          <div className="text-white text-2xl font-semibold">
            Custom/Month
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-base leading-relaxed mb-8">
        {plan.description}
      </p>

      {/* Choose Plan Button */}
      <button
        onClick={() => onChoosePlan(plan.id)}
        className="w-full bg-transparent border-2 border-gray-600 text-white py-4 rounded-2xl text-base font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 mb-8"
      >
        Choose Plan
      </button>

      {/* Features List */}
      <div className="space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <span className="text-gray-200 text-base leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      setupPrice: '£899',
      monthlyPrice: '£99',
      description: 'Small businesses taking their first step into automation',
      features: [
        'Up to 3 automated workflows',
        'Basic integration with existing tools',
        'Email support',
        'Monthly performance report',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      isPopular: true,
      setupPrice: '£1,999',
      monthlyPrice: '£249',
      description: 'Growing teams looking to scale efficiency',
      features: [
        'Up to 10 automated workflows',
        'Multi-platform integrations (CRM, marketing, HR, etc.)',
        'Quarterly optimisation reviews',
        'Priority support',
        'Real-time dashboard',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      setupPrice: 'Custom/Month',
      description: 'Large organisations needing fully custom automation',
      features: [
        'Unlimited workflows',
        'Bespoke automation design',
        'Advanced AI integration',
        'Dedicated account manager',
        'On-site or remote training',
        'Continuous optimisation and monitoring',
      ],
    },
  ];

  const handleChoosePlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Add your plan selection logic here
  };

  return (
    <div style={{
            backgroundImage: `url(${bgImage})`,
          }} className="min-h-screen  py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onChoosePlan={handleChoosePlan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;