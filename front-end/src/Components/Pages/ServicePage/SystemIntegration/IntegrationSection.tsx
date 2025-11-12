
import { ArrowRight } from 'lucide-react';

const IntegrationSection = () => {
  const toolIcons = [
    { id: 1, icon: '⊕' },
    { id: 2, icon: 'N' },
    { id: 3, icon: '◔' },
    { id: 4, icon: 'N' },
    { id: 5, icon: 'lite' },
    { id: 6, icon: '✦' },
    { id: 7, icon: '◉' },
    { id: 8, icon: '⚡' },
    { id: 9, icon: '⌂' },
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <path d="M20 15 Q30 25 40 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M20 30 Q30 20 40 30" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M20 45 Q30 35 40 45" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      title: 'One Source of Truth',
      description: 'All your data in one place.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <path d="M15 30 Q15 15 30 15 Q45 15 45 30 Q45 35 40 38" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M25 28 L32 35 L45 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="30" y1="38" x2="30" y2="45" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="25" y1="45" x2="35" y2="45" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Increased Efficiency',
      description: 'Eliminate duplicate data entry & manual tasks.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <circle cx="18" cy="30" r="4" fill="currentColor"/>
          <circle cx="30" cy="20" r="4" fill="currentColor"/>
          <circle cx="42" cy="30" r="4" fill="currentColor"/>
          <circle cx="30" cy="40" r="4" fill="currentColor"/>
          <line x1="18" y1="30" x2="26" y2="22" stroke="currentColor" strokeWidth="2"/>
          <line x1="34" y1="22" x2="42" y2="30" stroke="currentColor" strokeWidth="2"/>
          <line x1="18" y1="30" x2="26" y2="38" stroke="currentColor" strokeWidth="2"/>
          <line x1="34" y1="38" x2="42" y2="30" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Real-Time Insights',
      description: 'Better decision-making with up-to-date information.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <circle cx="30" cy="30" r="4" fill="currentColor"/>
          <circle cx="15" cy="15" r="3" fill="currentColor"/>
          <circle cx="45" cy="15" r="3" fill="currentColor"/>
          <circle cx="15" cy="45" r="3" fill="currentColor"/>
          <circle cx="45" cy="45" r="3" fill="currentColor"/>
          <circle cx="30" cy="12" r="3" fill="currentColor"/>
          <circle cx="48" cy="30" r="3" fill="currentColor"/>
          <line x1="30" y1="30" x2="16" y2="16" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="30" x2="44" y2="16" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="30" x2="16" y2="44" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="30" x2="44" y2="44" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="30" x2="30" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="30" x2="48" y2="30" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Scalable Connections',
      description: 'Integrations that grow as your business expands.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Connect All Your Favourite Tools No Hassle,
          </h1>
          <h2 className="text-xl font-bold text-gray-900 mb-12">
            No Headaches
          </h2>

          {/* Tool Icons */}
          <div className="flex justify-center items-center gap-4 flex-wrap mb-16">
            {toolIcons.map((tool) => (
              <div
                key={tool.id}
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl font-bold hover:scale-110 transition-transform duration-200"
              >
                {tool.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6 text-gray-800">
                {feature.icon}
              </div>
              <h3 className="text-lg  text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
            Connect with us
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSection;