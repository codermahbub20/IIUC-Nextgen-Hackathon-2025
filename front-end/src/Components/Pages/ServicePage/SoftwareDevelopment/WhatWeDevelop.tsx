import React from 'react';
import { Monitor, Smartphone, TrendingUp, Layers, ShoppingCart, Wifi} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <Icon className="w-12 h-12 text-black" strokeWidth={1.5} />
        </div>
        <div className="space-y-3">
          <h3 className="text-black text-lg font-semibold leading-tight">
            {title}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WhatWeDevelop() {
  const services = [
    {
      icon: Monitor,
      title: "Custom Web Applications",
      description: "Bespoke platforms for your unique workflows."
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "iOS & Android apps that engage your users anywhere."
    },
    {
      icon: TrendingUp,
      title: "Enterprise Software",
      description: "Large-scale solutions that unify operations."
    },
    {
      icon: Layers,
      title: "API Development & Integrations",
      description: "Connecting your systems seamlessly."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "Secure, user-friendly, and revenue-driven."
    },
    {
      icon: Wifi,
      title: "Cloud-Based Solutions",
      description: "Accessible, scalable, and cost-effective."
    }
  ];

  return (
    <div className="min-h-screen bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-2xl font-bold mb-6">
            What We Develope
          </h1>
          <p className="text-gray-300 text-sm max-w-4xl mx-auto">
            We design and deliver software that makes your business more efficient, competitive, and ready for growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}