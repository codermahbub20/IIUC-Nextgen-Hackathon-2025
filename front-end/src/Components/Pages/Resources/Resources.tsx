/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useGetAllResourcesQuery } from '../../../redux/features/Resources/resourcesApi';


interface LearningResource {
  _id: string;
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost: 'Free' | 'Paid';
  description?: string;
  duration?: string;
  careerTrack?: string;
}

// --- Resource Card ---
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
          {resource.relatedSkills?.slice(0, 3).map(skill => (
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

// --- Pagination ---
const Pagination: React.FC<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

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

// --- Main Component ---
const Resources: React.FC = () => {
  const { data, isLoading, isError } = useGetAllResourcesQuery({});
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(6);
  const skillDropdownRef = useRef<HTMLDivElement>(null);

  const allResources: LearningResource[] = data?.data || [];

  const allSkills = [
    ...new Set(allResources.flatMap((res) => res.relatedSkills || [])),
  ].sort();

  // Filter Logic
  useEffect(() => {
    if (!allResources) return;

    let resources = [...allResources];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      resources = resources.filter(res =>
        res.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        res.platform.toLowerCase().includes(lowerCaseSearchTerm) ||
        res.relatedSkills?.some(skill =>
          skill.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    }

    if (selectedSkill) {
      resources = resources.filter(res => res.relatedSkills?.includes(selectedSkill));
    }

    setFilteredResources(resources);
    setCurrentPage(1);
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

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading resources...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Failed to load resources.
      </div>
    );

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const currentResources = filteredResources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

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
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, platform, or skill..."
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
              <span className="text-gray-700">{selectedSkill || 'Skill'}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isSkillDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isSkillDropdownOpen && (
              <div className="absolute top-full mt-2 w-full md:w-52 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-h-60 overflow-y-auto">
                <div className="py-1">
                  <button
                    onClick={() => setSelectedSkill('')}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Skills
                  </button>
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
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
              {currentResources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-10 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                No Resources Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Resources;
