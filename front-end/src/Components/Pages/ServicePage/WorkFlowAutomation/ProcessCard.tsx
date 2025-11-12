

type ProcessCardProps = {
  number: number;
  title: string;
  description: string;
};

const ProcessCard = ({ number, title, description }: ProcessCardProps) => {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-semibold">{number}</span>
      </div>
      <h3 className="text-gray-800 text-xl font-semibold">
        {title}
      </h3>
      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default function WorkFlowProcess() {
  const processes = [
    {
      number: 1,
      title: "Sales & CRM processes",
      description: "We automate lead capture, follow-ups, and customer data management, ensuring no opportunity slips through the cracks and your sales team can focus on building relationships rather than updating spreadsheets."
    },
    {
      number: 2,
      title: "Marketing campaigns & lead nurturing",
      description: "From email drip sequences to social media posting and campaign tracking, we create marketing automation workflows that run 24/7, delivering the right message to the right audience at the right time."
    },
    {
      number: 3,
      title: "HR onboarding & payroll",
      description: "We streamline hiring, onboarding, and payroll processes, reducing admin time and improving employee experience. This includes automated contract generation, document collection, and salary processing."
    },
    {
      number: 4,
      title: "Inventory & order management",
      description: "Our solutions ensure stock levels, orders, and deliveries are tracked and updated in real time. This helps you reduce overstocking, prevent shortages, and keep customers happy with accurate order fulfilment."
    },
    {
      number: 5,
      title: "Customer support & ticketing",
      description: "We set up intelligent support systems that automatically log tickets, assign them to the right team member, and even provide AI-assisted responses to common queries — improving resolution times and satisfaction rates."
    },
    {
      number: 6,
      title: "Data collection & reporting",
      description: "We remove the pain of gathering and organising data from multiple sources by automating collection, analysis, and reporting, giving you accurate insights faster and with less effort."
    }
  ];

  return (
    <div className="bg-gray-50 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {processes.map((process) => (
            <ProcessCard
              key={process.number}
              number={process.number}
              title={process.title}
              description={process.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}