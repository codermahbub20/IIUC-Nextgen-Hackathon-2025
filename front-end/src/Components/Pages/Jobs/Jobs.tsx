/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Clock, 
  Flame,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useGetAllJobsQuery } from '../../../redux/features/jobs/jobsApi';


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

interface SkillDemand {
  skill: string;
  count: number;
  jobs: string[];
}

interface HeatmapData {
  skill: string;
  fullSkill: string;
  demand: number;
  jobs: string[];
}

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Redux query to fetch jobs from backend
  const { data, isLoading, isError, error } = useGetAllJobsQuery({});
  const jobsData: Job[] = data?.data || [];

  // Filter jobs based on all criteria
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

  // Calculate demand heatmap data based on filtered jobs
  const locations = [...new Set(jobsData.map(j => j.location))].filter(Boolean);
  const skillDemand: Record<string, SkillDemand> = {};

  filteredJobs.forEach(job => {
    job.requiredSkills?.forEach(skill => {
      if (!skillDemand[skill]) {
        skillDemand[skill] = { skill, count: 0, jobs: [] };
      }
      skillDemand[skill].count++;
      skillDemand[skill].jobs.push(job.title);
    });
  });

  const topSkills = Object.values(skillDemand)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const heatmapData: HeatmapData[] = topSkills.map(s => ({
    skill: s.skill.length > 12 ? s.skill.substring(0, 12) + '...' : s.skill,
    fullSkill: s.skill,
    demand: s.count,
    jobs: s.jobs
  }));

  const getBarColor = (demand: number): string => {
    if (demand >= 15) return "#dc2626";
    if (demand >= 10) return "#f97316";
    if (demand >= 5) return "#eab308";
    return "#3b82f6";
  };

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

  // Loading state
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

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Jobs</h3>
          <p className="text-slate-600 mb-4">
            {error && typeof error === 'object' && 'data' in error 
              ? (error.data as any)?.message || 'Unable to fetch jobs from server'
              : 'Please check your connection and try again'}
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
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-600" />
            Available Jobs
          </h1>
          <p className="text-slate-600">
            Browse {jobsData.length} opportunities matching your profile
          </p>
        </div>

        {/* Demand Heatmap */}
        {heatmapData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-200/60 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-slate-900">Skills Demand Heatmap</h2>
                {selectedLocation !== "all" && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {selectedLocation}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600">
                See which skills are most in-demand based on current job openings
              </p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={heatmapData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Number of Jobs', position: 'bottom', offset: 0 }} />
                  <YAxis dataKey="skill" type="category" width={100} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload as HeatmapData;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                            <p className="font-bold">{data.fullSkill}</p>
                            <p className="text-sm text-slate-600">{data.demand} job openings</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {data.demand >= 15 ? '🔥 Very Hot!' :
                               data.demand >= 10 ? '🔥 Hot!' :
                               data.demand >= 5 ? '⚡ In Demand' :
                               '📊 Normal'}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="demand" radius={[0, 8, 8, 0]}>
                    {heatmapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.demand)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Warm (5+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Hot (10+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span>Very Hot (15+)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs, companies, locations..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Career Track Filter */}
              <div>
                <select
                  value={filterTrack}
                  onChange={(e) => setFilterTrack(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              {/* Job Type Filter */}
              <div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            {/* Experience Level Filter (Additional Row) */}
            <div className="grid md:grid-cols-5 gap-4 mt-4">
              <div>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Jobs List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.jobType === 'Full-time' ? 'bg-green-100 text-green-800' :
                      job.jobType === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                      job.jobType === 'Internship' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {job.jobType}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(job.postedAt)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{job.description}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills?.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Career Track */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {job.careerTrack}
                    </span>
                  </div>

                  {/* Apply Button */}
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-lg font-medium transition-all"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden">
              <div className="p-12 text-center">
                <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-500">
                  {jobsData.length === 0 
                    ? "No jobs available at the moment. Check back soon!"
                    : "Try adjusting your filters or search query"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;