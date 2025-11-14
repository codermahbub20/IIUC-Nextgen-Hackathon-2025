/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { useGetUserQuery } from '../../redux/features/users/usersApi';
import { useGetAllJobsQuery } from '../../redux/features/jobs/jobsApi';
import { useGetAllResourcesQuery } from '../../redux/features/Resources/resourcesApi';
import { Search, BookOpen, TrendingUp, AlertCircle, XCircle, ExternalLink, Loader2, CheckCircle2, Target, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  requiredSkills: string[];
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  description?: string;
  careerTrack?: string;
  applyLink?: string;
}

interface Resource {
  _id: string;
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost?: string;
  description?: string;
  duration?: string;
  careerTrack?: string;
}

interface SkillGap {
  job: Job;
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  recommendedResources: Resource[];
}

const SkillGapAnalysis: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Decode JWT token to get userId
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

  // Fetch data from Redux APIs
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetUserQuery(userId || "", {
    skip: !userId,
  });
  
  const { data: jobsResponse, isLoading: isJobsLoading, error: jobsError } = useGetAllJobsQuery({});
  const { data: resourcesResponse, isLoading: isResourcesLoading, error: resourcesError } = useGetAllResourcesQuery({});

  // Enhanced skill matching logic
  const skillsMatch = (userSkill: string, requiredSkill: string): boolean => {
    const normalize = (skill: string) => skill.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const userNorm = normalize(userSkill);
    const reqNorm = normalize(requiredSkill);
    
    // Exact match
    if (userNorm === reqNorm) return true;
    
    // Contains match
    if (userNorm.includes(reqNorm) || reqNorm.includes(userNorm)) return true;
    
    // Common skill variations mapping
    const skillVariations: Record<string, string[]> = {
      'js': ['javascript', 'js', 'ecmascript'],
      'javascript': ['javascript', 'js', 'ecmascript'],
      'typescript': ['typescript', 'ts'],
      'react': ['react', 'reactjs'],
      'redux': ['redux', 'reduxjs'],
      'node': ['node', 'nodejs'],
      'html': ['html', 'html5'],
      'css': ['css', 'css3'],
      'python': ['python', 'py'],
      'sql': ['sql', 'mysql', 'postgresql', 'nosql'],
      'aws': ['aws', 'amazonwebservices'],
      'docker': ['docker', 'container'],
      'kubernetes': ['kubernetes', 'k8s']
    };
    
    // Check if both skills belong to the same variation group
    for (const [key, variations] of Object.entries(skillVariations)) {
      if (variations.includes(userNorm) && variations.includes(reqNorm)) {
        return true;
      }
    }
    
    return false;
  };

  // Extract and normalize user skills
  const userSkills = useMemo(() => {
    if (!userData?.skills || !Array.isArray(userData.skills)) return [];
    return userData.skills.map((skill: string) => skill.trim()).filter(Boolean);
  }, [userData]);

  // Core Skill Gap Analysis Logic
  const skillGapAnalysis = useMemo((): SkillGap[] => {
    const jobs = jobsResponse?.data || [];
    const resources = resourcesResponse?.data || [];
    
    if (!jobs || !resources || userSkills.length === 0) return [];

    const results = jobs.map((job: Job) => {
      const requiredSkills = job.requiredSkills.map(s => s.trim());
      
      // Find matched and missing skills
      const matchedSkills: string[] = [];
      const missingSkills: string[] = [];

      requiredSkills.forEach(reqSkill => {
        const isMatch = userSkills.some(userSkill => skillsMatch(userSkill, reqSkill));
        if (isMatch) {
          matchedSkills.push(reqSkill);
        } else {
          missingSkills.push(reqSkill);
        }
      });

      // Calculate match percentage
      const matchPercentage = requiredSkills.length > 0 
        ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
        : 0;

      // Find learning resources specifically for missing skills
      const recommendedResources = resources
        .filter((resource: Resource) => 
          resource.relatedSkills.some(resourceSkill => 
            missingSkills.some(missingSkill => 
              skillsMatch(resourceSkill, missingSkill)
            )
          )
        )
        .sort((a: Resource, b: Resource) => {
          // Prioritize free resources, then by relevance (number of matching skills)
          const aCostPriority = a.cost?.toLowerCase() === 'free' ? 1 : 0;
          const bCostPriority = b.cost?.toLowerCase() === 'free' ? 1 : 0;
          
          if (aCostPriority !== bCostPriority) return bCostPriority - aCostPriority;
          
          // Count how many missing skills this resource covers
          const aSkillMatches = missingSkills.filter(missingSkill => 
            a.relatedSkills.some(resourceSkill => skillsMatch(resourceSkill, missingSkill))
          ).length;
          
          const bSkillMatches = missingSkills.filter(missingSkill => 
            b.relatedSkills.some(resourceSkill => skillsMatch(resourceSkill, missingSkill))
          ).length;
          
          return bSkillMatches - aSkillMatches;
        })
        .slice(0, 3); // Show top 3 most relevant resources

      return {
        job,
        matchedSkills,
        missingSkills,
        matchPercentage,
        recommendedResources
      };
    })
    // Filter: Only show partial matches (1-99%) with actual skill gaps
    .filter(item => 
      item.matchPercentage > 0 && 
      item.matchPercentage < 100 && 
      item.missingSkills.length > 0
    )
    // Sort by match percentage (highest first)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return results;
  }, [jobsResponse, resourcesResponse, userSkills]);

  // Filter by search term
  const filteredAnalysis = useMemo(() => {
    if (!searchTerm) return skillGapAnalysis;
    
    const term = searchTerm.toLowerCase();
    return skillGapAnalysis.filter(item => 
      item.job.title.toLowerCase().includes(term) ||
      item.job.company.toLowerCase().includes(term) ||
      item.job.careerTrack?.toLowerCase().includes(term) ||
      item.missingSkills.some(skill => skill.toLowerCase().includes(term)) ||
      item.matchedSkills.some(skill => skill.toLowerCase().includes(term))
    );
  }, [skillGapAnalysis, searchTerm]);

  // Loading state
  if (isUserLoading || isJobsLoading || isResourcesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-800 font-bold text-xl">Analyzing Your Skill Gaps...</p>
          <p className="text-gray-600 text-sm mt-2">Matching your skills with job requirements</p>
        </div>
      </div>
    );
  }

  // Error state
  if (userError || jobsError || resourcesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center border border-red-200">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Data</h2>
          <p className="text-gray-600">
            {userError ? "Failed to load user data. " : ""}
            {jobsError ? "Failed to load jobs. " : ""}
            {resourcesError ? "Failed to load resources. " : ""}
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!userId || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center border border-gray-100">
          <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Authentication Required</h2>
          <p className="text-gray-600">Please log in to view your personalized skill gap analysis and learning recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skill Gap Analysis & Learning Suggestions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover jobs you're partially qualified for and get personalized learning paths to bridge your skill gaps
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userSkills.length}</div>
                <div className="text-gray-600">Your Current Skills</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{skillGapAnalysis.length}</div>
                <div className="text-gray-600">Partial Match Opportunities</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{resourcesResponse?.data?.length || 0}</div>
                <div className="text-gray-600">Learning Resources</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Results */}
        {filteredAnalysis.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {skillGapAnalysis.length === 0 
                ? "No Partial Matches Found" 
                : "No Results Matching Your Search"}
            </h3>
            <p className="text-gray-600 text-lg">
              {skillGapAnalysis.length === 0 
                ? "You're either fully qualified for available jobs or need to explore different career paths." 
                : "Try adjusting your search terms to find more opportunities."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredAnalysis.map((analysis) => (
              <div key={analysis.job._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {/* Job Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{analysis.job.title}</h2>
                      <p className="text-blue-100 text-lg font-semibold mb-3">{analysis.job.company}</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.job.location && (
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📍 {analysis.job.location}</span>
                        )}
                        {analysis.job.jobType && (
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">💼 {analysis.job.jobType}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-center bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="text-3xl font-black">{analysis.matchPercentage}%</div>
                      <div className="text-blue-100 text-sm font-semibold">Match Score</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Skills Analysis */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Skills You Have */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-900 text-lg">Skills You Have ({analysis.matchedSkills.length})</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.matchedSkills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gap */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-semibold text-gray-900 text-lg">Skill Gap ({analysis.missingSkills.length})</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-sm font-medium border border-red-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Learning Recommendations */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <h3 className="font-bold text-gray-900 text-xl">Learning Path Recommendation</h3>
                    </div>

                    {/* Missing → Recommended Format */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 flex-wrap mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-red-700">Missing:</span>
                          <div className="flex flex-wrap gap-1">
                            {analysis.missingSkills.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className="text-red-700 bg-red-100 px-2 py-1 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                            {analysis.missingSkills.length > 4 && (
                              <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-sm">
                                +{analysis.missingSkills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-blue-700">Recommended:</span>
                          <div className="flex flex-wrap gap-1">
                            {analysis.recommendedResources.length > 0 ? (
                              analysis.recommendedResources.slice(0, 2).map((resource, idx) => (
                                <span key={idx} className="text-blue-700 bg-blue-100 px-2 py-1 rounded text-sm">
                                  {resource.title}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-600 text-sm italic">
                                Search on learning platforms
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resource Cards */}
                    {analysis.recommendedResources.length > 0 ? (
                      <div className="grid gap-4">
                        {analysis.recommendedResources.map((resource) => (
                          <a
                            key={resource._id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-4 rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all group"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {resource.title}
                              </h4>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="font-medium">{resource.platform}</span>
                              {resource.duration && <span>⏱️ {resource.duration}</span>}
                              {resource.cost && (
                                <span className={
                                  resource.cost.toLowerCase() === 'free' 
                                    ? 'text-green-600 font-semibold' 
                                    : 'text-orange-600'
                                }>
                                  💰 {resource.cost}
                                </span>
                              )}
                            </div>
                            
                            {resource.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {resource.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-1">
                              {resource.relatedSkills.slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                  {skill}
                                </span>
                              ))}
                              {resource.relatedSkills.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                  +{resource.relatedSkills.length - 3} more
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium mb-2">No specific resources found in database</p>
                        <p className="text-sm text-gray-500">
                          Search for these skills on: Udemy, Coursera, freeCodeCamp, YouTube
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  {analysis.job.applyLink && (
                    <div className="mt-6 text-center">
                      <a
                        href={analysis.job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Apply for this Position
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGapAnalysis;