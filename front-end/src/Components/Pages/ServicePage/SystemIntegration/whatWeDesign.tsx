

const WhatWeDesignSection = () => {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <rect x="10" y="15" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="10" y="45" width="40" height="3" rx="1" fill="currentColor"/>
          <circle cx="30" cy="30" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M30 26 L30 30 L33 33" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      title: 'CRM & Sales',
      subtitle: 'Platforms',
      description: 'HubSpot, Salesforce, Zoho, and more.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <rect x="15" y="15" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M30 22 L30 30 L36 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="42" cy="22" r="3" fill="currentColor"/>
        </svg>
      ),
      title: 'Marketing',
      subtitle: 'Tools',
      description: 'Mailchimp, ActiveCampaign, HubSpot Marketing Hub.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <path d="M15 40 L30 25 L35 30 L45 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="20" y="35" width="4" height="10" rx="1" fill="currentColor"/>
          <rect x="28" y="30" width="4" height="15" rx="1" fill="currentColor"/>
          <rect x="36" y="32" width="4" height="13" rx="1" fill="currentColor"/>
        </svg>
      ),
      title: 'Accounting &',
      subtitle: 'Finance Tools',
      description: 'Xero, QuickBooks, Sage'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <path d="M20 25 L30 20 L40 25 L30 30 Z" fill="currentColor"/>
          <path d="M20 35 L30 30 L40 35 L30 40 Z" fill="currentColor"/>
          <path d="M20 35 L20 25" stroke="currentColor" strokeWidth="2"/>
          <path d="M40 35 L40 25" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'ERP',
      subtitle: 'Systems',
      description: 'SAP, Oracle, Microsoft Dynamics, NetSuite.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <path d="M18 22 L28 22 L28 28 L22 28 L22 38 L32 38 L32 32 L38 32 L38 42 L18 42 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="25" cy="25" r="2" fill="currentColor"/>
          <circle cx="35" cy="35" r="2" fill="currentColor"/>
        </svg>
      ),
      title: 'E-commerce',
      subtitle: 'Platforms',
      description: 'Shopify, WooCommerce, Magento.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" className="w-12 h-12" fill="currentColor">
          <circle cx="30" cy="30" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M20 30 Q25 20 30 30 Q35 40 40 30" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M20 30 Q25 40 30 30 Q35 20 40 30" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: 'Custom APIs &',
      subtitle: 'Legacy Systems',
      description: 'Bringing even older systems into your workflow.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            What We Design
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            We design and deliver software that makes your business more efficient, competitive, and ready for growth.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="text-gray-900 mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {service.title}
              </h3>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {service.subtitle}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDesignSection;