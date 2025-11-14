/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Clock, 
  ExternalLink,
  Calendar,
  X,
  CheckCircle
} from 'lucide-react';
import { useGetAllJobsQuery } from '../../../redux/features/jobs/jobsApi';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  experienceLevel: string;
  jobType: string;
  description: string;
  applyLink: string;
  careerTrack: string;
  postedAt: string;
}

const STORAGE_KEY = 'applied_jobs';

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const { data, isLoading, isError, error } = useGetAllJobsQuery({});
  const jobsData: Job[] = data?.data || [];

  // Load applied jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAppliedJobs(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save to localStorage whenever appliedJobs changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(appliedJobs)));
  }, [appliedJobs]);

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = searchQuery === "" ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack = filterTrack === "all" || job.careerTrack === filterTrack;
    const matchesType = filterType === "all" || job.jobType === filterType;
    const matchesLevel = filterLevel === "all" || job.experienceLevel === filterLevel;
    const matchesLocation = selectedLocation === "all" || 
      job.location?.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesTrack && matchesType && matchesLevel && matchesLocation;
  });

  const locations = [...new Set(jobsData.map(j => j.location))].filter(Boolean);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const markAsApplied = (jobId: string) => {
    setAppliedJobs(prev => new Set(prev).add(jobId));
  };

  const isApplied = (jobId?: string) => jobId ? appliedJobs.has(jobId) : false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">Warning</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Jobs</h3>
          <p className="text-slate-600 mb-4">
            {error && typeof error === 'object' && 'data' in error 
              ? (error.data as any)?.message || 'Unable to fetch jobs'
              : 'Please check your connection'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Available Jobs
              </h1>
              <p className="text-slate-600">
                Browse {jobsData.length} opportunities
              </p>
            </div>
            {appliedJobs.size > 0 && (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {appliedJobs.size} Applied
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
            <div className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs, companies..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={filterTrack}
                    onChange={(e) => setFilterTrack(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Tracks</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Data">Data</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Business Analysis">Business Analysis</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mt-4">
                <div>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  Showing {filteredJobs.length} of {jobsData.length} jobs
                </span>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const applied = isApplied(job._id);
                return (
                  <motion.div
                    key={job._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col relative"
                  >
                    {/* Applied Badge */}
                    {/* {applied && (
                      <div className="absolute -top-2 right-3 z-10 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <CheckCircle className="w-3 h-3" />
                        Applied
                      </div>
                    )} */}

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-2">{job.title}</h3>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Building2 className="w-4 h-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                          job.jobType === 'Full-time' ? 'bg-emerald-100 text-emerald-700' :
                          job.jobType === 'Part-time' ? 'bg-amber-100 text-amber-700' :
                          job.jobType === 'Internship' ? 'bg-sky-100 text-sky-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {job.jobType}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.experienceLevel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(job.postedAt)}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">{job.description}</p>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Key Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requiredSkills?.slice(0, 4).map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                          {job.requiredSkills.length > 4 && (
                            <span className="text-xs text-slate-500">+{job.requiredSkills.length - 4} more</span>
                          )}
                        </div>
                      </div>

                      {/* Career Track */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {job.careerTrack}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => openModal(job)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-lg font-medium transition-all"
                        >
                          See Details
                        </button>
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!applied && job._id) {
                              markAsApplied(job._id);
                            }
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            applied
                              ? 'bg-emerald-500 text-white cursor-default'
                              : 'bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white'
                          }`}
                        >
                          {applied ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Applied
                            </>
                          ) : (
                            <>
                              Apply Now
                              <ExternalLink className="w-4 h-4" />
                            </>
                          )}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200/60 p-12 text-center">
                <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-500">
                  {jobsData.length === 0 
                    ? "No jobs available at the moment. Check back soon!"
                    : "Try adjusting your filters or search query"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedJob.title}</h2>
                    <p className="text-lg text-slate-600 mt-1 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {selectedJob.company}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Applied Status */}
                {isApplied(selectedJob._id) && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">Application Submitted!</p>
                      <p className="text-sm text-emerald-700">You've already applied to this position.</p>
                    </div>
                  </div>
                )}

                {/* Job Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium">{selectedJob.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-slate-500">Experience</p>
                      <p className="font-medium">{selectedJob.experienceLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-slate-500">Type</p>
                      <p className="font-medium">{selectedJob.jobType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-slate-500">Posted</p>
                      <p className="font-medium">{formatDate(selectedJob.postedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Job Description</h3>
                  <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requiredSkills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Track */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">Career Track:</span>
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                    {selectedJob.careerTrack}
                  </span>
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-slate-200">
                  <a
                    href={selectedJob.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (isApplied(selectedJob._id)) {
                        e.preventDefault();
                      } else if (selectedJob._id) {
                        markAsApplied(selectedJob._id);
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg ${
                      isApplied(selectedJob._id)
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white hover:shadow-xl'
                    }`}
                  >
                    {isApplied(selectedJob._id) ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Already Applied
                      </>
                    ) : (
                      <>
                        Apply Now
                        <ExternalLink className="w-5 h-5" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Jobs;