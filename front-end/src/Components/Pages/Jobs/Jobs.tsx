import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// --- Types (based on your ERD and Req 3) ---
interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string; 
  location: string;
  requiredSkills: string[];
  experienceLevel: 'Fresher' | 'Junior' | 'Mid';
  jobType: 'Internship' | 'Part-time' | 'Full-time';
  description: string;
  isRecommended?: boolean; // For Req 5 (Basic Matching)
}

// --- Mock Data (Fulfills Req 3: Seeded Data) ---

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Amazon',
    logoUrl: 'https://placehold.co/50x50/F8991D/ffffff?text=A&font=inter',
    location: 'Seattle, WA',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'AWS'],
    experienceLevel: 'Junior',
    jobType: 'Internship',
    description: 'Join our dynamic team to build scalable software solutions. You will work on...',
    isRecommended: true,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Google',
    logoUrl: 'https://placehold.co/50x50/4285F4/ffffff?text=G&font=inter',
    location: 'Mountain View, CA',
    requiredSkills: ['Product Strategy', 'Agile', 'Communication'],
    experienceLevel: 'Mid',
    jobType: 'Full-time',
    description: 'Lead the development of innovative products. You will define the roadmap...',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Microsoft',
    logoUrl: 'https://placehold.co/50x50/F25022/ffffff?text=M&font=inter',
    location: 'Redmond, WA',
    requiredSkills: ['Figma', 'User Research', 'Prototyping'],
    experienceLevel: 'Junior',
    jobType: 'Full-time',
    description: 'Craft intuitive and beautiful user experiences for our cloud services...',
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: 'Meta',
    logoUrl: 'https://placehold.co/50x50/0068E1/ffffff?text=M&font=inter',
    location: 'Remote',
    requiredSkills: ['SQL', 'Python', 'Tableau', 'Excel'],
    experienceLevel: 'Fresher',
    jobType: 'Internship',
    description: 'Analyze large datasets to provide actionable insights for our products...',
    isRecommended: true,
  },
  {
    id: '5',
    title: 'Frontend Developer',
    company: 'Netflix',
    logoUrl: 'https://placehold.co/50x50/E50914/ffffff?text=N&font=inter',
    location: 'Los Gatos, CA',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    experienceLevel: 'Junior',
    jobType: 'Part-time',
    description: 'Build responsive and high-performance user interfaces for millions of users.',
  },
  {
    id: '6',
    title: 'Marketing Intern',
    company: 'HubSpot',
    logoUrl: 'https://placehold.co/50x50/FF7A59/ffffff?text=H&font=inter',
    location: 'Remote',
    requiredSkills: ['Social Media', 'Content Writing', 'SEO'],
    experienceLevel: 'Fresher',
    jobType: 'Internship',
    description: 'Support our marketing campaigns and help grow our online presence.',
  },
  
];

const ROLES_FILTER = ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst', 'Frontend Developer'];
const JOB_TYPE_FILTER = ['Full-time', 'Part-time', 'Internship'];

// --- Reusable Job Card Component ---
const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between min-h-[280px]">
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img 
            src={job.logoUrl} 
            alt={`${job.company} logo`} 
            className="w-12 h-12 rounded-lg object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        {job.isRecommended && (
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3" fill="currentColor" />
            Recommended
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {job.description}
      </p>
    </div>
    <div className="flex flex-wrap gap-2">
      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{job.jobType}</span>
      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{job.location}</span>
      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{job.experienceLevel}</span>
    </div>
  </div>
);

// --- Reusable Pagination Component ---
const Pagination: React.FC<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-9 h-9 rounded-md text-sm font-medium ${
            currentPage === number 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </nav>
  );
};


// --- Main Jobs Component ---
const Jobs: React.FC = () => {
  // --- State ---
  const [allJobs] = useState<Job[]>(MOCK_JOBS);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(9); // 3x3 Grid as in the picture

  // --- Logic ---

  // Handle Checkbox Changes
  const handleCheckboxChange = (
    value: string, 
    filterType: 'role' | 'jobType'
  ) => {
    const state = filterType === 'role' ? selectedRoles : selectedJobTypes;
    const setState = filterType === 'role' ? setSelectedRoles : setSelectedJobTypes;
    
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  // Handle Filter Application
  const handleApplyFilters = () => {
    let jobs = allJobs;

    // 1. Filter by Search Term
    if (searchTerm) {
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Role
    if (selectedRoles.length > 0) {
      jobs = jobs.filter(job => selectedRoles.includes(job.title));
    }

    // 3. Filter by Job Type
    if (selectedJobTypes.length > 0) {
      jobs = jobs.filter(job => selectedJobTypes.includes(job.jobType));
    }

    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  // Handle Filter Reset
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRoles([]);
    setSelectedJobTypes([]);
    setFilteredJobs(allJobs);
    setCurrentPage(1);
  };
  
  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  // --- JSX ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- Left Column: Filters --- */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by keyword..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              
              {/* Role Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Role</h3>
                <div className="space-y-2">
                  {ROLES_FILTER.map(role => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role, 'role')}
                      />
                      <span className="ml-3 text-sm text-gray-600">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {JOB_TYPE_FILTER.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => handleCheckboxChange(type, 'jobType')}
                      />
                      <span className="ml-3 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>
          
          {/* --- Right Column: Job Listings --- */}
          <main className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Showing {filteredJobs.length} Job Results
            </h1>
            
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-10 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">No Jobs Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;