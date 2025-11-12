import React from 'react';

interface JobPosition {
  id: string;
  title: string;
  isRemote: boolean;
  description: string;
  skills: string;
  youreAFitIf: string;
  location: string;
  posted: string;
  deadline: string;
}

interface JobCardProps {
  job: JobPosition;
  onApply: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 pr-2">
          {job.title}
        </h3>
        {job.isRemote && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
            REMOTE
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-base leading-relaxed mb-4">
        {job.description}
      </p>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-gray-900 font-semibold text-sm sm:text-base mb-1">
          Skills:
        </p>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {job.skills}
        </p>
      </div>

      {/* You're a fit if */}
      <div className="mb-6">
        <p className="text-gray-900 font-semibold text-sm sm:text-base mb-1">
          You're a fit if:
        </p>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {job.youreAFitIf}
        </p>
      </div>

      {/* Spacer to push footer to bottom */}
      <div className="flex-grow"></div>

      {/* Job Details */}
      <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold text-sm sm:text-base">
            Location
          </span>
          <span className="text-gray-700 text-sm sm:text-base">
            {job.location}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold text-sm sm:text-base">
            Posted
          </span>
          <span className="text-gray-700 text-sm sm:text-base">
            {job.posted}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold text-sm sm:text-base">
            Deadline
          </span>
          <span className="text-gray-700 text-sm sm:text-base">
            {job.deadline}
          </span>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => onApply(job.id)}
        className="w-full bg-black text-white py-1 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors duration-300"
      >
        Apply Now
      </button>
    </div>
  );
};

const OpenPositions: React.FC = () => {
  const jobs: JobPosition[] = [
    {
      id: '1',
      title: 'Front End Developer',
      isRemote: true,
      description: "Bring designs to life & craft engaging, responsive interfaces. You'll collaborate with designers & back-end developers to deliver smooth, user-friendly digital experiences.",
      skills: 'HTML5, CSS3, JavaScript (ES6+), React, responsive design, Git.',
      youreAFitIf: "You're detail-oriented, care about clean code, & thrive on turning creative ideas into pixel-perfect, high-performance interfaces.",
      location: 'Anywhere in the World',
      posted: '15 hours ago',
      deadline: '31st August 2025',
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      isRemote: true,
      description: "Join our tech team to build and maintain high-performing web solutions across the stack. From sleek front-ends to robust back-ends, you'll help power OrbitOps's client platforms.",
      skills: 'JavaScript, React, Node.js, REST APIs, MongoDB, CMS (WordPress/Wix)',
      youreAFitIf: 'You write clean code, thrive on problem-solving, and love collaborating with designers & marketers.',
      location: 'Anywhere in the World',
      posted: '15 hours ago',
      deadline: '31st August 2025',
    },
    {
      id: '3',
      title: 'Junior Associate',
      isRemote: true,
      description: "Start your professional journey with us. You'll assist with project coordination, research, and client communications while learning AI, automation, & design from the ground up.",
      skills: 'Organisation, communication, adaptability, basic tech knowledge.',
      youreAFitIf: "You're curious, proactive, and eager to grow in a supportive, fast-moving environment.",
      location: 'Anywhere in the World',
      posted: '15 hours ago',
      deadline: '31st August 2025',
    },
  ];

  const handleApply = (jobId: string) => {
    console.log(`Applying for job: ${jobId}`);
    // Add your application logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 sm:mb-16">
          Open Positions
        </h2>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="text-center mt-7">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Don't see your role?
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          Send us your CV anyway! We're always open to talent.
        </p>
        <button className="bg-black text-white py-1 sm:py-3 px-10 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors duration-300">
          Send Your CV
        </button>
      </div>
    </div>
  );
};

export default OpenPositions;