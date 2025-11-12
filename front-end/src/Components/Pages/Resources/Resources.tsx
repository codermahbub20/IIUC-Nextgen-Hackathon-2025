import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';


interface LearningResource {
  id: string;
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost: 'Free' | 'Paid';
}

// --- Mock Data (Fulfills Req 4: Seeded Data) ---
const MOCK_RESOURCES: LearningResource[] = [
  {
    id: '1',
    title: 'Introduction to Project Management',
    platform: 'Coursera',
    url: '#',
    relatedSkills: ['Project Management', 'Agile', 'Scrum'],
    cost: 'Free',
  },
  {
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    platform: 'Udemy',
    url: '#',
    relatedSkills: ['HTML & CSS', 'JavaScript', 'React', 'Node.js'],
    cost: 'Paid',
  },
  {
    id: '3',
    title: 'Data Analysis with Python',
    platform: 'LinkedIn Learning',
    url: '#',
    relatedSkills: ['Data Analysis', 'Python', 'Pandas'],
    cost: 'Paid',
  },
  {
    id: '4',
    title: 'The Complete Digital Marketing Course',
    platform: 'Coursera',
    url: '#',
    relatedSkills: ['Marketing', 'SEO', 'Social Media'],
    cost: 'Free',
  },
  {
    id: '5',
    title: 'UX Design Fundamentals',
    platform: 'Udemy',
    url: '#',
    relatedSkills: ['UX Design', 'UI Design', 'Figma'],
    cost: 'Paid',
  },
  {
    id: '6',
    title: 'Cloud Computing Basics',
    platform: 'edX',
    url: '#',
    relatedSkills: ['Cloud Computing', 'AWS'],
    cost: 'Free',
  },
  {
    id: '7' ,
    title: 'React - The Complete Guide',
    platform: 'Udemy',
    url: '#',
    relatedSkills: ['JavaScript', 'React'],
    cost: 'Paid',
  },
  {
    id: '8',
    title: 'Advanced SQL for Data Scientists',
    platform: 'Coursera',
    url: '#',
    relatedSkills: ['Data Analysis', 'SQL'],
    cost: 'Paid',
  },
  
];


const SKILL_LIST = [
  ...new Set(MOCK_RESOURCES.flatMap(res => res.relatedSkills))
].sort();



const ResourceCard: React.FC<{ resource: LearningResource }> = ({ resource }) => {
  const costColor = resource.cost === 'Free' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-purple-100 text-purple-700';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${costColor}`}>
            {resource.cost}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{resource.platform}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.relatedSkills.slice(0, 3).map(skill => ( // Show max 3 skills
            <span key={skill} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
      >
        Go to Course <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

// --- Reusable Pagination Component ---
const Pagination: React.FC<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  // Logic to show limited page numbers (e.g., 1, 2, 3, ..., 10)
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


// --- Main Learning Resources Component ---
const Resources: React.FC = () => {
  // --- State ---
  const [allResources] = useState<LearningResource[]>(MOCK_RESOURCES);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>(MOCK_RESOURCES);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>(''); // Empty string means "All"
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(6); // 2x3 Grid as in the picture

  // Ref for dropdown
  const skillDropdownRef = useRef<HTMLDivElement>(null);


  // --- Logic ---

  // Handle Filtering
  useEffect(() => {
    let resources = [...allResources];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // 1. Filter by Search Term (Title, Platform, OR Skill)
    if (searchTerm) {
      resources = resources.filter(res => 
        res.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        res.platform.toLowerCase().includes(lowerCaseSearchTerm) ||
        // --- UPDATED LOGIC HERE ---
        
        res.relatedSkills.some(skill => 
          skill.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    }

    // 2. Filter by Selected Skill
    if (selectedSkill) {
      resources = resources.filter(res => res.relatedSkills.includes(selectedSkill));
    }

    setFilteredResources(resources);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, selectedSkill, allResources]);

  
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target as Node)) {
        setIsSkillDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Handle skill selection
  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill);
    setIsSkillDropdownOpen(false);
  };


  // --- JSX ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Learning Resources
          </h1>
          <p className="text-lg text-gray-600">
            Curated courses and tutorials to help you build in-demand skills.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, platform, or skill..." // Updated placeholder
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Skill Filter Dropdown */}
          <div className="relative" ref={skillDropdownRef}>
            <button
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
              className="w-full md:w-52 flex items-center justify-between pl-4 pr-3 py-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="text-gray-700">
                {selectedSkill || 'Skill'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSkillDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSkillDropdownOpen && (
              <div className="absolute top-full mt-2 w-full md:w-52 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-h-60 overflow-y-auto">
                <div className="py-1">
                  <button
                    onClick={() => handleSkillSelect('')}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Skills
                  </button>
                  {SKILL_LIST.map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillSelect(skill)}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Resources Grid */}
        <main>
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-10 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">No Resources Found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
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
  );
};

export default Resources;