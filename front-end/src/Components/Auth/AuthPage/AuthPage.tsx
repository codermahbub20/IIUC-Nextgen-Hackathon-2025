import React, { useState } from 'react';
import { SiKnowledgebase } from 'react-icons/si'; 
import { RiSunFill, RiMoonFill } from 'react-icons/ri'; 
import Login from '../Login/Login';
import Registration from '../Registration/Registration';



type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`relative flex w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
       
        <div className="relative w-1/2 overflow-hidden hidden md:flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCiQppHEtYtABh94Y8kQ7wvYddTbtnD97R2ZrHrHghUMOvHAj7miAMuxJWngDGmNJVrPB0edbow4G92uPjkLg-Nwj6gS6nwyq5kh-v9REHjTQ7cl7YyvJYw8gQXQ17L_LeOWmlozkNYa9qGLCkKaCw1vxs__XJq_LaayW-picT-bC3A86WZDKlEPkdamXoGJh7ZcRkuLZ4kzPqPdY386WRltJ35ZCtC0adOFxH-gTVZ61PJpRsu_WuO5xM2X0JruqV_XeIn3uTe1Y" // আপনার ছবিটি এখানে দিন
            alt="Career AI"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div> {/* ছবির উপর শ্যাডো */}

          {/* লোগো */}
          <div className="absolute top-8 left-8 flex items-center z-10">
            <SiKnowledgebase className="w-8 h-8 mr-2 text-blue-600" /> 
            <span className="text-3xl font-bold  text-blue-600">Career AI</span>
          </div>

          {/* Main Text */}
          <div className="absolute bottom-16 left-8 right-8 text-white z-10">
            <h1 className="text-5xl font-extrabold leading-tight">
              Unlock Your Future,
              <br />
              Today.
            </h1>
            <p className="mt-6 text-lg">
              Welcome to the AI-powered platform designed to
              <br />
              launch your career into the stratosphere.
            </p>
          </div>
        </div>

        {/* ডান প্যানেল: ফর্ম */}
        <div
          className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          {/* Light/Dark Toggle */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isDarkMode ? (
                <RiSunFill className="w-6 h-6" />
              ) : (
                <RiMoonFill className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* ফর্ম কন্টেইনার */}
          <div className="w-full max-w-md mx-auto mt-10 flex-grow flex flex-col justify-center">
            {/* Toggle Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-3 px-6 text-lg font-medium transition-colors duration-300
                  ${
                    mode === 'login'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  } ${isDarkMode ? 'text-white' : ''}`}
              >
                Log In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-3 px-6 text-lg font-medium transition-colors duration-300
                  ${
                    mode === 'signup'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  } ${isDarkMode ? 'text-white' : ''}`}
              >
                Sign Up
              </button>
            </div>

        
            {mode === 'login' ? <Login isDarkMode={isDarkMode} /> : <Registration isDarkMode={isDarkMode} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;