import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

const OnboardingTimeline: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Apply Online',
      description: 'Tell us about yourself and share your CV/portfolio.',
    },
    {
      number: 2,
      title: 'Intro Call',
      description: "We'll learn more about your goals and tell you about ours.",
    },
    {
      number: 3,
      title: 'Skills Review',
      description: 'You may be asked to complete a short task.',
    },
    {
      number: 4,
      title: 'Final Interview',
      description: 'Meet the team and explore how we can grow together.',
    },
    {
      number: 5,
      title: 'Join the Team',
      description: "We'll kick off your onboarding and set you up for success.",
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 sm:mb-10 lg:mb-10">
          From Application to Onboarding
        </h2>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-400" style={{ left: '10%', right: '10%' }} />
            
            {/* Steps */}
            <div className="flex justify-between items-start relative">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center" style={{ flex: '1' }}>
                  {/* Circle */}
                  <div className="w-20 h-20 rounded-full border-4 border-gray-900 bg-white flex items-center justify-center mb-6 relative z-10">
                    <span className="text-xl font-bold text-gray-900">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center max-w-xs">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 w-0.5 h-full bg-gray-400" style={{ height: 'calc(100% + 2rem)' }} />
              )}
              
              <div className="flex items-start gap-6">
                {/* Circle */}
                <div className="w-20 h-20 rounded-full border-4 border-gray-900 bg-white flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="text-3xl font-bold text-gray-900">{step.number}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingTimeline;