/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { useGetUserQuery } from '../../redux/features/users/usersApi';
import { useGetAllJobsQuery } from '../../redux/features/jobs/jobsApi';
import { useGetAllResourcesQuery } from '../../redux/features/Resources/resourcesApi';
import axios from 'axios';
import {
  Search, Target, ArrowRight, ExternalLink, Play, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, Loader2, BookOpen, Youtube
} from 'lucide-react';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface Job { _id: string; title: string; company: string; requiredSkills: string[]; location?: string; jobType?: string; applyLink?: string; }
interface Resource { _id: string; title: string; platform: string; url: string; relatedSkills: string[]; cost?: 'Free' | 'Paid'; duration?: string; }
interface YouTubeVideo { videoId: string; title: string; channel: string; thumbnail: string; duration?: string; viewCount?: string; }

const SkillGapAnalysis: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [youtubeData, setYoutubeData] = useState<Record<string, YouTubeVideo[]>>({});

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserId(decoded.id);
      } catch (e) { }
    }
  }, []);

  const { data: userData, isLoading: userLoading } = useGetUserQuery(userId || "", { skip: !userId });
  const { data: jobsData, isLoading: jobsLoading } = useGetAllJobsQuery({});
  const { data: resourcesData, isLoading: resourcesLoading } = useGetAllResourcesQuery({});

  // Skill synonyms & normalization
  const normalize = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9+#]/g, '');
  const synonyms: Record<string, string[]> = {
    javascript: ['js', 'javascript'],
    typescript: ['ts', 'typescript'],
    react: ['react', 'reactjs'],
    nodejs: ['node', 'nodejs', 'node.js'],
    nextjs: ['next', 'next.js', 'nextjs'],
    tailwind: ['tailwind', 'tailwindcss'],
    mongodb: ['mongo', 'mongodb'],
    express: ['expressjs', 'express.js'],
    redux: ['redux', 'reduxjs'],
    graphql: ['graphql', 'apollo'],
  };

  const getRootSkill = (skill: string): string => {
    const n = normalize(skill);
    for (const [root, list] of Object.entries(synonyms)) {
      if (list.includes(n)) return root;
    }
    return n;
  };

  const userSkillsSet = useMemo(() => 
    new Set((userData?.data?.skills || userData?.skills || []).map((s: string) => getRootSkill(s))), 
    [userData]
  );

  // Fetch YouTube videos for a skill
  const fetchYouTube = async (skill: string) => {
    if (!YOUTUBE_API_KEY || youtubeData[skill]) return;
    try {
      const query = `${skill} tutorial 2025 OR ${skill} full course 2025 site:youtube.com`;
      const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: { part: 'snippet', q: query, type: 'video', maxResults: 6, key: YOUTUBE_API_KEY, videoDuration: 'medium' }
      });

      const videos = res.data.items
        .filter((i: any) => i.id.videoId)
        .slice(0, 4)
        .map((i: any) => ({
          videoId: i.id.videoId,
          title: i.snippet.title,
          channel: i.snippet.channelTitle,
          thumbnail: i.snippet.thumbnails.high?.url || i.snippet.thumbnails.medium?.url,
        }));

      setYoutubeData(prev => ({ ...prev, [skill]: videos }));
    } catch (err) {
      console.warn("YouTube failed for:", skill);
    }
  };

  // Skill Gap Analysis
  const gaps = useMemo(() => {
    const jobs = (jobsData?.data || []) as Job[];
    const resources = (resourcesData?.data || []) as Resource[];

    return jobs
      .map(job => {
        const required = job.requiredSkills.map(s => getRootSkill(s));
        const matched = required.filter(s => userSkillsSet.has(s));
        const missing = required.filter(s => !userSkillsSet.has(s));

        const matchPercent = required.length ? Math.round((matched.length / required.length) * 100) : 0;

        // Trigger YouTube fetch
        missing.forEach(skill => fetchYouTube(skill));

        const recommendedResources = resources
          .filter(r => r.relatedSkills.some(rs => missing.includes(getRootSkill(rs))))
          .slice(0, 3);

        return { job, matched, missing, matchPercent, recommendedResources };
      })
      .filter(g => g.matchPercent >= 40 && g.matchPercent < 95 && g.missing.length > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 10);
  }, [jobsData, resourcesData, userSkillsSet, youtubeData]);

  const filtered = gaps.filter(g =>
    !searchTerm ||
    g.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.missing.some(s => s.includes(searchTerm.toLowerCase()))
  );

  const toggleSkill = (key: string) => {
    setExpandedSkills(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  if (userLoading || jobsLoading || resourcesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <p className="text-2xl font-bold text-indigo-700">Analyzing your skill gaps...</p>
        </div>
      </div>
    );
  }

  if (!userSkillsSet.size) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
          <Target className="w-24 h-24 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Add Your Skills First</h2>
          <p className="text-gray-600 text-lg">Go to your profile and add skills to see personalized job gaps!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Close Your Skill Gaps
          </h1>
          <p className="text-2xl text-gray-700">
            You're <span className="text-red-600 font-bold">{gaps.reduce((a, g) => a + g.missing.length, 0)}</span> skills away from your dream job
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
            <input
              type="text"
              placeholder="Search jobs or missing skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white rounded-3xl shadow-xl text-lg focus:ring-4 focus:ring-indigo-300 outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle2 className="w-32 h-32 text-green-500 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-gray-800">You're Fully Qualified!</h2>
            <p className="text-xl text-gray-600 mt-4">No major skill gaps — go apply!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((gap) => (
              <div key={gap.job._id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Job Card */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{gap.job.title}</h3>
                      <p className="text-xl opacity-90">{gap.job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black">{gap.matchPercent}%</div>
                      <div className="text-sm opacity-80">Match</div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Missing Skills */}
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                    {gap.missing.length} Missing Skill{gap.missing.length > 1 ? 's' : ''}
                  </h4>

                  <div className="space-y-6">
                    {gap.missing.map((skill) => {
                      const key = `${gap.job._id}-${skill}`;
                      const isOpen = expandedSkills.has(key);
                      const yt = youtubeData[skill] || [];
                      const courses = gap.recommendedResources.filter(r => 
                        r.relatedSkills.some(rs => getRootSkill(rs) === skill)
                      );

                      return (
                        <div key={skill} className="border-l-4 border-red-500 pl-6">
                          <button
                            onClick={() => toggleSkill(key)}
                            className="w-full text-left flex items-center justify-between py-4 group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <Target className="w-7 h-7 text-red-600" />
                              </div>
                              <div>
                                <h5 className="text-2xl font-bold text-gray-800 capitalize">{skill}</h5>
                                <p className="text-gray-600">Click to learn this skill</p>
                              </div>
                            </div>
                            {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                          </button>

                          {isOpen && (
                            <div className="mt-6 grid md:grid-cols-2 gap-8 pb-8">
                              {/* YouTube Tutorials */}
                              <div>
                                <h6 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                                  <Youtube className="w-6 h-6" fill="currentColor" />
                                  Best YouTube Tutorials
                                </h6>
                                {yt.length > 0 ? (
                                  <div className="space-y-4">
                                    {yt.map((v) => (
                                      <a
                                        key={v.videoId}
                                        href={`https://www.youtube.com/watch?v=${v.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex gap-4 bg-gray-50 p-4 rounded-xl hover:shadow-md transition group"
                                      >
                                        <img src={v.thumbnail} alt="" className="w-32 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                          <h6 className="font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                                            {v.title}
                                          </h6>
                                          <p className="text-sm text-gray-600 mt-1">{v.channel}</p>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <Loader2 className="w-10 h-10 text-gray-400 animate-spin mx-auto mb-3" />
                                    <p className="text-gray-600">Finding best tutorials...</p>
                                  </div>
                                )}
                              </div>

                              {/* Official Courses */}
                              <div>
                                <h6 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
                                  <BookOpen className="w-6 h-6" />
                                  Recommended Courses
                                </h6>
                                {courses.length > 0 ? (
                                  <div className="space-y-3">
                                    {courses.map((c) => (
                                      <a
                                        key={c._id}
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition"
                                      >
                                        <div className="flex justify-between items-center">
                                          <div>
                                            <h6 className="font-bold text-indigo-800">{c.title}</h6>
                                            <p className="text-sm text-indigo-600">{c.platform} • {c.cost || 'Free'}</p>
                                          </div>
                                          <ExternalLink className="w-5 h-5 text-indigo-600" />
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 italic">No curated courses yet</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Apply Button */}
                  {gap.job.applyLink && (
                    <div className="mt-10 text-center">
                      <a
                        href={gap.job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
                      >
                        Apply Now ({gap.matchPercent}% Ready)
                        <ArrowRight className="w-6 h-6" />
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