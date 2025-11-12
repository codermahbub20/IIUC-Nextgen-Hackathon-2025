/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
// FIX: react-icons import soriye fela hoyeche
// import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';

// FIX: AuthProvider ebong react-router-dom er jonno mock toiri kora hoyeche
// import { AuthContext } from '../../../Provider/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// --- MOCK IMPLEMENTATIONS (Canvas e run korar jonno) ---
const AuthContext = React.createContext({
  createUserByGoogle: () => Promise.resolve({ user: { email: "mock@google.com" } }),
  registerUserWithEmailPassword: (email: any, password: any) => Promise.resolve({ user: { email, uid: "mock-uid" } })
});
const useNavigate = () => (path: any) => console.log("Navigating to:", path);
// --------------------------------------------------------

// --- INLINE SVG ICON COMPONENTS (react-icons er bodole) ---

// Replacement for FaEye
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
  <path d="M288 80c-63.5 0-144 45.4-206.1 127.4c-4.4 5.7-4.4 13.9 0 19.6C144 286.6 224.5 332 288 332c63.5 0 144-45.4 206.1-127.4c4.4-5.7 4.4-13.9 0-19.6C432 125.4 351.5 80 288 80zM288 280c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z" />
</svg>
);

// Replacement for FaEyeSlash
const EyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L388.9 295.6c-.7-.7-.9-1.6-.7-2.4c3.4-11.2 5.1-23.4 5.1-36c0-75.1-118.4-144-232.4-144c-17.2 0-33.8 2.5-49.5 7.1c-.8 .2-1.6 .3-2.4 .1c-1.2-.4-2.5-1.2-3.3-2.2L38.8 5.1zM288 392a148.9 148.9 0 0 1-19.1-1.3l88.5-69.2c1.7 .1 3.4 .5 5.1 .5c47.8 0 102.7 39.5 154.6 100.8c-29.4 33.7-65.4 57.1-105.7 68.3c-4.7 1.3-9.5 2.1-14.3 2.5c-15.6 1.1-31.5 1.1-47.1 0c-4.8-.4-9.6-1.1-14.3-2.5c-40.3-11.3-76.3-34.6-105.7-68.3c15.7-18.1 36.2-36.4 56.5-51.5l-63.1-49.3c-23.7 17.3-46.4 39.5-66.2 64.6c-4.4 5.7-4.4 13.9 0 19.6C144 445.4 224.5 490.8 288 490.8c12.3 0 24.3-1.6 35.8-4.7L181.1 270.3A147.8 147.8 0 0 1 288 392zM151.7 186.2l39.2 30.7A40 40 0 0 0 248 272c.6 0 1.2 0 1.8-.1l41.6 32.6A80 80 0 0 1 208 240c0-11.7 1.7-22.9 5.1-33.5l1.4-4.5c.3-.8 .9-1.6 1.7-2.2L151.7 186.2z" />
</svg>
);

// Replacement for FaGoogle
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill="currentColor">
  <path d="M488 261.8C488 278.4 486.2 294.6 483.1 310.2C465.7 400.6 390.2 464 288 464C146.3 464 32 349.7 32 208C32 66.3 146.3 0 288 0C357 0 411.7 24.9 449 61.3L371.7 141.6C347.1 119.3 319 110.1 288 110.1C219.8 110.1 163.6 166.3 163.6 234.6C163.6 302.8 219.8 359 288 359C348.6 359 383.6 328.7 398.8 307.7H288V261.8H488z" />
</svg>
);

// Replacement for FaLinkedin
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
  <path d="M416 32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zM132.8 384H65.8V176H132.8V384zM99.3 142.2C77.4 142.2 60 124.9 60 103C60 81.1 77.4 63.8 99.3 63.8c21.9 0 39.3 17.3 39.3 39.2C138.6 124.9 121.2 142.2 99.3 142.2zM384 384h-67.1V272c0-26.6-21.7-48.3-48.3-48.3c-26.6 0-48.3 21.7-48.3 48.3v112H153.2V176H220v30.5c9.2-16.1 27.5-30.5 53.6-30.5c41.3 0 74.8 33.5 74.8 74.8V384z" />
</svg>
);
// --------------------------------------------------------


// --- টাইপ সংজ্ঞা (আপনার রিকোয়ারমেন্ট অনুযায়ী) ---
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

// --------------------------------------------------

interface SignUpFormProps {
  isDarkMode: boolean;
}

const Registration: React.FC<SignUpFormProps> = ({ isDarkMode }) => {
  // --- Step 1: Authentication States ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Step 2: NEW User Detail States ---
  const [educationLevel, setEducationLevel] = useState('');
  const [department, setDepartment] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<TExperienceLevel>('Fresher');
  const [preferredCareerTrack, setPreferredCareerTrack] = useState<TCareerTrack>('Web Development');

  const [error, setError] = useState(''); // এরর মেসেজের জন্য স্টেট

  // FIX: Mock AuthContext bebohar kora hocche
  const { createUserByGoogle, registerUserWithEmailPassword } = useContext(AuthContext);

  const navigate = useNavigate(); // Mock navigate bebohar kora hocche

  // --- Select Dropdown-এর জন্য অপশন ---
  const experienceLevels: TExperienceLevel[] = ["Fresher", "Junior", "Mid", "Senior"];
  const careerTracks: TCareerTrack[] = [
    "Web Development", "Data", "Design", "Marketing",
    "Cybersecurity", "AI/ML", "Mobile App", "Other"
  ];

  const handleRegisterWithEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // ফর্ম সাবমিট রিলোড বন্ধ করা
    setError(''); // আগের এরর মুছে ফেলা

    // --- ভ্যালিডেশন ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    // NEW: নতুন ফিল্ডগুলোর ভ্যালিডেশন (প্রয়োজনে)
    if (!educationLevel || !department) {
      setError("Please fill in your Education and Department.");
      return;
    }

    try {
      // 1. Firebase/Auth-এ ইউজার তৈরি করা
      const result = await registerUserWithEmailPassword(email, password);
      console.log('Firebase user created:', result.user);

      // 2. আপনার TUser অবজেক্ট তৈরি করা (ডাটাবেসে পাঠানোর জন্য)
      const newUserData = {
        fullName,
        email,
        password, // দ্রষ্টব্য: আসল অ্যাপে পাসওয়ার্ড ডাটাবেসে পাঠানো উচিত নয়
        educationLevel,
        department,
        experienceLevel,
        preferredCareerTrack,
      };

      console.log('Complete user data to save:', newUserData);
      
      // এখানে আপনার API-তে newUserData পাঠানোর কোড থাকবে
      // যেমন: await fetch('/api/users', { method: 'POST', body: JSON.stringify(newUserData) });

      navigate("/"); // সফল হলে হোম পেজে রিডাইরেক্ট

    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  // ====================Google SignIn================
  const handleGoogleSignIn = () => {
    createUserByGoogle()
      .then(result => {
        console.log(result.user);
        // দ্রষ্টব্য: গুগল সাইন-ইন করার পর ইউজারকে নতুন ফিল্ডগুলো পূরণের জন্য প্রোফাইল পেজে পাঠানো উচিত
        navigate("/");
      })
      .catch(error => {
        console.log(error.message);
        setError("Google sign-in failed.");
      });
  };

  // --- স্টাইল ক্লাস (যাতে JSX পরিচ্ছন্ন থাকে) ---
  const inputClasses = `w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }`;
  const labelClasses = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const socialBtnClasses = `flex items-center justify-center w-full py-3 font-medium border rounded-md hover:bg-gray-50 transition-colors duration-300 ${isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div>
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start your journey with us today.</p>

      {/* এরর মেসেজ দেখানোর স্থান */}
      {error && (
        <p className="mt-4 text-sm font-medium text-center text-red-500">
          {error}
        </p>
      )}

      <form onSubmit={handleRegisterWithEmailPassword} className="mt-8 space-y-5">
        
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClasses}>Full Name</label>
          <input
            id="fullName" type="text" value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClasses} placeholder="Enter your full name" required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses} placeholder="Enter your email" required
          />
        </div>

        {/* --- Password Grid (2 columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <div className="relative mt-1">
              <input
                id="password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className={inputClasses} placeholder="Enter your password" required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 flex items-center px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {/* FIX: FaEye bodole EyeIcon bebohar kora hoyeche */}
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
            <div className="relative mt-1">
              <input
                id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClasses} placeholder="Confirm your password" required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute inset-y-0 right-0 flex items-center px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {/* FIX: FaEye bodole EyeIcon bebohar kora hoyeche */}
                {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Education Grid (2 columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NEW: Education Level */}
          <div>
            <label htmlFor="educationLevel" className={labelClasses}>Education Level</label>
            <input
              id="educationLevel" type="text" value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className={inputClasses} placeholder="e.g., B.Sc in CSE" required
            />
          </div>
          {/* NEW: Department */}
          <div>
            <label htmlFor="department" className={labelClasses}>Department</label>
            <input
              id="department" type="text" value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={inputClasses} placeholder="e.g., Computer Science" required
            />
          </div>
        </div>

        {/* --- Career Grid (2 columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NEW: Experience Level */}
          <div>
            <label htmlFor="experienceLevel" className={labelClasses}>Experience Level</label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as TExperienceLevel)}
              className={inputClasses} required
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          {/* NEW: Preferred Career Track */}
          <div>
            <label htmlFor="preferredCareerTrack" className={labelClasses}>Preferred Career Track</label>
            <select
              id="preferredCareerTrack"
              value={preferredCareerTrack}
              onChange={(e) => setPreferredCareerTrack(e.target.value as TCareerTrack)}
              className={inputClasses} required
            >
              {careerTracks.map(track => (
                <option key={track} value={track}>{track}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>

        {/* Fine Print */}
        <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>.
        </p>

        {/* Separator */}
        <div className="flex items-center">
          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
          <span className={`mx-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Or continue with</span>
          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4">
          <button onClick={handleGoogleSignIn}
            type="button"
            className={socialBtnClasses}
          >
            {/* FIX: FaGoogle bodole GoogleIcon bebohar kora hoyeche */}
            <FcGoogle className="w-5 h-5 mr-2 text-red-500"/>
            
            Google
          </button>
          <button
            type="button"
            className={socialBtnClasses}
          >
            {/* FIX: FaLinkedin bodole LinkedInIcon bebohar kora hoyeche */}
            <LinkedInIcon className="w-5 h-5 mr-2 text-blue-700" />
            LinkedIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;