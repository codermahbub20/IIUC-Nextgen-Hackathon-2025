import React, { useState } from 'react';
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginFormProps {
  isDarkMode: boolean;
}

const Login: React.FC<LoginFormProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // এখানে আপনার লগইন API কল করুন
  };

  const inputClasses = `w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;
  const labelClasses = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const socialBtnClasses = `flex items-center justify-center w-full py-3 font-medium border rounded-md hover:bg-gray-50 transition-colors duration-300 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
  }`;


  return (
    <div>
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Log in to continue your journey.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email or Username
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="Enter your email or username"
            required
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className={labelClasses}
            >
              Password
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>

        {/* Fine Print */}
        <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Separator */}
        <div className="flex items-center">
          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
          <span className={`mx-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Or continue with</span>
          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4">
          <button
            type="button"
            className={socialBtnClasses}
          >
            <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
            Google
          </button>
          <button
            type="button"
            className={socialBtnClasses}
          >
            <FaLinkedin className="w-5 h-5 mr-2 text-blue-700" />
            LinkedIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;