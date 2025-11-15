import { useState } from "react";
import { Loader2, Download, Target, Clock, BookOpen, Rocket, Calendar, CheckCircle2, TrendingUp, ExternalLink } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string; // Added for more informative content
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  topics: string[];
  projects: string[];
  resources: Resource[]; // Added resources for informative learning
}

interface RoadmapData {
  targetRole: string;
  timeframe: string;
  phases: RoadmapPhase[];
  applicationTiming: string;
  beginnerTips?: string[]; // Added for beginners to make it more informative
}

const CareerRoadmapGenerator = () => {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [timeframe, setTimeframe] = useState("3");
  const [learningTime, setLearningTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const generateRoadmap = async () => {
    if (!currentSkills || !targetRole) {
      alert("Please fill in current skills and target role");
      return;
    }
    setIsGenerating(true);
    try {
      // Simulated API call - replace with your actual Supabase function or AI API (e.g., OpenAI/Grok API) to generate dynamic roadmap
      // In a real implementation, pass currentSkills, targetRole, timeframe, learningTime to an AI prompt like:
      // "Generate a detailed career roadmap for a beginner with skills '{currentSkills}' aiming for '{targetRole}' in {timeframe} months, dedicating {learningTime} hours/week. Include phases, topics, projects, online resources with descriptions, and beginner tips."
      await new Promise(resolve => setTimeout(resolve, 2000));
     
      // Enhanced mock data for demonstration: Tailored for beginners, includes resources with descriptions, and beginner tips
      // Assumes user is at beginner level if currentSkills is basic/empty; adjust dynamically in real API
      const isBeginner = currentSkills.toLowerCase().includes("beginner") || currentSkills.trim() === "" || currentSkills.toLowerCase().includes("none");
      const mockRoadmap: RoadmapData = {
        targetRole: targetRole,
        timeframe: `${timeframe} months (dedicating ~${learningTime || '10-20'} hours/week)`,
        phases: [
          {
            phase: "Foundation Building",
            duration: "Month 1",
            topics: [
              "Core concepts and fundamentals",
              "Industry best practices",
              "Development environment setup",
              "Version control with Git"
            ],
            projects: [
              "Personal portfolio website",
              "Basic CRUD application",
              "Open source contribution"
            ],
            resources: [
              { name: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/", description: "Free interactive course for beginners covering HTML, CSS, and basic projects. Perfect for hands-on learning." },
              { name: "MDN Web Docs - Getting Started", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web", description: "Comprehensive guides and tutorials from Mozilla, ideal for understanding web fundamentals with examples." },
              { name: "GitHub Guides", url: "https://guides.github.com/", description: "Step-by-step tutorials on using Git and GitHub, great for version control beginners." }
            ]
          },
          {
            phase: "Intermediate Skills",
            duration: "Month 2-3",
            topics: [
              "Advanced frameworks and libraries",
              "API integration and REST principles",
              "Database design and optimization",
              "Testing and debugging strategies"
            ],
            projects: [
              "Full-stack web application",
              "API development project",
              "Database-driven application"
            ],
            resources: [
              { name: "React Official Tutorial", url: "https://react.dev/learn", description: "Official docs with interactive tutorials for building user interfaces, including state management and hooks." },
              { name: "Postman Learning Center", url: "https://learning.postman.com/", description: "Free resources for learning API development, testing, and integration with hands-on labs." },
              { name: "freeCodeCamp - Relational Database", url: "https://www.freecodecamp.org/learn/relational-database/", description: "Practical course on databases using PostgreSQL, including design and queries." }
            ]
          },
          {
            phase: "Advanced & Specialization",
            duration: "Month 4+",
            topics: [
              "System design and architecture",
              "Performance optimization",
              "Security best practices",
              "Cloud deployment and DevOps"
            ],
            projects: [
              "Scalable production application",
              "Microservices architecture",
              "CI/CD pipeline implementation"
            ],
            resources: [
              { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", description: "GitHub repo with in-depth guides on system design interviews and concepts for scalable apps." },
              { name: "OWASP Security Cheat Sheet", url: "https://cheatsheetseries.owasp.org/", description: "Practical security best practices and checklists for web applications." },
              { name: "AWS Free Tier Tutorials", url: "https://aws.amazon.com/free/", description: "Hands-on tutorials for cloud deployment using AWS, including DevOps basics like CI/CD." }
            ]
          }
        ],
        applicationTiming: "Start applying after completing Phase 2 (Month 3). Continue building projects while interviewing. Focus on companies that value continuous learners. Network on LinkedIn and attend virtual meetups.",
        beginnerTips: isBeginner ? [
          "Start with 1-2 hours daily to avoid burnout.",
          "Join online communities like Reddit's r/learnprogramming for support.",
          "Track progress weekly and adjust based on what works for you.",
          "Focus on understanding concepts before jumping to advanced topics.",
          "Practice consistently – code every day, even if just for 30 minutes."
        ] : undefined
      };
      setRoadmap(mockRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    if (!roadmap) return;
    // Enhanced HTML content for PDF: Added resources section with links and descriptions, beginner tips if applicable
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 40px;
            background: #fff;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3b82f6;
          }
          .header h1 {
            color: #1e40af;
            font-size: 32px;
            margin-bottom: 10px;
          }
          .header .subtitle {
            color: #64748b;
            font-size: 18px;
          }
          .meta-info {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #3b82f6;
          }
          .meta-info h2 {
            color: #1e40af;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .meta-info p {
            color: #475569;
            font-size: 16px;
          }
          .beginner-tips {
            background: #ecfdf5;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #10b981;
          }
          .beginner-tips h2 {
            color: #065f46;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .beginner-tips ul li {
            padding: 8px 0 8px 25px;
            position: relative;
            color: #065f46;
          }
          .beginner-tips li::before {
            content: "💡";
            position: absolute;
            left: 0;
          }
          .phase {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .phase-header {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin-bottom: 0;
          }
          .phase-number {
            display: inline-block;
            width: 35px;
            height: 35px;
            background: white;
            color: #3b82f6;
            border-radius: 50%;
            text-align: center;
            line-height: 35px;
            font-weight: bold;
            margin-right: 10px;
          }
          .phase-title {
            font-size: 20px;
            font-weight: 600;
          }
          .phase-duration {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 5px;
          }
          .phase-content {
            border: 2px solid #e2e8f0;
            border-top: none;
            padding: 20px;
            border-radius: 0 0 8px 8px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section h3 {
            color: #3b82f6;
            font-size: 18px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }
          .section h3::before {
            content: "▶";
            margin-right: 8px;
            font-size: 14px;
          }
          .section ul {
            list-style: none;
            padding-left: 0;
          }
          .section li {
            padding: 8px 0 8px 25px;
            position: relative;
            color: #475569;
          }
          .section li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #3b82f6;
            font-weight: bold;
          }
          .resource li {
            display: flex;
            flex-direction: column;
          }
          .resource a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: bold;
          }
          .resource a:hover {
            text-decoration: underline;
          }
          .resource .desc {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
          }
          .application-section {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
            margin-top: 30px;
          }
          .application-section h2 {
            color: #92400e;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .application-section p {
            color: #78350f;
            line-height: 1.8;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 Career Roadmap</h1>
          <div class="subtitle">Your Personalized Path to Success</div>
        </div>
       
        <div class="meta-info">
          <h2>${roadmap.targetRole}</h2>
          <p><strong>Timeline:</strong> ${roadmap.timeframe}</p>
        </div>
        ${roadmap.beginnerTips ? `
          <div class="beginner-tips">
            <h2>Beginner Tips for Success</h2>
            <ul>
              ${roadmap.beginnerTips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${roadmap.phases.map((phase, idx) => `
          <div class="phase">
            <div class="phase-header">
              <span class="phase-number">${idx + 1}</span>
              <div style="display: inline-block; vertical-align: top;">
                <div class="phase-title">${phase.phase}</div>
                <div class="phase-duration">${phase.duration}</div>
              </div>
            </div>
            <div class="phase-content">
              <div class="section">
                <h3>Topics to Learn</h3>
                <ul>
                  ${phase.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
              </div>
              <div class="section">
                <h3>Project Ideas</h3>
                <ul>
                  ${phase.projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
              </div>
              <div class="section resource">
                <h3>Recommended Resources</h3>
                <ul>
                  ${phase.resources.map(res => `
                    <li>
                      <a href="${res.url}">${res.name}</a>
                      <div class="desc">${res.description}</div>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('')}
        <div class="application-section">
          <h2>📅 When to Start Applying</h2>
          <p>${roadmap.applicationTiming}</p>
        </div>
        <div class="footer">
          Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </body>
      </html>
    `;
    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
     
      // Wait for content to load then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
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
            Get a personalized learning path tailored to your goals and current skill level, with resources and tips for beginners
          </p>
        </div>
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
          </div>
         
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Current Skills (e.g., "beginner" or "none")
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., HTML, CSS, JavaScript, React basics, or 'beginner'"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
              />
            </div>
           
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Target Role
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., Frontend Developer, Full Stack Developer, Data Analyst"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  type="number"
                  min="1"
                  max="12"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  type="number"
                  placeholder="e.g., 10-20"
                  value={learningTime}
                  onChange={(e) => setLearningTime(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={generateRoadmap}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
        </div>
        {/* Roadmap Display */}
        {roadmap && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Download */}
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  Your Personalized Roadmap
                </h2>
                <p className="text-gray-600 mt-1">Follow this path to achieve your career goals</p>
              </div>
              <button
                onClick={downloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
            {/* Overview Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{roadmap.targetRole}</h3>
                  <p className="text-blue-100">Timeline: {roadmap.timeframe}</p>
                </div>
              </div>
            </div>
            {/* Beginner Tips if applicable */}
            {roadmap.beginnerTips && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-200 rounded-full">
                    <BookOpen className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 mb-3">Beginner Tips for Success</h3>
                    <div className="space-y-2">
                      {roadmap.beginnerTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-green-100 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Phases */}
            {roadmap.phases.map((phase, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{phase.phase}</h3>
                      <p className="text-blue-100 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {phase.duration}
                      </p>
                    </div>
                  </div>
                </div>
               
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Topics to Learn
                    </h4>
                    <div className="space-y-2">
                      {phase.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-indigo-600" />
                      Project Ideas
                    </h4>
                    <div className="space-y-2">
                      {phase.projects.map((project, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-green-600" />
                      Recommended Resources
                    </h4>
                    <div className="space-y-2">
                      {phase.resources.map((res, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline font-medium">
                              {res.name}
                            </a>
                            <p className="text-sm text-gray-600 mt-1">{res.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Application Timing */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-200 rounded-full">
                  <Calendar className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">When to Start Applying</h3>
                  <p className="text-amber-800 leading-relaxed text-lg">{roadmap.applicationTiming}</p>
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