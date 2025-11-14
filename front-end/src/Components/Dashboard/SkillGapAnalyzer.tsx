import React from 'react';
// Assuming Lucide icons for a modern design
import { 
    Zap, 
    AlertTriangle, 
    BookOpen, 
    ChevronRight, 
    GraduationCap, 
    X 
} from 'lucide-react'; 

// --- TypeScript Interfaces ---

export interface LearningResource {
    name: string;
    link: string;
}

export interface SkillGapAnalyzerProps {
    jobTitle: string;
    missingSkills: string[];
    recommendedResources: LearningResource[];
}

// --- Component ---

const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({ 
    jobTitle, 
    missingSkills, 
    recommendedResources 
}) => {

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-red-500/20 overflow-hidden transform transition-all duration-300">
            
            {/* Header Section: Alert */}
            <div className="flex items-center p-5 bg-red-50 bg-opacity-80 border-b border-red-100/70">
                <Zap className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" /> 
                <div>
                    <h3 className="text-xl font-bold text-red-700">
                        Skill Gap Identified for: <span className="text-gray-800">{jobTitle}</span>
                    </h3>
                    <p className="text-sm text-red-600 mt-1">
                        Here's what you need to master to qualify for this role.
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-8">
                
                {/* 1. Skill Gap List */}
                <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                        Missing Key Skills
                    </h4>
                    
                    <div className="flex flex-wrap gap-3">
                        {missingSkills.map((skill, index) => (
                            <div 
                                key={index}
                                className="flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full font-medium text-sm border border-red-300"
                            >
                                <X className="w-4 h-4 mr-1.5" /> 
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Recommended Learning Resources */}
                <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        <GraduationCap className="w-5 h-5 text-indigo-500 mr-2" />
                        Recommended Learning Path
                    </h4>
                    
                    <ul className="space-y-3">
                        {recommendedResources.map((resource, index) => (
                            <li 
                                key={index} 
                                className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg transition hover:bg-indigo-100 border border-indigo-200"
                            >
                                <span className="flex items-center text-sm font-medium text-indigo-700">
                                    <BookOpen className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0" />
                                    {resource.name} 
                                </span>
                                
                                <a 
                                    href={resource.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    Start Learning
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer / Call to Action */}
             <div className="p-5 bg-gray-50 text-center border-t border-gray-100">
                <button
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg 
                               hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                >
                    View Personalized Learning Plan
                </button>
            </div>
        </div>
    );
};

export default SkillGapAnalyzer;

// --- Example Usage (For testing purposes) ---

/*
const jobExample = "Senior Frontend Developer";
const missing: string[] = ["Redux Toolkit", "TypeScript", "GrapQL"];
const resources: LearningResource[] = [
    { name: "Official Redux Course (Course A)", link: "#" },
    { name: "Advanced TypeScript Playlist (YouTube Playlist B)", link: "https://youtube.com/ts" },
    { name: "Introduction to GraphQL APIs (External Blog)", link: "#" },
];

const App = () => (
    <div className="p-10 bg-gray-100 min-h-screen">
        <div className="max-w-xl mx-auto">
            <SkillGapAnalyzer 
                jobTitle={jobExample} 
                missingSkills={missing} 
                recommendedResources={resources} 
            />
        </div>
    </div>
);
*/