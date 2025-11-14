/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../../redux/features/auth/authApi';

interface LoginFormProps {
  isDarkMode: boolean;
}

const Login: React.FC<LoginFormProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [logIn, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call login mutation
      const response: any = await logIn({ email, password }).unwrap();

      // Adjust according to your API response structure
      // Many RTK Query APIs return { data: { user: {...}, token: '...' } }
      const user = response?.data?.user || response?.user || response;
      const token = response?.data?.token || response?.token;

      if (!user || !token) {
        toast.error('Login failed: Invalid credentials');
        return;
      }

      // Save to Redux
      dispatch(setUser({ user, token }));

      // Persist token in localStorage (optional)
      localStorage.setItem('token', token);

      toast.success(`Welcome back, ${user.fullName || user.displayName || 'User'}!`);
      navigate('/'); // Redirect after login
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error?.data?.message || error.message || 'Login failed. Please try again.');
    }
  };

  const inputClasses = `w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const labelClasses = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Log in to continue your journey.
      </p>

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
            <label htmlFor="password" className={labelClasses}>
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
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 flex items-center px-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        {/* Fine Print */}
        <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By signing in, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;
