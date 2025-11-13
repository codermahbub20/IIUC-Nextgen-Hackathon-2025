/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  User, 
  Briefcase, 
  Award, 
  Target, 
  Plus, 
  X, 
  Save,
  FileText,
  Trash2
} from 'lucide-react';
import { useGetUserQuery, useUpdateUserMutation } from '../../../redux/features/users/usersApi';

interface Project {
  title: string;
  description: string;
}

interface DecodedToken {
  id: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

const UserProfile: React.FC = () => {
  // Redux auth state - Extract user from nested structure
  const authState = useSelector((state: any) => state.auth);
  const user = authState?.user?.data || authState?.user || null;
  const token = authState?.user?.data?.token || authState?.token || null;
  
  console.log("Auth State:", authState);
  console.log("Extracted User:", user);
  console.log("Token:", token);

  // State for decoded user info
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  // Decode JWT token to get user ID
  useEffect(() => {
    if (token) {
      try {
        // Decode JWT token (payload is the middle part)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded: DecodedToken = JSON.parse(jsonPayload);
        console.log("Decoded token:", decoded);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  }, [token]);

  // Get user ID from decoded token or user object
  const userId = userInfo?.id || user?.id || user?._id;
  console.log("User ID for query:", userId);

  // RTK Query hooks - Fetch latest data from API
  const { data: userData, isLoading: isUserLoading, refetch } = useGetUserQuery(userId, {
    skip: !userId, // Skip query if no user id
  });
  console.log("User Data from API:", userData);
  
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Local form state
  const [formData, setFormData] = useState<any>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  
  // Input states
  const [newSkill, setNewSkill] = useState('');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [newProject, setNewProject] = useState<Project>({ title: '', description: '' });

  // Populate form when Redux user data is available (First Priority)
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        educationLevel: user.educationLevel || '',
        department: user.department || '',
        experienceLevel: user.experienceLevel || '',
        preferredCareerTrack: user.preferredCareerTrack || '',
        experienceDescription: user.experienceDescription || '',
        careerInterests: user.careerInterests || '',
        skills: user.skills || [],
        cvText: user.cvText || ''
      });

      // Parse target roles from careerInterests
      if (user.careerInterests) {
        setTargetRoles(user.careerInterests.split(',').map((role: string) => role.trim()).filter(Boolean));
      }
    }
  }, [user]);

  // Update form when API data is fetched (Override with latest data)
  useEffect(() => {
    if (userData?.data) {
      const fetched = userData.data;
      setFormData({
        fullName: fetched.fullName || '',
        email: fetched.email || '',
        educationLevel: fetched.educationLevel || '',
        department: fetched.department || '',
        experienceLevel: fetched.experienceLevel || '',
        preferredCareerTrack: fetched.preferredCareerTrack || '',
        experienceDescription: fetched.experienceDescription || '',
        careerInterests: fetched.careerInterests || '',
        skills: fetched.skills || [],
        cvText: fetched.cvText || ''
      });

      // Parse target roles from careerInterests
      if (fetched.careerInterests) {
        setTargetRoles(fetched.careerInterests.split(',').map((role: string) => role.trim()).filter(Boolean));
      }
    }
  }, [userData]);

  // Handle submit
  const handleSubmit = async () => {
    try {
      setMessage('');

      const dataToSend = {
        ...formData,
        careerInterests: targetRoles.join(', '),
        skills: formData.skills || []
      };

      const res: any = await updateUser({
        userId: userId,
        body: dataToSend,
      }).unwrap();

      setMessage('Profile updated successfully!');
      console.log('Saved Data:', res);

      // Refetch user data after successful update
      refetch();

      // Show success message
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.data?.message || 'Failed to update profile. Try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...(formData.skills || []), newSkill.trim()];
      setFormData((prev: any) => ({
        ...prev,
        skills: updatedSkills
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = (formData.skills || []).filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const addTargetRole = () => {
    if (newTargetRole.trim()) {
      setTargetRoles(prev => [...prev, newTargetRole.trim()]);
      setNewTargetRole('');
    }
  };

  const removeTargetRole = (index: number) => {
    setTargetRoles(prev => prev.filter((_, i) => i !== index));
  };

  const addProject = () => {
    if (newProject.title.trim()) {
      setProjects(prev => [...prev, { ...newProject }]);
      setNewProject({ title: '', description: '' });
    }
  };

  const removeProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center p-8">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No User Found</h2>
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <User className="w-8 h-8 text-orange-500" />
              My Profile
            </h1>
            <p className="text-gray-600 mt-1">Manage your career profile and preferences</p>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={isUpdating}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Save className="w-4 h-4" />
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Basic Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  value={formData.fullName || ''} 
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  value={formData.email || ''} 
                  disabled 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Contact admin to change email</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Professional Bio</label>
              <textarea
                value={formData.experienceDescription || ''}
                onChange={(e) => handleInputChange('experienceDescription', e.target.value)}
                placeholder="Tell us about yourself, your interests, and career goals..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-24"
              />
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              Education & Experience
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Education Level</label>
                <select
                  value={formData.educationLevel || ''}
                  onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Department / Field of Study</label>
                <input
                  value={formData.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Experience Level</label>
              <select
                value={formData.experienceLevel || ''}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior (0-2 years)">Junior (0-2 years)</option>
                <option value="Mid-Level (2-5 years)">Mid-Level (2-5 years)</option>
                <option value="Senior (5+ years)">Senior (5+ years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Career Track */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              Career Track
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Preferred Career Track</label>
              <select
                value={formData.preferredCareerTrack || ''}
                onChange={(e) => handleInputChange('preferredCareerTrack', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select career track</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science & Analytics">Data Science & Analytics</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Business Development">Business Development</option>
                <option value="Project Management">Project Management</option>
                <option value="HR & Recruitment">HR & Recruitment</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Sales">Sales</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Target Roles</label>
              <div className="flex gap-2">
                <input
                  value={newTargetRole}
                  onChange={(e) => setNewTargetRole(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTargetRole()}
                  placeholder="e.g., Frontend Developer"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button 
                  onClick={addTargetRole}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {targetRoles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {targetRoles.map((role, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {role}
                      <button onClick={() => removeTargetRole(index)} className="hover:text-purple-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Skills
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a skill (e.g., JavaScript, Communication)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={addSkill}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {formData.skills && formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill: string, index: number) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 border border-green-200 rounded-full text-sm font-medium">
                    {skill}
                    <button onClick={() => removeSkill(index)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              Projects & Experience
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <input
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Project title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Brief description of the project"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-20"
              />
              <button 
                onClick={addProject}
                className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {projects.length > 0 && (
              <div className="space-y-3 mt-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      <button 
                        onClick={() => removeProject(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CV Text */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              CV / Resume Text
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Paste your CV or resume text for future AI analysis
              </label>
              <textarea
                value={formData.cvText || ''}
                onChange={(e) => handleInputChange('cvText', e.target.value)}
                placeholder="Paste your CV content here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-48 font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                This will be used for AI-powered analysis in Part 2 of the hackathon
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pb-8">
          <button 
            onClick={handleSubmit} 
            disabled={isUpdating}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium text-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Save className="w-5 h-5" />
            {isUpdating ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;