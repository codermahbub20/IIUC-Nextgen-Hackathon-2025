/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Eye, Save, Plus, Trash2, Star, Sparkles,
  FileText, Briefcase, GraduationCap, Code, User, Palette
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

/* ======================== TYPES ======================== */
type Tab = 'MyResumes' | 'Create' | 'Preview';
type Section = 'Personal' | 'Summary' | 'Experience' | 'Education' | 'Skills' | 'Projects';
type TemplateStyle = 'Professional' | 'Modern' | 'Creative';

type PersonalData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  website: string;
};

type ExperienceData = {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorkHere: boolean;
  responsibilities: string;
};

type EducationData = {
  id: number;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
};

type ProjectData = {
  id: number;
  projectName: string;
  projectUrl: string;
  description: string;
  technologiesUsed: string;
};

type Resume = {
  id: number;
  title: string;
  targetRole: string;
  templateStyle: TemplateStyle;
  summary: string;
  personal: PersonalData;
  experience: ExperienceData[];
  education: EducationData[];
  skills: string[];
  projects: ProjectData[];
};

/* ======================== DEFAULT RESUME FACTORY ======================== */
const createNewResume = (): Omit<Resume, 'id'> => ({
  title: '',
  targetRole: '',
  templateStyle: 'Professional',
  summary: '',
  personal: {
    fullName: 'Mahedi Hasan',
    email: 'mahedi@gmail.com',
    phone: '01891474769',
    location: 'Sunamgonj, Sylhet',
    linkedIn: 'https://linkedin.com/in/...',
    website: 'https://...'
  },
  experience: [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'City, State',
      startDate: 'Jan 2020',
      endDate: 'Dec 2022',
      currentlyWorkHere: false,
      responsibilities: 'Led development of scalable web apps using React and Node.js.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'B.Sc. in Computer Science',
      school: 'University of California',
      location: 'City, State',
      graduationDate: 'May 2024',
      gpa: '3.8/4.0'
    }
  ],
  skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  projects: [
    {
      id: 1,
      projectName: 'E-commerce Platform',
      projectUrl: 'https://github.com/...',
      description: 'Built full-stack app with payment integration.',
      technologiesUsed: 'React, Node, MongoDB'
    }
  ]
});

/* ======================== ICON COMPONENTS ======================== */
const Mail = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const Phone = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapPin = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const LinkedIn = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const Globe = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ExternalLink = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ======================== TEMPLATE COMPONENTS ======================== */
const ProfessionalTemplate: React.FC<{ data: Omit<Resume, 'id'> }> = ({ data }) => (
  <div className="bg-white p-12 font-serif text-sm leading-relaxed" style={{ width: '210mm', minHeight: '297mm' }}>
    <header className="mb-8 border-b-2 border-gray-800 pb-4">
      <h1 className="text-4xl font-bold text-gray-900">{data.personal.fullName}</h1>
      <div className="flex flex-wrap gap-4 text-xs mt-2 text-gray-600">
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.phone && <span>• {data.personal.phone}</span>}
        {data.personal.location && <span>• {data.personal.location}</span>}
        {data.personal.linkedIn && <span>• <a href={data.personal.linkedIn} className="underline">LinkedIn</a></span>}
        {data.personal.website && <span>• <a href={data.personal.website} className="underline">Portfolio</a></span>}
      </div>
    </header>

    {data.summary && (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-800">Summary</h2>
        <p className="text-gray-700">{data.summary}</p>
      </section>
    )}

    {data.skills.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-800">Skills</h2>
        <p className="text-gray-700">{data.skills.join(' • ')}</p>
      </section>
    )}

    {data.experience.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-800">Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p className="italic text-gray-600">{exp.company}, {exp.location}</p>
              </div>
              <p className="text-xs italic text-gray-500">
                {exp.startDate} – {exp.currentlyWorkHere ? 'Present' : exp.endDate}
              </p>
            </div>
            <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.responsibilities}</p>
          </div>
        ))}
      </section>
    )}

    {data.education.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-800">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p className="italic text-gray-600">{edu.school}, {edu.location}</p>
            <p className="text-xs italic text-gray-500">
              {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
            </p>
          </div>
        ))}
      </section>
    )}

    {data.projects.length > 0 && (
      <section>
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-800">Projects</h2>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-3">
            <h3 className="font-semibold">{proj.projectName}</h3>
            {proj.projectUrl && <p className="text-xs"><a href={proj.projectUrl} className="underline">{proj.projectUrl}</a></p>}
            <p className="text-gray-700">{proj.description}</p>
            <p className="text-xs italic text-gray-600">Tech: {proj.technologiesUsed}</p>
          </div>
        ))}
      </section>
    )}
  </div>
);

const ModernTemplate: React.FC<{ data: Omit<Resume, 'id'> }> = ({ data }) => (
  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-10 font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
    <header className="mb-8 pb-6 border-b-4 border-indigo-600">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
        {data.personal.fullName}
      </h1>
      <div className="flex flex-wrap gap-4 text-sm mt-3">
        {data.personal.email && <span className="flex items-center gap-1"><Mail /> {data.personal.email}</span>}
        {data.personal.phone && <span className="flex items-center gap-1"><Phone /> {data.personal.phone}</span>}
        {data.personal.location && <span className="flex items-center gap-1"><MapPin /> {data.personal.location}</span>}
      </div>
      <div className="flex gap-4 mt-2">
        {data.personal.linkedIn && <a href={data.personal.linkedIn} className="text-indigo-600 hover:underline flex items-center gap-1"><LinkedIn /> LinkedIn</a>}
        {data.personal.website && <a href={data.personal.website} className="text-indigo-600 hover:underline flex items-center gap-1"><Globe /> Portfolio</a>}
      </div>
    </header>

    {data.summary && (
      <section className="mb-6 bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-indigo-700 mb-2">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>
    )}

    {data.skills.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold text-indigo-700 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span key={i} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-300">
              {s}
            </span>
          ))}
        </div>
      </section>
    )}

    {data.experience.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold text-indigo-700 mb-3">Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-5 bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                <p className="text-indigo-600 font-medium">{exp.company} • {exp.location}</p>
              </div>
              <p className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {exp.startDate} – {exp.currentlyWorkHere ? 'Present' : exp.endDate}
              </p>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.responsibilities}</p>
          </div>
        ))}
      </section>
    )}

    {data.education.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold text-indigo-700 mb-3">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-indigo-600">{edu.school} • {edu.location}</p>
            <p className="text-xs text-gray-600">{edu.graduationDate} {edu.gpa && `• ${edu.gpa}`}</p>
          </div>
        ))}
      </section>
    )}

    {data.projects.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-indigo-700 mb-3">Projects</h2>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {proj.projectName}
              {proj.projectUrl && <a href={proj.projectUrl} className="text-indigo-600"><ExternalLink className="w-4 h-4" /></a>}
            </h3>
            <p className="text-gray-700">{proj.description}</p>
            <p className="text-xs text-indigo-600 mt-1">Tech: {proj.technologiesUsed}</p>
          </div>
        ))}
      </section>
    )}
  </div>
);

const CreativeTemplate: React.FC<{ data: Omit<Resume, 'id'> }> = ({ data }) => (
  <div className="bg-gradient-to-tr from-pink-50 via-purple-50 to-cyan-50 p-8 font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold">
            {data.personal.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-2xl font-bold">{data.personal.fullName}</h1>
        </div>

        <div className="space-y-4 text-sm">
          {data.personal.email && <p className="flex items-center gap-2"><Mail /> {data.personal.email}</p>}
          {data.personal.phone && <p className="flex items-center gap-2"><Phone /> {data.personal.phone}</p>}
          {data.personal.location && <p className="flex items-center gap-2"><MapPin /> {data.personal.location}</p>}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((s, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-medium">
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-5 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-purple-900">{exp.jobTitle}</h3>
                      <p className="text-purple-700 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs bg-purple-200 text-purple-800 px-3 py-1 rounded-full">
                      {exp.startDate} – {exp.currentlyWorkHere ? 'Now' : exp.endDate}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{exp.responsibilities}</p>
                </div>
              ))}
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 bg-gradient-to-r from-cyan-100 to-purple-100 rounded-2xl">
                  <h3 className="font-bold text-purple-900">{edu.degree}</h3>
                  <p className="text-purple-700">{edu.school}</p>
                  <p className="text-xs text-purple-600">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Projects</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl mb-3">
                  <h3 className="font-bold text-purple-900">{proj.projectName}</h3>
                  <p className="text-gray-700 text-sm">{proj.description}</p>
                  <p className="text-xs text-purple-600 mt-1">Tech: {proj.technologiesUsed}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ======================== MAIN COMPONENT ======================== */
const ResumeBuild: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Create');
  const [activeSection, setActiveSection] = useState<Section>('Personal');
  const [newSkill, setNewSkill] = useState('');
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const [resumeData, setResumeData] = useState<Omit<Resume, 'id'>>(createNewResume());
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resumeData.personal.fullName} - Resume`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print { body { -webkit-print-color-background: true; print-color-adjust: exact; } }
    `
  });

  /* ----- Handlers ----- */
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value }
    });
  };

  const handleExperienceChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
      )
    });
  };

  const handleExperienceCheck = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, currentlyWorkHere: e.target.checked, endDate: e.target.checked ? '' : exp.endDate } : exp
      )
    });
  };

  const addExperience = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: newId, jobTitle: '', company: '', location: '', startDate: '', endDate: '', currentlyWorkHere: false, responsibilities: ''
      }]
    });
  };

  const removeExperience = (id: number) => {
    setResumeData({ ...resumeData, experience: resumeData.experience.filter(e => e.id !== id) });
  };

  const addEducation = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: newId, degree: '', school: '', location: '', graduationDate: '', gpa: '' }]
    });
  };

  const removeEducation = (id: number) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter(e => e.id !== id) });
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter(s => s !== skill) });
  };

  const addProject = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { id: newId, projectName: '', projectUrl: '', description: '', technologiesUsed: '' }]
    });
  };

  const removeProject = (id: number) => {
    setResumeData({ ...resumeData, projects: resumeData.projects.filter(p => p.id !== id) });
  };

  const handleSaveResume = () => {
    const newSave: Resume = { ...resumeData, id: Date.now() };
    setSavedResumes([...savedResumes, newSave]);
    alert('Resume saved!');
    setActiveTab('Preview');
  };

  const loadResume = (resume: Resume) => {
    setResumeData(resume);
    setActiveTab('Preview');
  };

  const renderTemplate = () => {
    switch (resumeData.templateStyle) {
      case 'Modern': return <ModernTemplate data={resumeData} />;
      case 'Creative': return <CreativeTemplate data={resumeData} />;
      default: return <ProfessionalTemplate data={resumeData} />;
    }
  };

  return (
    <>
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          #printable-resume, #printable-resume * { visibility: visible; }
          #printable-resume { position: absolute; left: 0; top: 0; width: 210mm; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-2">
              Resume Builder
            </h1>
            <p className="text-lg text-gray-600">Create → Preview → Download</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg no-print">
            {(['MyResumes', 'Create', 'Preview'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {tab === 'MyResumes' && <FileText className="w-5 h-5" />}
                {tab === 'Create' && <Plus className="w-5 h-5" />}
                {tab === 'Preview' && <Eye className="w-5 h-5" />}
                {tab === 'MyResumes' ? 'My Resumes' : tab}
              </button>
            ))}
          </div>

          {/* My Resumes Tab */}
          {activeTab === 'MyResumes' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResumes.length === 0 ? (
                <div className="col-span-full text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No saved resumes yet. Create one!</p>
                </div>
              ) : (
                savedResumes.map(resume => (
                  <motion.div key={resume.id} whileHover={{ scale: 1.02 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg text-indigo-700">{resume.title || 'Untitled'}</h3>
                    <p className="text-sm text-gray-600 mt-1">Style: {resume.templateStyle}</p>
                    <button onClick={() => loadResume(resume)} className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-2 rounded-xl font-medium">
                      Preview
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Create Tab */}
          {activeTab === 'Create' && (
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
                {/* Title & Role */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume Title *</label>
                    <input name="title" value={resumeData.title} onChange={handleGeneralChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Software Engineer Resume" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                    <input name="targetRole" value={resumeData.targetRole} onChange={handleGeneralChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Frontend Developer" />
                  </div>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(['Personal', 'Summary', 'Experience', 'Education', 'Skills', 'Projects'] as Section[]).map(section => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        activeSection === section
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                      {section === 'Personal' && <User className="w-4 h-4" />}
                      {section === 'Summary' && <FileText className="w-4 h-4" />}
                      {section === 'Experience' && <Briefcase className="w-4 h-4" />}
                      {section === 'Education' && <GraduationCap className="w-4 h-4" />}
                      {section === 'Skills' && <Star className="w-4 h-4" />}
                      {section === 'Projects' && <Code className="w-4 h-4" />}
                      {section}
                    </button>
                  ))}
                </div>

                {/* Dynamic Section Content */}
                {activeSection === 'Personal' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {['fullName', 'email', 'phone', 'location', 'linkedIn', 'website'].map(field => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <input
                          name={field}
                          value={(resumeData.personal as any)[field]}
                          onChange={handlePersonalChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                          placeholder={field === 'fullName' ? 'John Doe' : field}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'Summary' && (
                  <div>
                    <textarea
                      name="summary"
                      value={resumeData.summary}
                      onChange={handleGeneralChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl h-32 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Compelling 3-4 sentence summary..."
                    />
                  </div>
                )}

                {activeSection === 'Experience' && (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="border border-gray-200 rounded-xl p-5 relative">
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Job Title" className="px-4 py-3 border rounded-xl" />
                          <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Company" className="px-4 py-3 border rounded-xl" />
                          <input name="location" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Location" className="px-4 py-3 border rounded-xl" />
                          <input name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Start Date" className="px-4 py-3 border rounded-xl" />
                          <input name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="End Date" className="px-4 py-3 border rounded-xl" disabled={exp.currentlyWorkHere} />
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={exp.currentlyWorkHere} onChange={(e) => handleExperienceCheck(exp.id, e)} />
                            <label>Currently work here</label>
                          </div>
                        </div>
                        <textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Key achievements..." className="w-full mt-4 px-4 py-3 border rounded-xl h-24" />
                      </div>
                    ))}
                    <button onClick={addExperience} className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" /> Add Experience
                    </button>
                  </div>
                )}

                {activeSection === 'Education' && (
                  <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="border border-gray-200 rounded-xl p-5 relative">
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input name="degree" value={edu.degree} onChange={(e) => setResumeData({ ...resumeData, education: resumeData.education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed) })} placeholder="Degree" className="px-4 py-3 border rounded-xl" />
                          <input name="school" value={edu.school} onChange={(e) => setResumeData({ ...resumeData, education: resumeData.education.map(ed => ed.id === edu.id ? { ...ed, school: e.target.value } : ed) })} placeholder="School" className="px-4 py-3 border rounded-xl" />
                          <input name="location" value={edu.location} onChange={(e) => setResumeData({ ...resumeData, education: resumeData.education.map(ed => ed.id === edu.id ? { ...ed, location: e.target.value } : ed) })} placeholder="Location" className="px-4 py-3 border rounded-xl" />
                          <input name="graduationDate" value={edu.graduationDate} onChange={(e) => setResumeData({ ...resumeData, education: resumeData.education.map(ed => ed.id === edu.id ? { ...ed, graduationDate: e.target.value } : ed) })} placeholder="Graduation Date" className="px-4 py-3 border rounded-xl" />
                          <input name="gpa" value={edu.gpa} onChange={(e) => setResumeData({ ...resumeData, education: resumeData.education.map(ed => ed.id === edu.id ? { ...ed, gpa: e.target.value } : ed) })} placeholder="GPA (optional)" className="px-4 py-3 border rounded-xl" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" /> Add Education
                    </button>
                  </div>
                )}

                {activeSection === 'Skills' && (
                  <div>
                    <div className="flex gap-2 mb-4">
                      <input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a skill..."
                      />
                      <button onClick={addSkill} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="text-indigo-600 hover:text-indigo-800">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'Projects' && (
                  <div className="space-y-6">
                    {resumeData.projects.map((proj) => (
                      <div key={proj.id} className="border border-gray-200 rounded-xl p-5 relative">
                        <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input name="projectName" value={proj.projectName} onChange={(e) => setResumeData({ ...resumeData, projects: resumeData.projects.map(p => p.id === proj.id ? { ...p, projectName: e.target.value } : p) })} placeholder="Project Name" className="px-4 py-3 border rounded-xl" />
                          <input name="projectUrl" value={proj.projectUrl} onChange={(e) => setResumeData({ ...resumeData, projects: resumeData.projects.map(p => p.id === proj.id ? { ...p, projectUrl: e.target.value } : p) })} placeholder="Project URL (optional)" className="px-4 py-3 border rounded-xl" />
                          <textarea name="description" value={proj.description} onChange={(e) => setResumeData({ ...resumeData, projects: resumeData.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p) })} placeholder="Description" className="md:col-span-2 w-full px-4 py-3 border rounded-xl h-24" />
                          <input name="technologiesUsed" value={proj.technologiesUsed} onChange={(e) => setResumeData({ ...resumeData, projects: resumeData.projects.map(p => p.id === proj.id ? { ...p, technologiesUsed: e.target.value } : p) })} placeholder="Technologies Used" className="md:col-span-2 px-4 py-3 border rounded-xl" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addProject} className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" /> Add Project
                    </button>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-end mt-6">
                <button onClick={handleSaveResume} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
                  <Save className="w-5 h-5" /> Save & Preview
                </button>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'Preview' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              {/* Template Selector */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" /> Choose Template
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Professional', 'Modern', 'Creative'] as TemplateStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => setResumeData({ ...resumeData, templateStyle: style })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        resumeData.templateStyle === style
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                      <div className="text-center">
                        <div className={`w-full h-16 rounded mb-2 ${
                          style === 'Professional' ? 'bg-gray-200' :
                          style === 'Modern' ? 'bg-gradient-to-r from-indigo-200 to-violet-200' :
                          'bg-gradient-to-tr from-pink-200 to-cyan-200'
                        }`}></div>
                        <p className="text-sm font-medium">{style}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* A4 Preview */}
              <div className="flex justify-center">
                <div ref={printRef} id="printable-resume" className="shadow-2xl">
                  {renderTemplate()}
                </div>
              </div>

              <div className="fixed bottom-6 right-6 no-print">
                <button onClick={handlePrint} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all">
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeBuild;