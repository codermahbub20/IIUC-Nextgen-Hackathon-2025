'use client';

import React from 'react';
import { Zap, AlertTriangle, BookOpen, ChevronRight, GraduationCap, X, Sparkles, Clock, ExternalLink } from 'lucide-react';

export interface LearningResource {
  name: string;
  link: string;
  type?: 'video' | 'course' | 'article' | 'book';
  duration?: string;
}

export interface SkillGapAnalyzerProps {
  jobTitle: string;
  missingSkills: string[];
  recommendedResources: LearningResource[];
}

const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  jobTitle,
  missingSkills,
  recommendedResources
}) => {
  const skillCount = missingSkills.length;
  const progress = Math.min(100, (recommendedResources.length / Math.max(skillCount, 1)) * 100);

  return (
    <div className="relative max-w-2xl mx-auto p-6">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-red-400 to-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-400 to-purple-500 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl">
        
        {/* Header: Alert Banner */}
        <div className="relative p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center">
            <div className="mr-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Zap className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                Skill Gap Alert
                <Sparkles className="w-5 h-5 animate-spin" />
              </h3>
              <p className="text-sm opacity-90 mt-1">
                You're <span className="font-bold">{skillCount} skill{skillCount > 1 ? 's' : ''}</span> away from <span className="underline decoration-white/50">{jobTitle}</span>
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="p-6 space-y-8">

          {/* Progress Ring + Stats */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-gray-100"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{recommendedResources.length}</span>
                <span className="text-xs text-gray-500">Resources</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Learning Progress</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {Math.round(progress)}%
              </p>
            </div>
          </div>

          {/* Missing Skills */}
          <div>
            <h4 className="flex items-center text-lg font-bold text-gray-800 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 animate-pulse" />
              Skills to Master
            </h4>
            
            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 rounded-full font-semibold text-sm border border-red-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-red-100 hover:to-orange-100 cursor-default"
                >
                  <X className="inline w-3 h-3 mr-1 text-red-500 group-hover:animate-spin" />
                  {skill}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Resources */}
          <div>
            <h4 className="flex items-center text-lg font-bold text-gray-800 mb-4">
              <GraduationCap className="w-5 h-5 text-indigo-600 mr-2" />
              Your Learning Path
            </h4>
            
            <div className="space-y-3">
              {recommendedResources.map((resource, index) => {
                const isVideo = resource.type === 'video' || resource.link.includes('youtube');
                const isCourse = resource.type === 'course';
                return (
                  <div
                    key={index}
                    className="group relative p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:from-indigo-100/80 hover:to-purple-100/80"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="mr-3 p-2 bg-white/80 rounded-xl shadow-sm">
                          {isVideo ? (
                            <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
                              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div>
                            </div>
                          ) : isCourse ? (
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                          ) : (
                            <ExternalLink className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                            {resource.name}
                          </p>
                          {resource.duration && (
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {resource.duration}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-all group-hover:translate-x-1"
                      >
                        Start
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Ready to close the gap?</p>
              <p className="text-lg font-bold">Get Your Full Learning Roadmap</p>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;