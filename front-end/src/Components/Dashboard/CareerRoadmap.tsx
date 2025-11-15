import { useEffect, useState } from "react";
import {
  Loader2,
  Download,
  Target,
  Clock,
  BookOpen,
  Rocket,
  Calendar,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useGetUserQuery } from "../../redux/features/users/usersApi";

interface Resource {
  name: string;
  url: string;
  description: string;
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  topics: string[];
  projects: string[];
  resources: Resource[];
}

interface RoadmapData {
  targetRole: string;
  timeframe: string;
  phases: RoadmapPhase[];
  applicationTiming: string;
  beginnerTips?: string[];
}

const CareerRoadmapGenerator = () => {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [timeframe, setTimeframe] = useState("3");
  const [learningTime, setLearningTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasInitializedSkills, setHasInitializedSkills] = useState(false); // Prevent override after edit

  // Decode JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setUserId(decoded.id || decoded.userId);
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, []);

  // Fetch user data
  const { data: userData, isLoading: userLoading, isSuccess } = useGetUserQuery(userId || "", {
    skip: !userId,
  });

  // Auto-fill current skills ONCE when user data loads
  useEffect(() => {
    if (!userData || hasInitializedSkills || userLoading) return;

    const skills = userData.skills;

    if (skills && Array.isArray(skills) && skills.length > 0) {
      const skillsText = skills.join(", ");
      setCurrentSkills(skillsText);
    } else if (skills === null || skills === undefined || (Array.isArray(skills) && skills.length === 0)) {
      setCurrentSkills("beginner");
    }

    setHasInitializedSkills(true); // Mark as initialized
  }, [userData, userLoading, hasInitializedSkills]);

  const generateRoadmap = async () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      alert("Please fill in current skills and target role");
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isBeginner =
        currentSkills.toLowerCase().includes("beginner") ||
        currentSkills.toLowerCase().includes("none") ||
        currentSkills.trim() === "";

      const mockRoadmap: RoadmapData = {
        targetRole: targetRole,
        timeframe: `${timeframe} months (≈${learningTime || "10-20"} hours/week)`,
        phases: [
          {
            phase: "Foundation Building",
            duration: "Month 1",
            topics: [
              "HTML, CSS & Responsive Design",
              "JavaScript Fundamentals",
              "Git & GitHub Basics",
              "Development Tools Setup",
            ],
            projects: [
              "Personal Portfolio Website",
              "Todo App with Local Storage",
              "Landing Page Clone",
            ],
            resources: [
              {
                name: "freeCodeCamp - Responsive Web Design",
                url: "https://www.freecodecamp.org/learn/responsive-web-design/",
                description: "Free 300+ hour certification with hands-on projects in HTML/CSS.",
              },
              {
                name: "JavaScript.info",
                url: "https://javascript.info/",
                description: "Modern, in-depth JavaScript tutorial from basics to advanced.",
              },
              {
                name: "GitHub Student Developer Pack",
                url: "https://education.github.com/pack",
                description: "Free tools and credits for students (GitHub Pro, Namecheap, etc.).",
              },
            ],
          },
          {
            phase: "Core Framework Mastery",
            duration: "Months 2-3",
            topics: [
              "React / Vue / Next.js (choose one)",
              "State Management (Context, Redux, Pinia)",
              "Routing & Data Fetching",
              "Build Tools (Vite, Webpack)",
            ],
            projects: [
              "Full-Stack E-commerce App",
              "Social Media Dashboard",
              "Job Board with Filters",
            ],
            resources: [
              {
                name: "React Official Docs",
                url: "https://react.dev/learn",
                description: "The best way to learn React – interactive & up-to-date.",
              },
              {
                name: "The Net Ninja (YouTube)",
                url: "https://www.youtube.com/c/TheNetNinja",
                description: "Clear, project-based tutorials on React, Node, Firebase, etc.",
              },
              {
                name: "Frontend Masters",
                url: "https://frontendmasters.com/",
                description: "Professional courses (free intro paths available).",
              },
            ],
          },
          {
            phase: "Advanced & Job-Ready",
            duration: "Month 4+",
            topics: [
              "TypeScript",
              "Testing (Jest, React Testing Library)",
              "Performance Optimization",
              "System Design Basics",
              "Portfolio & Resume Building",
            ],
            projects: [
              "SaaS App with Authentication",
              "Real-time Chat Application",
              "Open Source Contribution",
            ],
            resources: [
              {
                name: "TypeScript Handbook",
                url: "https://www.typescriptlang.org/docs/",
                description: "Official guide – learn TypeScript the right way.",
              },
              {
                name: "Roadmap.sh",
                url: "https://roadmap.sh",
                description: "Beautiful visual roadmaps for frontend, backend, DevOps, etc.",
              },
              {
                name: "LeetCode + Pramp",
                url: "https://leetcode.com/ + https://www.pramp.com/",
                description: "Practice interviews and coding problems.",
              },
            ],
          },
        ],
        applicationTiming:
          "Start applying after Month 3. Focus on junior roles, startups, and companies with strong learning culture. Tailor resume to each job. Build a strong GitHub & LinkedIn presence.",
        beginnerTips: isBeginner
          ? [
              "Consistency > intensity: code every day, even 30 minutes.",
              "Build projects early – they are your new resume.",
              "Don’t just watch tutorials – type every line of code.",
              "Join communities: Discord, Reddit (r/learnprogramming), Twitter tech spaces.",
              "Track progress weekly – celebrate small wins!",
            ]
          : undefined,
      };

      setRoadmap(mockRoadmap);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (!roadmap) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html><head><meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: white; color: #333; line-height: 1.6; }
        .header { text-align: center; border-bottom: 4px solid #3b82f6; padding-bottom: 20px; margin-bottom: 40px; }
        h1 { color: #1e40af; font-size: 36px; }
        .meta { background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 5px solid #3b82f6; }
        .tips { background: #ecfdf5; padding: 20px; border-radius: 12px; border-left: 5px solid #10b981; margin: 30px 0; }
        .phase { margin: 40px 0; page-break-inside: avoid; }
        .phase-header { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 20px; border-radius: 12px 12px 0 0; }
        .phase-title { font-size: 24px; display: inline-block; }
        .phase-duration { opacity: 0.9; font-size: 16px; }
        .phase-content { border: 2px solid #e2e8f0; border-top: none; padding: 25px; border-radius: 0 0 12px 12px; }
        .section h3 { color: #3b82f6; margin: 20px 0 15px; font-size: 20px; }
        ul { padding-left: 20px; }
        li { margin: 10px 0; position: relative; padding-left: 10px; }
        li:before { content: "✓"; color: #3b82f6; position: absolute; left: -20px; font-weight: bold; }
        a { color: #3b82f6; text-decoration: none; font-weight: 600; }
        .desc { font-size: 14px; color: #64748b; margin-top: 4px; }
        .application { background: #fffbeb; padding: 25px; border-radius: 12px; border-left: 5px solid #f59e0b; margin-top: 40px; }
      </style></head><body>
        <div class="header"><h1>Career Roadmap</h1><p>Your Personalized Path to ${roadmap.targetRole}</p></div>
        <div class="meta"><h2>${roadmap.targetRole}</h2><p><strong>Timeline:</strong> ${roadmap.timeframe}</p></div>
        ${roadmap.beginnerTips ? `<div class="tips"><h2>Beginner Success Tips</h2><ul>${roadmap.beginnerTips.map(t => `<li>${t}</li>`).join("")}</ul></div>` : ""}
        ${roadmap.phases.map((p, i) => `
          <div class="phase">
            <div class="phase-header">
              <strong style="font-size:28px;">${i + 1}</strong> <span class="phase-title">${p.phase}</span>
              <div class="phase-duration">${p.duration}</div>
            </div>
            <div class="phase-content">
              <div class="section"><h3>Topics</h3><ul>${p.topics.map(t => `<li>${t}</li>`).join("")}</ul></div>
              <div class="section"><h3>Projects</h3><ul>${p.projects.map(pr => `<li>${pr}</li>`).join("")}</ul></div>
              <div class="section"><h3>Resources</h3><ul>${p.resources.map(r => `<li><a href="${r.url}">${r.name}</a><div class="desc">${r.description}</div></li>`).join("")}</ul></div>
            </div>
          </div>`).join("")}
        <div class="application"><h2>When to Start Applying</h2><p>${roadmap.applicationTiming}</p></div>
        <p style="text-align:center; color:#94a3b8; margin-top:50px;">Generated on ${new Date().toLocaleDateString()}</p>
      </body></html>
    `;

    const printWindow = window.open("", "", "width=900,height=700");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 300);
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Rocket className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Career Roadmap Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Personalized learning path based on your current skills and goals
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Your Career Details</h2>
          </div>

          <div className="space-y-6">
            {/* Current Skills */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Current Skills
                {userLoading && <span className="text-blue-500 text-xs">(Loading your profile...)</span>}
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder={userLoading ? "Fetching your skills..." : "e.g., JavaScript, React, Node.js or 'beginner'"}
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                disabled={userLoading}
              />
              {isSuccess && userData?.skills?.length > 0 && !userLoading && (
                <p className="text-xs text-green-600 mt-1">Loaded {userData.skills.length} skill(s) from your profile</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Target Role
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., Frontend Developer, Full-Stack Engineer, UI/UX Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Timeframe (months)
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Hours per Week (optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 15"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  value={learningTime}
                  onChange={(e) => setLearningTime(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={generateRoadmap}
              disabled={isGenerating || userLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  <Rocket className="w-6 h-6" />
                  Generate Personalized Roadmap
                </>
              )}
            </button>
          </div>
        </div>

        {/* Roadmap Display */}
        {roadmap && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <TrendingUp className="w-9 h-9 text-green-600" />
                  Your Personalized Roadmap
                </h2>
                <p className="text-gray-600">Tailored for your skills and goals</p>
              </div>
              <button
                onClick={downloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-5 h-5" />
                Download as PDF
              </button>
            </div>

            {/* Rest of your beautiful roadmap rendering (unchanged) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{roadmap.targetRole}</h3>
                  <p className="text-blue-100 text-lg">{roadmap.timeframe}</p>
                </div>
              </div>
            </div>

            {roadmap.beginnerTips && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-200 rounded-full">
                    <BookOpen className="w-7 h-7 text-green-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 mb-4">Beginner Success Tips</h3>
                    <div className="space-y-3">
                      {roadmap.beginnerTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-green-100 rounded-xl">
                          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                          <span className="text-green-800 font-medium">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phases */}
            {roadmap.phases.map((phase, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{phase.phase}</h3>
                      <p className="text-blue-100 flex items-center gap-2 mt-1">
                        <Clock className="w-5 h-5" />
                        {phase.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      Topics to Master
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {phase.topics.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-purple-600" />
                      Project Ideas
                    </h4>
                    <div className="space-y-3">
                      {phase.projects.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-purple-600" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-3">
                      <ExternalLink className="w-6 h-6 text-green-600" />
                      Best Resources
                    </h4>
                    <div className="space-y-4">
                      {phase.resources.map((r, i) => (
                        <div key={i} className="p-5 bg-green-50 rounded-xl border border-green-200">
                          <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 hover:underline flex items-center gap-2">
                            {r.name} <ExternalLink className="w-4 h-4" />
                          </a>
                          <p className="text-sm text-gray-600 mt-2">{r.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-amber-200 rounded-full">
                  <Calendar className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">When to Start Applying</h3>
                  <p className="text-amber-800 text-lg leading-relaxed">{roadmap.applicationTiming}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRoadmapGenerator;