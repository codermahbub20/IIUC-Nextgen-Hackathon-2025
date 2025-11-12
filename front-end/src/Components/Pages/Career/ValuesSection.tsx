import React from "react";

interface ValueCardProps {
  icon: string;
  title: string;
  items: string[];
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, items }) => (
  <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col gap-4 shadow-lg">
    <div className="flex items-center gap-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="text-sm leading-relaxed space-y-3">
      {items.map((item, index) => (
        <p
          key={index}
          className="border-b border-gray-700 pb-2 last:border-none"
        >
          {item}
        </p>
      ))}
    </div>
  </div>
);

const ValuesSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-20 text-gray-800">
      {/* FIRST ROW */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left Card */}
        <ValueCard
          icon="📖"
          title="Be Transparent"
          items={[
            "We're open to feedback, perspectives, and change.",
            "Clarity builds trust, and trust builds success.",
            "We share insights, not secrets.",
            "We believe in honesty with our clients & with each other.",
          ]}
        />

        {/* Center Text */}
        <div className="text-center flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">
            How We Think, Work and Win
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-[320px] text-base">
            At OrbitOps, we believe that great ideas come from curious minds,
            open collaboration, and a drive to make things better. Our approach
            blends strategic thinking, creative problem-solving, and
            cutting-edge technology to deliver results that truly matter.
          </p>
        </div>

        {/* Right Card */}
        <ValueCard
          icon="🏆"
          title="Win as One"
          items={[
            "We’re stronger together.",
            "Collaboration beats competition — every time.",
            "We value every voice on the team.",
            "When one of us grows, we all grow.",
          ]}
        />
      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <ValueCard
          icon="💖"
          title="Lead with Kindness"
          items={[
            "Everyone deserves respect — always.",
            "We can challenge each other and still care.",
            "We can be direct and kind.",
            "We believe kindness isn’t soft — it’s strong.",
          ]}
        />
        <ValueCard
          icon="🏀"
          title="Own It"
          items={[
            "If something needs fixing, we don’t wait — we move.",
            "We empower each other to lead with confidence.",
            "Every project, every detail, we treat like it’s our own.",
            "We take responsibility — for our wins and our lessons.",
          ]}
        />
        <ValueCard
          icon="⚡"
          title="Keep Creating"
          items={[
            "We stay curious, learn constantly, and never settle.",
            "Every project is a canvas for impact.",
            "We’re not afraid to explore new ideas and bold solutions.",
            "Creativity is at the heart of what we do.",
          ]}
        />
      </div>
    </section>
  );
};

export default ValuesSection;
