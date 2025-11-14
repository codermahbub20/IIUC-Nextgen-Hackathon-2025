/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner'; // or react-toastify
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../redux/features/auth/authApi';

export type TExperienceLevel = "Fresher" | "Junior" | "Mid" | "Senior";
export type TCareerTrack =
  | "Web Development"
  | "Data"
  | "Design"
  | "Marketing"
  | "Cybersecurity"
  | "AI/ML"
  | "Mobile App"
  | "Other";

interface SignUpFormProps {
  isDarkMode: boolean;
}

const Registration: React.FC<SignUpFormProps> = ({ isDarkMode }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [department, setDepartment] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<TExperienceLevel>('Fresher');
  const [preferredCareerTrack, setPreferredCareerTrack] = useState<TCareerTrack>('Web Development');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegisterWithEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();

  

    try {
      const result: any = await register({
        fullName,
        email,
        password,
        educationLevel,
        department,
        experienceLevel,
        preferredCareerTrack
      }).unwrap();

      toast.success('Registration successful!');
      navigate('/'); // redirect to login or homepage
    } catch (error: any) {
      toast.error(error?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const inputClasses = `w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const labelClasses = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div>
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start your journey with us today.</p>

      <form onSubmit={handleRegisterWithEmailPassword} className="mt-8 space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClasses}>Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClasses}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={labelClasses}>Password</label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 flex items-center px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        

        {/* Education Level */}
        <div>
          <label htmlFor="educationLevel" className={labelClasses}>Education Level</label>
          <input
            id="educationLevel"
            type="text"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className={inputClasses}
            placeholder="Enter your education level"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className={labelClasses}>Department</label>
          <input
            id="department"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={inputClasses}
            placeholder="Enter your department"
            required
          />
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="experienceLevel" className={labelClasses}>Experience Level</label>
          <select
            id="experienceLevel"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value as TExperienceLevel)}
            className={inputClasses}
            required
          >
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Preferred Career Track */}
        <div>
          <label htmlFor="preferredCareerTrack" className={labelClasses}>Preferred Career Track</label>
          <select
            id="preferredCareerTrack"
            value={preferredCareerTrack}
            onChange={(e) => setPreferredCareerTrack(e.target.value as TCareerTrack)}
            className={inputClasses}
            required
          >
            <option value="Web Development">Web Development</option>
            <option value="Data">Data</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Registration;
