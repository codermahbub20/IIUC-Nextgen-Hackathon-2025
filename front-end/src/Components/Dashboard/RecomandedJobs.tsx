/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Target,
  CheckCircle2,

  AlertCircle
} from 'lucide-react';

import { useGetUserQuery } from '../../redux/features/users/usersApi';
import { useGetAllJobsQuery } from '../../redux/features/jobs/jobsApi';

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

interface JobWithMatch extends Job {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  skillMatchPercentage: number;
}

const RecommendedJobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [userId, setUserId] = useState<string | null>(null);

  // Decode JWT token once on mount
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        setUserId(decoded.id);
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, []);

  // Fetch user and jobs data
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId || "", {
    skip: !userId,
  });
  const { data: jobsResponse, isLoading: isJobsLoading, isError } = useGetAllJobsQuery({});

  console.log('=== DEBUG INFO ===');
  console.log('Raw userData:', userData);
  console.log('Raw jobsResponse:', jobsResponse);

  // Handle different API response structures
  const jobsData: Job[] = Array.isArray(jobsResponse?.data) 
    ? jobsResponse.data 
    : Array.isArray(jobsResponse) 
    ? jobsResponse 
    : [];

  // Handle different user data structures
  const userSkills = Array.isArray(userData?.data?.skills) 
    ? userData.data.skills 
    : Array.isArray(userData?.skills) 
    ? userData.skills 
    : [];

  const userCareerTrack = userData?.data?.preferredCareerTrack || userData?.preferredCareerTrack || "";
  const userExperienceLevel = userData?.data?.experienceLevel || userData?.experienceLevel || "";

  // Create normalized skill set for fast matching
  const normalizeSkill = (skill: string) => skill.toLowerCase().trim();
  const userSkillSet = new Set(userSkills.map(normalizeSkill));

  console.log('Extracted User Skills:', userSkills);
  console.log('Normalized User Skills:', Array.from(userSkillSet));
  console.log('Total Jobs:', jobsData.length);
  console.log('User Career Track:', userCareerTrack);
  console.log('User Experience Level:', userExperienceLevel);

  // Calculate match score and skill analysis
  const calculateMatch = (job: Job): Omit<JobWithMatch, keyof Job> => {
    const jobSkills = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    console.log('Checking job:', job.title);
    console.log('Job required skills:', jobSkills);

    // Check each required skill
    jobSkills.forEach(skill => {
      const normalizedJobSkill = normalizeSkill(skill);
      console.log(`Checking skill: "${skill}" (normalized: "${normalizedJobSkill}")`);
      console.log(`User has this skill?`, userSkillSet.has(normalizedJobSkill));
      
      if (userSkillSet.has(normalizedJobSkill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    console.log('Matched skills:', matchedSkills);
    console.log('Missing skills:', missingSkills);

    // Calculate percentages
    const skillMatchPercentage = jobSkills.length > 0 
      ? Math.round((matchedSkills.length / jobSkills.length) * 100)
      : 0;

    // Weighted scoring: Skills 70%, Career Track 20%, Experience 10%
    let score = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 70 : 0;
    if (job.careerTrack === userCareerTrack) score += 20;
    if (job.experienceLevel === userExperienceLevel) score += 10;

    console.log('Match score:', Math.round(score));
    console.log('---');

    return {
      matchScore: Math.round(score),
      matchedSkills,
      missingSkills,
      skillMatchPercentage
    };
  };

  // Add match data to jobs and filter for recommendations
  const recommendedJobs: JobWithMatch[] = jobsData
    .map(job => ({ ...job, ...calculateMatch(job) }))
    .filter(job => job.matchedSkills.length > 0) // Only show jobs with at least 1 skill match
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      if (b.matchedSkills.length !== a.matchedSkills.length) return b.matchedSkills.length - a.matchedSkills.length;
      return a.missingSkills.length - b.missingSkills.length;
    });

  console.log('Recommended Jobs Count:', recommendedJobs.length);
  console.log('Recommended Jobs:', recommendedJobs);

  // Apply filters
  const filteredJobs = recommendedJobs.filter(job => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      job.title?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower);

    const matchesTrack = filterTrack === "all" || job.careerTrack === filterTrack;
    const matchesType = filterType === "all" || job.jobType === filterType;

    return matchesSearch && matchesTrack && matchesType;
  });

  // Calculate skill demand for heatmap
  const skillDemand: Record<string, { skill: string; count: number }> = {};
  recommendedJobs.forEach(job => {
    job.requiredSkills?.forEach(skill => {
      if (skill) {
        const key = normalizeSkill(skill);
        if (!skillDemand[key]) {
          skillDemand[key] = { skill, count: 0 };
        }
        skillDemand[key].count++;
      }
    });
  });

  const topSkills = Object.values(skillDemand)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(s => ({
      skill: s.skill.length > 12 ? s.skill.substring(0, 12) + '...' : s.skill,
      fullSkill: s.skill,
      demand: s.count
    }));

  const getBarColor = (demand: number): string => {
    if (demand >= 15) return "#dc2626";
    if (demand >= 10) return "#f97316";
    if (demand >= 5) return "#eab308";
    return "#3b82f6";
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      
      const diffDays = Math.ceil((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return "Recently";
    }
  };

  const getMatchColor = (score: number): string => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-orange-100 text-orange-800 border-orange-300";
  };

  // Loading state
  if (isJobsLoading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading your personalized jobs...</p>
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
          <p className="text-slate-600 mb-4">Unable to fetch jobs. Please try again.</p>
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
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Target className="w-8 h-8" />
                Recommended Jobs
              </h1>
              <p className="text-blue-100 mt-2">
                Your skills: {userSkills.length > 0 ? userSkills.join(', ') : 'No skills added yet'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Matched Jobs</p>
              <p className="text-4xl font-bold">{recommendedJobs.length}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterTrack}
              onChange={(e) => setFilterTrack(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Career Tracks</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data">Data</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="DevOps">DevOps</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            Showing {filteredJobs.length} of {recommendedJobs.length} jobs
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Match Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getMatchColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold border border-slate-300 text-slate-700">
                      {job.skillMatchPercentage}% Skills
                    </div>
                  </div>

                  {/* Job Info */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.experienceLevel}</span>
                      <span className="mx-1">•</span>
                      <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(job.postedAt)}</span>
                    </div>
                  </div>

                  {/* Skill Match Progress */}
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Skill Match</span>
                      <span>{job.matchedSkills.length} of {job.requiredSkills?.length || 0}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          job.skillMatchPercentage >= 80 ? 'bg-green-500' :
                          job.skillMatchPercentage >= 60 ? 'bg-blue-500' :
                          job.skillMatchPercentage >= 40 ? 'bg-yellow-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${job.skillMatchPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Matched Skills */}
                  {job.matchedSkills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-green-700 uppercase mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Your Matching Skills ({job.matchedSkills.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.matchedSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Skills */}
                  {job.missingSkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-orange-700 uppercase mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Skills to Learn ({job.missingSkills.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.missingSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium border border-orange-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <a
                    href={job.applyLink || '#'}
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
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
              <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Jobs Found</h3>
              <p className="text-slate-500">
                {recommendedJobs.length === 0
                  ? "Add more skills to your profile to see job recommendations."
                  : "Try adjusting your filters."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;