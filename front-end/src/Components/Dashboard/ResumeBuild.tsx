import React, { useState, useRef } from 'react';

// --- Types ---
type Tab = 'MyResumes' | 'Create' | 'Preview';
type Section = 'Personal' | 'Summary' | 'Experience' | 'Education' | 'Skills' | 'Projects';

// Data structure types based on your images
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

// Type for the entire resume object
type Resume = {
  id: number;
  title: string;
  targetRole: string;
  templateStyle: string;
  summary: string;
  personal: PersonalData;
  experience: ExperienceData[];
  education: EducationData[];
  skills: string[];
  projects: ProjectData[];
};

// --- Helper Components ---

// Reusable Form Field
interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, placeholder, required, disabled }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      {label} {required && '*'}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

// Delete Icon
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500 hover:text-red-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.578 0a48.108 48.108 0 0 1-3.478-.397m15.556 0a48.108 48.108 0 0 0-3.478-.397m-4.908 0a48.108 48.108 0 0 1-3.478-.397" />
  </svg>
);

// Plus Icon
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);


// --- Section Components (for 'Create' Tab) ---

// Personal Section Component
const PersonalSection: React.FC<{ data: PersonalData; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      <span className="mr-2">👤</span> Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Full Name" name="fullName" value={data.fullName} onChange={onChange} required />
      <FormField label="Email" name="email" value={data.email} onChange={onChange} required />
      <FormField label="Phone" name="phone" value={data.phone} onChange={onChange} placeholder="+1 (555) 123-4567" />
      <FormField label="Location" name="location" value={data.location} onChange={onChange} placeholder="City, State" />
      <FormField label="LinkedIn URL" name="linkedIn" value={data.linkedIn} onChange={onChange} placeholder="https://linkedin.com/in/..." />
      <FormField label="Website/Portfolio" name="website" value={data.website} onChange={onChange} placeholder="https://..." />
    </div>
  </div>
);

// Experience Section Component
const ExperienceSection: React.FC<{
  items: ExperienceData[];
  onChange: (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheck: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}> = ({ items, onChange, onCheck, onAdd, onRemove }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold flex items-center">
        <span className="mr-2">💼</span> Work Experience
      </h3>
      <button onClick={onAdd} className="bg-gray-800 text-white px-4 py-2 rounded font-medium flex items-center hover:bg-gray-700">
        <PlusIcon /> <span className="ml-1">Add Experience</span>
      </button>
    </div>
    {items.map((exp, index) => (
      <div key={exp.id} className="border rounded p-4 mb-4">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-lg mb-4">Experience {index + 1}</h4>
          <button onClick={() => onRemove(exp.id)} className="p-1">
            <DeleteIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => onChange(exp.id, e)} placeholder="e.g., Software Engineer" />
          <FormField label="Company" name="company" value={exp.company} onChange={(e) => onChange(exp.id, e)} placeholder="e.g., Tech Corp" />
          <FormField label="Location" name="location" value={exp.location} onChange={(e) => onChange(exp.id, e)} placeholder="City, State" />
          <FormField label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => onChange(exp.id, e)} placeholder="Jan 2020" />
          <FormField label="End Date" name="endDate" value={exp.endDate} onChange={(e) => onChange(exp.id, e)} placeholder="Dec 2022" disabled={exp.currentlyWorkHere} />
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="currentlyWorkHere"
              id={`current-${exp.id}`}
              checked={exp.currentlyWorkHere}
              onChange={(e) => onCheck(exp.id, e)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">I currently work here</label>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Responsibilities & Achievements</label>
            <textarea
              name="responsibilities"
              value={exp.responsibilities}
              onChange={(e) => onChange(exp.id, e)}
              className="w-full border rounded px-3 py-2 min-h-[84px]"
              placeholder="Start with an action verb (Led, Developed, Managed...)"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Education Section Component
const EducationSection: React.FC<{
  items: EducationData[];
  onChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}> = ({ items, onChange, onAdd, onRemove }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold flex items-center">
        <span className="mr-2">🎓</span> Education
      </h3>
      <button onClick={onAdd} className="bg-gray-800 text-white px-4 py-2 rounded font-medium flex items-center hover:bg-gray-700">
        <PlusIcon /> <span className="ml-1">Add Education</span>
      </button>
    </div>
    {items.map((edu, index) => (
      <div key={edu.id} className="border rounded p-4 mb-4">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-lg mb-4">Education {index + 1}</h4>
          <button onClick={() => onRemove(edu.id)} className="p-1">
            <DeleteIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Degree" name="degree" value={edu.degree} onChange={(e) => onChange(edu.id, e)} placeholder="e.g., Bachelor of Science..." />
          <FormField label="School/University" name="school" value={edu.school} onChange={(e) => onChange(edu.id, e)} placeholder="e.g., University of California" />
          <FormField label="Location" name="location" value={edu.location} onChange={(e) => onChange(edu.id, e)} placeholder="City, State" />
          <FormField label="Graduation Date" name="graduationDate" value={edu.graduationDate} onChange={(e) => onChange(edu.id, e)} placeholder="May 2024" />
          <FormField label="GPA (Optional)" name="gpa" value={edu.gpa} onChange={(e) => onChange(edu.id, e)} placeholder="3.8/4.0" />
        </div>
      </div>
    ))}
  </div>
);

// Skills Section Component
const SkillsSection: React.FC<{
  skills: string[];
  newSkill: string;
  onSkillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (skillToRemove: string) => void;
}> = ({ skills, newSkill, onSkillChange, onAdd, onRemove }) => (
  <div>
    <h3 className="text-xl font-semibold flex items-center mb-4">
      <span className="mr-2">🏅</span> Skills
    </h3>
    <div className="flex items-center mb-4">
      <input
        value={newSkill}
        onChange={onSkillChange}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        className="w-full border rounded-l px-3 py-2"
        placeholder="Add a skill (e.g., JavaScript, Project Management)"
      />
      <button onClick={onAdd} className="bg-gray-800 text-white p-3 rounded-r hover:bg-gray-700">
        <PlusIcon />
      </button>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {skills.map(skill => (
        <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center">
          {skill}
          <button onClick={() => onRemove(skill)} className="ml-2 text-gray-600 hover:text-gray-900">
            ×
          </button>
        </span>
      ))}
    </div>
    <p className="text-xs text-gray-500">Tip: Include both technical skills (languages, tools) and soft skills (communication, leadership).</p>
  </div>
);

// Projects Section Component
const ProjectsSection: React.FC<{
  items: ProjectData[];
  onChange: (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}> = ({ items, onChange, onAdd, onRemove }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold flex items-center">
        <span className="mr-2">{"</>"}</span> Projects
      </h3>
      <button onClick={onAdd} className="bg-gray-800 text-white px-4 py-2 rounded font-medium flex items-center hover:bg-gray-700">
        <PlusIcon /> <span className="ml-1">Add Project</span>
      </button>
    </div>
    {items.map((proj, index) => (
      <div key={proj.id} className="border rounded p-4 mb-4">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-lg mb-4">Project {index + 1}</h4>
          <button onClick={() => onRemove(proj.id)} className="p-1">
            <DeleteIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Project Name" name="projectName" value={proj.projectName} onChange={(e) => onChange(proj.id, e)} placeholder="e.g., E-commerce Website" />
          <FormField label="Project URL (Optional)" name="projectUrl" value={proj.projectUrl} onChange={(e) => onChange(proj.id, e)} placeholder="https://github.com/..." />
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={proj.description}
              onChange={(e) => onChange(proj.id, e)}
              className="w-full border rounded px-3 py-2 min-h-[84px]"
              placeholder="Describe what the project does and your role in it"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Technologies Used</label>
            <input
              name="technologiesUsed"
              value={proj.technologiesUsed}
              onChange={(e) => onChange(proj.id, e)}
              className="w-full border rounded px-3 py-2"
              placeholder="Add technology (e.g., React, Python)"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- NEW: 'My Resumes' Tab Component ---
const MyResumesTab: React.FC<{ resumes: Resume[]; onSelect: (resume: Resume) => void; }> = ({ resumes, onSelect }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
    {resumes.length === 0 ? (
      <div className="text-center text-gray-500 p-8 bg-white border rounded">
        Your saved resumes will appear here.
      </div>
    ) : (
      <div className="space-y-4">
        {resumes.map(resume => (
          <div key={resume.id} className="p-4 border rounded bg-white flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-green-700">{resume.title || 'Untitled Resume'}</h3>
              <p className="text-sm text-gray-600">Target Role: {resume.targetRole || 'N/A'}</p>
            </div>
            <button
              onClick={() => onSelect(resume)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 border border-gray-300 font-medium"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// --- NEW: 'Preview' Tab Component ---
const ResumePreview: React.FC<{ data: Omit<Resume, 'id'> }> = ({ data }) => {
  // Helper component for consistent preview sections
  const PreviewSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-3 uppercase tracking-wide">
        {title}
      </h2>
      <div className="text-sm">{children}</div>
    </div>
  );

  return (
    <div className="bg-white border rounded p-8 shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">{data.personal.fullName}</h1>
        <p className="text-md text-gray-600 mt-2">
          {data.personal.email}
          {data.personal.phone && ` | ${data.personal.phone}`}
          {data.personal.location && ` | ${data.personal.location}`}
        </p>
        <p className="text-md text-blue-600">
          <a href={data.personal.linkedIn} target="_blank" rel="noreferrer">{data.personal.linkedIn}</a>
          {data.personal.website && ' | '}
          {data.personal.website && <a href={data.personal.website} target="_blank" rel="noreferrer">{data.personal.website}</a>}
        </p>
      </div>

      {/* Summary */}
      {data.summary && (
        <PreviewSection title="Professional Summary">
          <p>{data.summary}</p>
        </PreviewSection>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <PreviewSection title="Skills">
          <p className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span key={skill} className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </p>
        </PreviewSection>
      )}
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <PreviewSection title="Work Experience">
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
              <p className="font-medium text-gray-700">{exp.company} | {exp.location}</p>
              <p className="text-sm text-gray-500 italic">
                {exp.startDate} – {exp.currentlyWorkHere ? 'Present' : exp.endDate}
              </p>
              <p className="mt-1 whitespace-pre-line">{exp.responsibilities}</p>
            </div>
          ))}
        </PreviewSection>
      )}
      
      {/* Education */}
      {data.education.length > 0 && (
        <PreviewSection title="Education">
          {data.education.map(edu => (
            <div key={edu.id} className="mb-3">
              <h3 className="text-lg font-bold">{edu.degree}</h3>
              <p className="font-medium text-gray-700">{edu.school} | {edu.location}</p>
              <p className="text-sm text-gray-500 italic">
                Graduated: {edu.graduationDate}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </PreviewSection>
      )}
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <PreviewSection title="Projects">
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-4">
              <h3 className="text-lg font-bold">{proj.projectName}</h3>
              {proj.projectUrl && (
                 <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                   {proj.projectUrl}
                 </a>
              )}
              <p className="mt-1">{proj.description}</p>
              <p className="mt-1 text-sm"><span className="font-medium">Technologies:</span> {proj.technologiesUsed}</p>
            </div>
          ))}
        </PreviewSection>
      )}
    </div>
  );
};


// --- Main Resume Build Component ---

// Default state for a new resume
const createNewResume = (): Omit<Resume, 'id'> => ({
  title: '',
  targetRole: '',
  templateStyle: 'Professional',
  summary: '',
  personal: {
    fullName: 'Mahedi Hasan',
    email: 'mahedi@gmail.com',
    phone: '01891474769',
    location: 'Sunamgonj, Sylhet,',
    linkedIn: 'https://linkedin.com/in/...',
    website: 'https://...'
  },
  experience: [
    { id: 1, jobTitle: 'Software Engineer', company: 'Tech Corp', location: 'City, State', startDate: 'Jan 2020', endDate: 'Dec 2022', currentlyWorkHere: false, responsibilities: 'Start with an action verb (Led, Developed, Managed...)' }
  ],
  education: [
    { id: 1, degree: 'Bachelor of Science in Computer Science', school: 'University of California', location: 'City, State', graduationDate: 'May 2024', gpa: '3.8/4.0' }
  ],
  skills: ['javascript', 'Nodejs', 'C++'],
  projects: [
    { id: 1, projectName: 'E-commerce Website', projectUrl: 'https://github.com/...', description: 'Describe what the project does and your role in it', technologiesUsed: 'React, Python' }
  ]
});

const ResumeBuild: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Create');
  const [activeSection, setActiveSection] = useState<Section>('Personal');
  const [newSkill, setNewSkill] = useState('');
  
  // NEW: State to hold all saved resumes
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);

  // This state now holds the *currently active* resume being edited
  const [resumeData, setResumeData] = useState(createNewResume());

  // NEW: Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value }
    });
  };

  // --- Experience Handlers ---
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
        exp.id === id ? { ...exp, currentlyWorkHere: e.target.checked, endDate: e.target.checked ? 'Present' : '' } : exp
      )
    });
  };

  const addExperience = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: newId, jobTitle: '', company: '', location: '', startDate: '', endDate: '', currentlyWorkHere: false, responsibilities: '' }
      ]
    });
  };

  const removeExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  // --- Education Handlers ---
  const handleEducationChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
      )
    });
  };

  const addEducation = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: newId, degree: '', school: '', location: '', graduationDate: '', gpa: '' }
      ]
    });
  };

  const removeEducation = (id: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  // --- Skills Handlers ---
  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // --- Project Handlers ---
  const handleProjectChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, [e.target.name]: e.target.value } : proj
      )
    });
  };

  const addProject = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newId, projectName: '', projectUrl: '', description: '', technologiesUsed: '' }
      ]
    });
  };

  const removeProject = (id: number) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };

  // --- NEW: UPLOAD, SAVE, and LOAD Handlers ---

  // Triggers the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handles the file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Here you would add logic to parse the uploaded resume (e.g., PDF, DOCX)
      // This is a complex task and would require a library or API.
      // For now, we'll just log it.
    }
  };

  // Saves the current resumeData to the savedResumes list
  const handleSaveResume = () => {
    const newSave: Resume = {
      ...resumeData,
      id: Date.now() // Give it a unique ID
    };
    setSavedResumes([...savedResumes, newSave]);
    alert('Resume saved!');
    setActiveTab('MyResumes'); // Switch to My Resumes tab after saving
  };
  
  // Loads a saved resume back into the editor
  const loadResume = (resumeToLoad: Resume) => {
    setResumeData(resumeToLoad); // Load the data
    setActiveTab('Create'); // Switch to the Create tab to edit
    setActiveSection('Personal'); // Go back to the first section
  };


  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">AI Resume Builder</h1>
      <p className="mb-6 text-gray-600">Create and optimize professional resumes with AI assistance</p>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 border-b bg-white rounded-t-lg">
        {(['MyResumes', 'Create', 'Preview'] as Tab[]).map(tab => (
          <button
            key={tab}
            className={`py-2 px-6 ${activeTab === tab ? 'border-b-2 border-green-500 font-bold text-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'MyResumes' ? 'My Resumes' : tab}
          </button>
        ))}
      </div>

      {activeTab === 'MyResumes' && (
        // NEW: Render the MyResumesTab component
        <MyResumesTab resumes={savedResumes} onSelect={loadResume} />
      )}

      {activeTab === 'Create' && (
        <div>
          {/* Upload or Create Resume */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
            <p className="font-medium mb-2">Quick Start: Upload Existing Resume</p>
            <div className="flex space-x-3">
              {/* NEW: This button now triggers the file input */}
              <button
                onClick={handleUploadClick}
                className="bg-green-600 py-2 px-4 rounded text-white hover:bg-green-700"
              >
                Upload Resume
              </button>
              {/* NEW: Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt" // Specify acceptable file types
              />
              <span className="text-gray-500">or <span className="underline cursor-pointer text-green-500">start from scratch below</span></span>
            </div>
          </div>

          {/* Resume Details */}
          <div className="bg-white p-4 rounded border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Resume Title *</label>
                <input
                  name="title"
                  value={resumeData.title}
                  onChange={handleGeneralChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Software Engineer Resume"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Target Role</label>
                <input
                  name="targetRole"
                  value={resumeData.targetRole}
                  onChange={handleGeneralChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Template Style</label>
                <select
                  name="templateStyle"
                  value={resumeData.templateStyle}
                  onChange={handleGeneralChange}
                  className="w-full border rounded px-3 py-2 bg-white"
                >
                  <option value="Professional">Professional</option>
                  <option value="Modern">Modern</option>
                  <option value="Creative">Creative</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex space-x-4 mb-4 border-b bg-white rounded-t-lg overflow-x-auto">
            {(['Personal', 'Summary', 'Experience', 'Education', 'Skills', 'Projects'] as Section[]).map(section => (
              <button
                key={section}
                className={`py-3 px-4 ${activeSection === section ? 'border-b-2 border-green-500 font-bold text-green-600' : 'text-gray-500'} whitespace-nowrap`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="bg-white p-6 rounded-b-lg border border-t-0">
            {activeSection === 'Personal' && (
              <PersonalSection data={resumeData.personal} onChange={handlePersonalChange} />
            )}

            {activeSection === 'Summary' && (
              <div>
                <label className="block font-medium mb-2 text-xl">Professional Summary</label>
                <textarea
                  name="summary"
                  value={resumeData.summary}
                  onChange={handleGeneralChange}
                  className="w-full border rounded px-3 py-2 mb-2 min-h-[84px]"
                  placeholder="Write a compelling summary that highlights your key strengths, experience, and what makes you unique."
                />
                <p className="text-xs text-gray-500">Tip: A strong summary is 3-4 sentences that showcase your value proposition.</p>
                <button className="float-right mt-2 flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200">
                  <span className="mr-1">✨</span>
                  AI Optimize
                </button>
              </div>
            )}
            
            {activeSection === 'Experience' && (
              <ExperienceSection
                items={resumeData.experience}
                onChange={handleExperienceChange}
                onCheck={handleExperienceCheck}
                onAdd={addExperience}
                onRemove={removeExperience}
              />
            )}
            
            {activeSection === 'Education' && (
              <EducationSection
                items={resumeData.education}
                onChange={handleEducationChange}
                onAdd={addEducation}
                onRemove={removeEducation}
              />
            )}
            
            {activeSection === 'Skills' && (
              <SkillsSection
                skills={resumeData.skills}
                newSkill={newSkill}
                onSkillChange={(e) => setNewSkill(e.target.value)}
                onAdd={addSkill}
                onRemove={removeSkill}
              />
            )}
            
            {activeSection === 'Projects' && (
              <ProjectsSection
                items={resumeData.projects}
                onChange={handleProjectChange}
                onAdd={addProject}
                onRemove={removeProject}
              />
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end mt-6 space-x-3">
            <button className="bg-white border border-gray-300 px-6 py-2 rounded text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
            {/* NEW: This button now saves the resume */}
            <button
              onClick={handleSaveResume}
              className="bg-green-600 px-6 py-2 rounded text-white font-medium hover:bg-green-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 12.092 1.616-1.616a2.25 2.25 0 0 0-3.182-3.182L10.5 11.25 7.5 8.25 4.5 11.25 1.5 8.25 1.5 13.5l3 3 3-3 3 3 3.5-3.5 1.616 1.616a2.25 2.25 0 0 0 3.182 0Z" />
              </svg>
              Save Resume
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Preview' && (
        // NEW: Render the live preview component
        <ResumePreview data={resumeData} />
      )}
    </div>
  );
};

export default ResumeBuild;