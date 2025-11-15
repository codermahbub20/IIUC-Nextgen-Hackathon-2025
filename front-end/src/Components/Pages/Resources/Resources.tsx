/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Search,  Play, ExternalLink, BookOpen, Star,  FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetAllResourcesQuery } from '../../../redux/features/Resources/resourcesApi';

import axios from 'axios';
import { useGetUserQuery } from '../../../redux/features/users/usersApi';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface LearningResource {
  _id: string;
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost: 'Free' | 'Paid';
  type: 'course' | 'youtube' | 'documentation';
  thumbnail?: string;
  duration?: string;
  viewCount?: string;
  publishedAt?: string;
}

interface Rating { resourceId: string; rating: number; timestamp: number; }
const STORAGE_KEY = 'resource_ratings';

// Next Skill Suggestions based on current skills
const SKILL_PROGRESSION: Record<string, string[]> = {
  'HTML': ['CSS', 'JavaScript', 'Tailwind CSS'],
  'CSS': ['Tailwind CSS', 'JavaScript', 'React'],
  'JavaScript': ['React', 'TypeScript', 'Node.js'],
  'React': ['Next.js', 'TypeScript', 'Redux'],
  'Node.js': ['Express.js', 'MongoDB', 'TypeScript'],
  'MongoDB': ['Mongoose', 'Next.js', 'Authentication'],
  'Tailwind CSS': ['Framer Motion', 'Responsive Design', 'React'],
};

const StarRating: React.FC<{ rating: number; onRate: (r: number) => void; readonly?: boolean; size?: 'sm' | 'md' }> = ({ rating, onRate, readonly = false, size = 'md' }) => {
  const [hover, setHover] = useState(0);
  const current = hover || rating;
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: readonly ? 1 : 1.2 }}
          whileTap={{ scale: readonly ? 1 : 0.9 }}
          onClick={() => !readonly && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
        >
          <Star className={`${sizeClass} ${star <= current ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </motion.button>
      ))}
    </div>
  );
};

const YouTubeCard: React.FC<{ video: any; userRating: number; onRate: (id: string, r: number) => void }> = ({ video, userRating, onRate }) => {
  const videoId = video.id?.videoId || video._id.replace('yt_', '');
  const thumbnail = video.snippet?.thumbnails?.high?.url ||
                   video.snippet?.thumbnails?.medium?.url ||
                   video.thumbnail ||
                   `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group relative h-full">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-lg h-full flex flex-col">
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="block relative">
          <img src={thumbnail} alt={video.title} className="w-full h-48 object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">YouTube</span>
          </div>
        </a>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {video.title || video.snippet?.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{video.snippet?.channelTitle || 'YouTube'}</p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
            {video.viewCount && <span>{video.viewCount}</span>}
            {video.publishedAt && <span>• {new Date(video.publishedAt).toLocaleDateString()}</span>}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {video.relatedSkills?.slice(0, 3).map((skill: string) => (
              <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 space-y-3">
            <StarRating rating={userRating} onRate={(r) => onRate(video._id, r)} />
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md">
              Watch Video <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ResourceCard: React.FC<{ resource: LearningResource; userRating: number; onRate: (id: string, r: number) => void }> = ({ resource, userRating, onRate }) => {
  if (resource.type === 'youtube') return <YouTubeCard video={resource} userRating={userRating} onRate={onRate} />;

  const icons: Record<string, JSX.Element> = {
    'documentation': <FileText className="w-8 h-8 text-blue-600" />,
    'course': <BookOpen className="w-8 h-8 text-indigo-600" />,
  };

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group relative h-full">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2 flex items-center justify-center shadow-md">
              {icons[resource.type] || <BookOpen className="w-8 h-8 text-white" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600">{resource.platform}</p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${resource.cost === 'Free' ? 'bg-green-600' : 'bg-purple-600'}`}>
            {resource.cost}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {resource.relatedSkills?.slice(0, 4).map((skill) => (
            <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <StarRating rating={userRating} onRate={(r) => onRate(resource._id, r)} />
          <a href={resource.url} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md">
            {resource.type === 'documentation' ? 'Read Docs' : 'Start Learning'} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Resources: React.FC = () => {
  const { data, isLoading } = useGetAllResourcesQuery({});
  const [allItems, setAllItems] = useState<LearningResource[]>([]);
  const [filteredItems, setFilteredItems] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'course' | 'youtube' | 'documentation'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState<Record<string, Rating[]>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const itemsPerPage = 6;

  const { data: userData } = useGetUserQuery(userId || "", { skip: !userId });
  const userSkills = Array.isArray(userData?.data?.skills) ? userData.data.skills : [];

  // Get suggested next skills
  const suggestedSkills = Array.from(new Set(
    userSkills.flatMap((skill: string | number) => SKILL_PROGRESSION[skill] || [])
      .filter((s: any) => !userSkills.includes(s))
  )).slice(0, 5);

  // Decode token
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserId(decoded.id);
      } catch (e) { console.error(e); }
    }
  }, []);

  // Load ratings
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const map: Record<string, Rating[]> = {};
        parsed.forEach((r: Rating) => {
          if (!map[r.resourceId]) map[r.resourceId] = [];
          map[r.resourceId].push(r);
        });
        setRatings(map);
      } catch (e) { console.error(e); }
    }
  }, []);

  // Save ratings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.values(ratings).flat()));
  }, [ratings]);

  // Fetch fresh YouTube videos on every mount
  useEffect(() => {
    const fetchFreshContent = async () => {
      const dbResources = (data?.data || []).map((r: any) => ({
        ...r,
        type: r.platform.toLowerCase().includes('youtube') ? 'youtube' : 
              r.platform.toLowerCase().includes('docs') ? 'documentation' : 'course'
      }));

      let youtubeVideos: LearningResource[] = [];

      if (YOUTUBE_API_KEY && userSkills.length > 0) {
        const queries = userSkills.slice(0, 3).map((s: any) => `${s} tutorial 2025`);
        const videoIds: string[] = [];

        for (const q of queries) {
          try {
            const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
              params: { part: 'snippet', q, type: 'video', maxResults: 4, key: YOUTUBE_API_KEY }
            });

            res.data.items.forEach((item: any) => {
              if (item.id?.videoId) videoIds.push(item.id.videoId);
            });
          } catch (e) { console.warn('YouTube search failed', e); }
        }

        if (videoIds.length > 0) {
          try {
            const details = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
              params: { part: 'contentDetails,statistics,snippet', id: videoIds.join(','), key: YOUTUBE_API_KEY }
            });

            youtubeVideos = details.data.items.map((item: any) => ({
              _id: `yt_${item.id}`,
              title: item.snippet.title,
              platform: 'YouTube',
              url: `https://www.youtube.com/watch?v=${item.id}`,
              relatedSkills: userSkills,
              cost: 'Free' as const,
              type: 'youtube' as const,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
              duration: item.contentDetails?.duration ? formatDuration(item.contentDetails.duration) : null,
              viewCount: item.statistics?.viewCount ? formatViews(item.statistics.viewCount) : null,
              publishedAt: item.snippet.publishedAt,
            }));
          } catch (e) { console.warn('YouTube details failed', e); }
        }
      }

      // Shuffle + limit for freshness
      const combined = [...dbResources, ...youtubeVideos];
      setAllItems(combined.sort(() => Math.random() - 0.5));
    };

    fetchFreshContent();
  }, [data, userSkills, YOUTUBE_API_KEY]);

  const formatDuration = (iso: string) => {
    const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return null;
    const h = match[1] ? match[1].replace('H', '') + ':' : '';
    const m = (match[2] || '0M').replace('M', '').padStart(2, '0');
    const s = (match[3] || '0S').replace('S', '').padStart(2, '0');
    return `${h}${m}:${s}`;
  };

  const formatViews = (n: string) => {
    const num = parseInt(n);
    return num > 1000000 ? `${(num / 1000000).toFixed(1)}M` : num > 1000 ? `${(num / 1000).toFixed(1)}K` : num;
  };

  // Filter
  useEffect(() => {
    let items = allItems;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(term) || i.relatedSkills?.some(s => s.toLowerCase().includes(term)));
    }

    if (selectedSkill) {
      items = items.filter(i => i.relatedSkills?.includes(selectedSkill));
    }

    if (selectedType !== 'all') {
      items = items.filter(i => i.type === selectedType);
    }

    setFilteredItems(items);
    setCurrentPage(1);
  }, [allItems, searchTerm, selectedSkill, selectedType]);

  const allSkills = [...new Set(allItems.flatMap(i => i.relatedSkills || []))].sort();

  const handleRating = (id: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [id]: [{ resourceId: id, rating, timestamp: Date.now() }]
    }));
  };

  const getUserRating = (id: string) => ratings[id]?.[0]?.rating || 0;

  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Smart Learning Hub
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {userSkills.length > 0 ? `Personalized for your skills: ${userSkills.join(', ')}` : 'Discover courses, videos & docs'}
          </p>
        </motion.div>

        {/* Next Skill Suggestion */}
        {suggestedSkills.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold text-purple-900">Next Skills to Learn</h3>
                <p className="text-purple-700">Based on your current skills, consider learning:</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  {suggestedSkills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search resources..." className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur rounded-2xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex gap-3">
            <select value={selectedType} onChange={e => setSelectedType(e.target.value as any)}
              className="px-5 py-4 bg-white/80 backdrop-blur rounded-2xl border focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Resources</option>
              <option value="course">Courses</option>
              <option value="youtube">YouTube Videos</option>
              <option value="documentation">Documentation</option>
            </select>

            <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}
              className="px-5 py-4 bg-white/80 backdrop-blur rounded-2xl border focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">All Skills</option>
              {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          Showing <strong className="text-indigo-700">{filteredItems.length}</strong> resources
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="h-full">
              <ResourceCard resource={item} userRating={getUserRating(item._id)} onRate={handleRating} />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-11 h-11 rounded-xl font-medium transition-all ${p === currentPage ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-white hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;