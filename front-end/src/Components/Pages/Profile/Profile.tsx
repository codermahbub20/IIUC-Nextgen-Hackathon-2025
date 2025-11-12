import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider'; // Path-ti apnar project structure onujayi adjust korun
import { ChevronDown, X, Edit, User, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

// --- Interface for local form data (Based on ERD & Req 2) ---

interface ProfileFormData {
  fullName: string;
  email: string; 
  avatarUrl: string; 
  education: string;
  experienceLevel: string;
  preferredCareerTrack: string;
  skills: string[];
  careerNotes: string;
}

// --- Helper: Read-only View for fields ---
const ReadOnlyField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500">{label}</label>
    <div className="w-full p-3 mt-1 bg-gray-100 border border-gray-200 rounded-md text-gray-900 min-h-[44px]">
      {value || '-'}
    </div>
  </div>
);

// --- Main Profile Component ---
const UserProfile: React.FC = () => {
  
  
  const { user, updateUser, loading: authLoading } = useContext(AuthContext);
  // --- State ---
  const [isEditing, setIsEditing] = useState(false); // Default "view" mode
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');


  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.displayName || '',
    email: user?.email || '',
    avatarUrl: user?.photoURL || '',
  
    education: "Bachelor's Degree",
    experienceLevel: 'Entry Level / Fresh Graduate',
    preferredCareerTrack: 'Software Engineering',
    skills: ['JavaScript', 'React', 'Node.js'], 
    careerNotes: "I'm passionate about building user-centric products..." 
  });

  // --- Effects ---
  
  useEffect(() => {
    if (user && !isEditing) {  
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || '',
        avatarUrl: user.photoURL || '',
      }));
    }
  }, [user, isEditing]);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill) && formData.skills.length < 10) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  
  const handleSave = async () => {
    if (!user || !updateUser) return;
    
    setIsSaving(true);
    try {
      
      await updateUser({
        displayName: formData.fullName,
        photoURL: formData.avatarUrl
      });
      

      
      console.log('Profile Saved:', formData);
      
      Swal.fire("Success!", "Your profile has been updated.", "success");
      setIsEditing(false);

    } catch (error) {
      console.error("Error saving profile:", error);
      Swal.fire("Error", "Could not update profile. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  
  const handleCancel = () => {
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || '',
        avatarUrl: user.photoURL || '',
      }));
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // --- Render Logic ---
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // --- JSX ---
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 mt-1">Keep your information up to date to get the best career recommendations.</p>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-7Example: "
            >
              <Edit className="w-4 h-4" />
              Update Profile
            </button>
          )}
        </div>

        {/* --- Profile Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Column (User Info) --- */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="flex flex-col items-center mb-6">
              
              {/* --- Avatar --- */}
              {isEditing ? (
                <>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">Avatar Image URL</label>
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Profile Avatar"
                      className="w-24 h-24 rounded-full mb-3 object-cover"
                      onError={(e) => e.currentTarget.src = 'https://placehold.co/128x128/E0E7FF/4F46E5?text=Img'}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mb-3 bg-gray-200 flex items-center justify-center text-gray-500">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                  <input
                    type="text"
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    className="w-full p-2 mt-1 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <>
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile Avatar"
                      className="w-24 h-24 rounded-full mb-3 object-cover"
                      onError={(e) => e.currentTarget.src = 'https://placehold.co/128x128/E0E7FF/4F46E5?text=Img'}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mb-3 bg-gray-200 flex items-center justify-center text-gray-500">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </>
              )}

              <h2 className="text-xl font-semibold text-gray-900 mt-3">{formData.fullName || "User Name"}</h2>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              {isEditing ? (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Full Name" value={formData.fullName} />
              )}

              {/* Email Address (Read-only) */}
              <ReadOnlyField label="Email Address" value={formData.email} />
              
              {/* Education Level */}
              {isEditing ? (
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education Level</label>
                  <div className="relative">
                    <select
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full p-3 mt-1 appearance-none bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>High School / Diploma</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <ReadOnlyField label="Education Level" value={formData.education} />
              )}

              {/* Experience Level */}
              {isEditing ? (
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
                  <div className="relative">
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full p-3 mt-1 appearance-none bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Entry Level / Fresh Graduate</option>
                      <option>Junior (1-3 years)</option>
                      <option>Mid-Level (3-5 years)</option>
                      <option>Senior (5+ years)</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/a pointer-events-none" />
                  </div>
                </div>
              ) : (
                <ReadOnlyField label="Experience Level" value={formData.experienceLevel} />
              )}

              {/* Preferred Career Track */}
              {isEditing ? (
                <div>
                  <label htmlFor="preferredCareerTrack" className="block text-sm font-medium text-gray-700">Preferred Career Track</label>
                  <input
                    type="text"
                    id="preferredCareerTrack"
                    name="preferredCareerTrack"
                    value={formData.preferredCareerTrack}
                    onChange={handleChange}
                    className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Preferred Career Track" value={formData.preferredCareerTrack} />
              )}
            </div>
          </div>

          {/* --- Right Column (Skills & Notes) --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Skills Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">My Skills</h3>
              <p className="text-sm text-gray-500">
                {isEditing 
                  ? "Add up to 10 skills to help us match you with the right opportunities."
                  : "Your current set of skills."}
              </p>

              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                    placeholder="e.g., Python, UI/UX Design"
                    className="flex-grow p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {formData.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">
                    {skill}
                    {isEditing && (
                      <button onClick={() => handleRemoveSkill(skill)} className="text-blue-600 hover:text-blue-800">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Interests Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">Career Interests and Notes</h3>
              <p className="text-sm text-gray-500">Describe your career aspirations, goals, and any relevant notes.</p>
              
              {isEditing ? (
                <textarea
                  name="careerNotes"
                  value={formData.careerNotes}
                  onChange={handleChange}
                  rows={5}
                  placeholder="e.g., I'm passionate about building user-centric products..."
                  className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="w-full p-3 mt-4 bg-gray-100 border border-gray-200 rounded-md text-gray-900 whitespace-pre-wrap min-h-[100px]">
                  {formData.careerNotes}
                </p>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-36"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;