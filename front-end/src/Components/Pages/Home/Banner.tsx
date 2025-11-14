import React from 'react';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  PhoneIcon,
  PaintBrushIcon,
  CpuChipIcon,
  VideoCameraIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
// Assuming the user's preferred icons are from lucide-react (or similar)
import { Building2, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react'; 
import { useGetAllJobsQuery } from '../../../redux/features/jobs/jobsApi';

// --- UPDATED TypeScript টাইপ (FetchedJob is the one we use now) ---
export interface FetchedJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  experienceLevel: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | string; // Added specific jobType literals
  description: string;
  applyLink: string;
  careerTrack: string;
  postedAt: string;
}

// --- Data & Utility Functions ---

// Placeholder function for formatting date (necessary for the card)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Hero সেকশনের ছবি
const heroImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://shomvob.com/_next/image?url=%2Fassets%2Fimages%2FHeroImages%2FHeroImage1.png&w=3840&q=75',
];

// Trending ক্যাটাগরি
const trendingCategories = [
  { name: 'Sales Representative', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
  { name: 'Call Center', icon: <PhoneIcon className="h-5 w-5 mr-2" /> },
  { name: 'Graphic Design', icon: <PaintBrushIcon className="h-5 w-5 mr-2" /> },
  { name: 'Computer Operator', icon: <CpuChipIcon className="h-5 w-5 mr-2" /> },
  { name: 'Video Editing', icon: <VideoCameraIcon className="h-5 w-5 mr-2" /> },
  { name: 'Field Sales', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
];

// --- মূল Banner কম্পোনেন্ট ---

const Banner: React.FC = () => {

// Redux query to fetch jobs from backend
  const { data } = useGetAllJobsQuery({});
  
  // Directly use the array of individual job objects from the API response
  const jobsData: FetchedJob[] = data?.data || [];


  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ========== 1. Navbar (Omitted for brevity) ========== */}
      
      <main>
        {/* ========== 2. Hero Section (Unchanged) ========== */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Side: Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Where <span className="font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Every Career</span> Journey Begins
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Find your next career move with thousands of job openings from top companies.
              </p>

              {/* Search Bar */}
              <form className="mt-8 flex flex-col sm:flex-row gap-3 shadow-lg rounded-lg">
                <div className="flex-grow flex items-center bg-white rounded-l-lg border border-gray-200 overflow-hidden">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mx-4" />
                  <input
                    type="text"
                    placeholder="Job Title, Company or Location"
                    className="w-full py-4 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700  text-white px-8 py-4 rounded-r-lg font-semibold hover:bg-emerald-700 transition duration-150 flex-shrink-0"
                >
                  Find Jobs
                </button>
              </form>

              {/* Trending Categories (Inlined) */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800">Trending Job Categories</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {trendingCategories.map((category) => (
                    <a
                      key={category.name}
                      href="#"
                      className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium 
                                 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 transition duration-150"
                    >
                      {category.icon}
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Right Side: Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {heroImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Job example ${index + 1}`}
                  className={`rounded-lg shadow-xl object-cover w-full h-full ${
                    index === 0 ? 'row-span-1' : ''
                  } ${index === 1 ? 'row-span-1' : ''} ${
                    index === 2 ? 'row-span-1' : ''
                  } ${index === 3 ? 'row-span-1' : ''}
                  transform hover:scale-105 transition-transform duration-300 ease-in-out
                  `}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========== 3. Premium Jobs Section (Updated to use Card Layout) ========== */}
        <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Latest Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              
              {/* Individual Job Cards */}
              {jobsData.map((job) => (
                 <div 
                 key={job._id} 
                 className="bg-white/95 rounded-2xl shadow-xl border border-indigo-100/60 overflow-hidden 
                            transform hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-400 
                            transition-all duration-300 ease-in-out backdrop-blur-sm"
               >
                   <div className="p-7">
                       
                       {/* Job Header & Badge */}
                       <div className="flex items-start justify-between mb-5">
                           <div className="flex-1">
                               <h3 className="text-2xl font-extrabold text-indigo-700 mb-1 leading-snug">
                                   {job.title}
                               </h3>
                               <div className="flex items-center gap-2 text-slate-600">
                                   <Building2 className="w-5 h-5 text-teal-500" />
                                   <span className="font-semibold text-base">{job.company}</span>
                               </div>
                           </div>
                           
                           {/* Job Type Badge (Updated Colors) */}
                           <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                               job.jobType === 'Full-time' ? 'bg-teal-100 text-teal-800' :
                               job.jobType === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                               job.jobType === 'Internship' ? 'bg-blue-100 text-blue-800' :
                               'bg-purple-100 text-purple-800'
                           }`}>
                               {job.jobType}
                           </span>
                       </div>
               
                       {/* --- Job Details Container --- */}
                       <div className="space-y-3 mb-5 border-y border-gray-100 py-4">
                           <div className="flex items-center gap-3 text-sm text-gray-700">
                               <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                               <span>{job.location}</span>
                           </div>
                           <div className="flex items-center gap-3 text-sm text-gray-700">
                               <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                               <span><span className="font-medium">{job.experienceLevel}</span> Experience Level</span>
                           </div>
                           <div className="flex items-center gap-3 text-sm text-gray-700">
                               <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                               <span>Posted on: <span className="font-medium">{formatDate(job.postedAt)}</span></span>
                           </div>
                       </div>
               
                       {/* Description */}
                       <p className="text-sm text-gray-600 mb-5 line-clamp-3">
                           {job.description}
                       </p>
               
                       {/* Skills */}
                       <div className="mb-6">
                           <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">
                               Key Skills
                           </p>
                           <div className="flex flex-wrap gap-2">
                               {job.requiredSkills?.slice(0, 5).map((skill, index) => (
                                   <span 
                                     key={index} 
                                     className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold 
                                                border border-indigo-200/50 hover:bg-indigo-100 transition"
                                   >
                                       {skill}
                                   </span>
                               ))}
                               {job.requiredSkills.length > 5 && (
                                    <span className="px-3 py-1 text-gray-500 rounded-full text-xs font-medium">
                                       +{job.requiredSkills.length - 5} more
                                   </span>
                               )}
                           </div>
                       </div>
               
                       {/* Career Track & Apply Button */}
                       <div className="flex justify-between items-center pt-3">
                           <span className="inline-flex items-center px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold shadow-inner">
                               {job.careerTrack}
                           </span>
                            <a
                               href={job.applyLink}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 
                                          hover:from-indigo-600 hover:to-violet-700 text-white rounded-lg font-semibold transition-all 
                                          shadow-lg shadow-indigo-500/30 hover:shadow-indigo-600/40 text-sm"
                           >
                               Apply Now
                               <ExternalLink className="w-4 h-4" />
                           </a>
                       </div>
                   </div>
               </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="#"
                className="text-emerald-600 font-semibold hover:text-emerald-800 transition duration-150 text-lg"
              >
                View All Premium Jobs &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Banner;