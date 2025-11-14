/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Clock, Tag, ExternalLink, BookOpen, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface Rating {
  resourceId: string;
  rating: number;
  timestamp: number;
}

const STORAGE_KEY = 'resource_ratings';

// --- Star Rating Component ---
const StarRating: React.FC<{
  rating: number;
  onRate: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}> = ({ rating, onRate, readonly = false, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = hoverRating || rating;

  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const containerSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`flex items-center gap-1 ${containerSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: readonly ? 1 : 1.2 }}
          whileTap={{ scale: readonly ? 1 : 0.9 }}
          onClick={() => !readonly && onRate(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          disabled={readonly}
          className={`transition-all ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star
            className={`${starSize} transition-all ${
              star <= currentRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
      {!readonly && <span className="ml-2 text-gray-500">Rate</span>}
    </div>
  );
};

// --- Resource Card ---
const ResourceCard: React.FC<{ 
  resource: LearningResource;
  userRating: number;
  avgRating: number;
  totalRatings: number;
  onRate: (resourceId: string, rating: number) => void;
}> = ({ resource, userRating, avgRating, totalRatings, onRate }) => {
  const costColor = resource.cost === 'Free' 
    ? 'from-emerald-500 to-green-600' 
    : 'from-purple-500 to-pink-600';

  const platformIcon = resource.platform.toLowerCase().includes('youtube') ? 'https://cdn.worldvectorlogo.com/logos/youtube-2.svg'
    : resource.platform.toLowerCase().includes('udemy') ? 'https://cdn.worldvectorlogo.com/logos/udemy.svg'
    : resource.platform.toLowerCase().includes('coursera') ? 'https://cdn.worldvectorlogo.com/logos/coursera.svg'
    : 'https://cdn.worldvectorlogo.com/logos/book-1.svg';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0  rounded-3xl opacity-0 group-hover:opacity-70 blur-2xl hover:shadow-xl  transition-opacity duration-300 -z-10"></div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transition-all duration-300  h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2 flex items-center justify-center shadow-md">
              <img src={platformIcon} alt={resource.platform} className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <BookOpen className="w-3.5 h-3.5" />
                {resource.platform}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${costColor} shadow-sm`}>
            {resource.cost}
          </span>
        </div>

        {/* Duration & Track */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.careerTrack && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-violet-500" />
              <span className="font-medium text-violet-700">{resource.careerTrack}</span>
            </div>
          )}
        </div>

        {/* Rating Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StarRating rating={avgRating} readonly size="sm" />
            <span className="text-xs text-gray-500">({totalRatings})</span>
          </div>
          {userRating > 0 && (
            <span className="text-xs font-medium text-indigo-600">
              You rated: {userRating} stars
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {resource.relatedSkills?.slice(0, 4).map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200/50"
            >
              {skill}
            </motion.span>
          ))}
          {resource.relatedSkills.length > 4 && (
            <span className="px-3 py-1 text-gray-500 text-xs">+{resource.relatedSkills.length - 4}</span>
          )}
        </div>

        {/* Interactive Rating */}
        <div className="mb-4">
          <StarRating
            rating={userRating}
            onRate={(rating) => onRate(resource._id, rating)}
          />
        </div>

        {/* CTA Button */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
        >
          Start Learning
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

// --- Pagination ---
const Pagination: React.FC<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-11 h-11 rounded-xl text-sm font-medium transition-all ${
            page === currentPage
              ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
              : page === '...'
              ? 'cursor-default text-gray-400'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
  const [ratings, setRatings] = useState<Record<string, Rating[]>>({});
  const skillDropdownRef = useRef<HTMLDivElement>(null);

  const allResources: LearningResource[] = data?.data || [];

  // Load ratings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const ratingsMap: Record<string, Rating[]> = {};
      parsed.forEach((r: Rating) => {
        if (!ratingsMap[r.resourceId]) ratingsMap[r.resourceId] = [];
        ratingsMap[r.resourceId].push(r);
      });
      setRatings(ratingsMap);
    }
  }, []);

  // Save ratings to localStorage
  useEffect(() => {
    const flatRatings = Object.values(ratings).flat();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flatRatings));
  }, [ratings]);

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

  const handleRating = (resourceId: string, rating: number) => {
    setRatings(prev => {
      const newRatings = { ...prev };
      if (!newRatings[resourceId]) newRatings[resourceId] = [];
      
      // Remove previous rating from this user (simulate one rating per user)
      newRatings[resourceId] = newRatings[resourceId].filter(r => r.timestamp > Date.now() - 1000 * 60 * 60 * 24); // last 24h
      newRatings[resourceId].push({ resourceId, rating, timestamp: Date.now() });
      
      return newRatings;
    });
  };

  const getUserRating = (resourceId: string): number => {
    const userRatings = ratings[resourceId] || [];
    const recent = userRatings.sort((a, b) => b.timestamp - a.timestamp)[0];
    return recent?.rating || 0;
  };

  const getAverageRating = (resourceId: string): number => {
    const resourceRatings = ratings[resourceId] || [];
    if (resourceRatings.length === 0) return 0;
    const sum = resourceRatings.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / resourceRatings.length) * 10) / 10;
  };

  const getTotalRatings = (resourceId: string): number => {
    return (ratings[resourceId] || []).length;
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading resources...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">Warning</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Resources</h3>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const currentResources = filteredResources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master in-demand skills with curated courses. <strong>Rate</strong> what you learn!
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by course, platform, or skill..."
              className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Skill Filter Dropdown */}
          <div className="relative" ref={skillDropdownRef}>
            <button
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
              className="w-full md:w-64 flex items-center justify-between pl-5 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            >
              <span className="text-gray-700 font-medium">{selectedSkill || 'Filter by Skill'}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isSkillDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isSkillDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 max-h-64 overflow-y-auto"
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setSelectedSkill('');
                        setIsSkillDropdownOpen(false);
                      }}
                      className="w-full text-left block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      All Skills
                    </button>
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => {
                          setSelectedSkill(skill);
                          setIsSkillDropdownOpen(false);
                        }}
                        className="w-full text-left block px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </  div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          Showing <span className="font-semibold text-indigo-700">{filteredResources.length}</span> resources
          {selectedSkill && ` for "${selectedSkill}"`}
        </div>

        {/* Resources Grid */}
        <main>
          {filteredResources.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {currentResources.map((resource, index) => (
             <motion.div
               key={resource._id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               /* ← NEW → force every card to fill its grid cell */
               className="h-full"
             >
               <ResourceCard
                 resource={resource}
                 userRating={getUserRating(resource._id)}
                 avgRating={getAverageRating(resource._id)}
                 totalRatings={getTotalRatings(resource._id)}
                 onRate={handleRating}
               />
             </motion.div>
           ))}
         </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/60 backdrop-blur-sm p-16 rounded-3xl shadow-lg border border-white/30"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Resources Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search term or skill filter to discover more learning opportunities.
              </p>
            </motion.div>
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