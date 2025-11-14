import React from 'react';
import { Plus, Sparkles, ClipboardList, Bot, Send } from 'lucide-react';

const CareerBot = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
    
      <div className="w-1/4 bg-white p-4 border-r border-gray-200 flex flex-col gap-5">
        
        {/* Conversations Panel */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-700">Conversations</h2>
            <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <Plus size={20} />
            </button>
          </div>
          <div className="p-2 space-y-1">
            
            <div className="p-3 bg-gray-100 rounded-md cursor-pointer">
              <h3 className="font-semibold text-sm text-gray-800">CV Review 1</h3>
              <p className="text-xs text-gray-500">Nov 14, 8:11 PM</p>
            </div>
            <div className="p-3 rounded-md cursor-pointer hover:bg-gray-50">
              <h3 className="font-semibold text-sm text-gray-800">LinkedIn Summary</h3>
              <p className="text-xs text-gray-500">Nov 12, 4:14 PM</p>
            </div>
            <div className="p-3 rounded-md cursor-pointer hover:bg-gray-50">
              <h3 className="font-semibold text-sm text-gray-800">Project Bullet Points</h3>
              <p className="text-xs text-gray-500">Nov 14, 12:18 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
           <div className="flex items-center gap-2 mb-3">
             <Sparkles size={20} className="text-purple-600" />
             <h3 className="font-semibold text-purple-700">AI  Tips</h3>
           </div>
           <ul className="list-disc list-inside text-sm text-gray-700 space-y-1.5">
             <li>How to Auto-generate my CV </li>
             <li>Suggest professional summary</li>
             <li>Create strong bullet points</li>
             <li>Improve LinkedIn/Portfolio</li>
           </ul>
        </div>
      </div>

      {/* 2. Main Chat Area (ডান দিকের মূল চ্যাট) */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
               <ClipboardList size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-gray-800">Chat Assistant</h2>
              <p className="text-sm text-gray-500">AI-powered guidance</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
            Online
          </span>
        </div>

        {/* Chat Body - Empty State */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-10 bg-white">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <Bot size={48} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start your session</h2>
          <p className="text-gray-500 max-w-md">
            Ask me to generate a professional summary, improve your project bullet points, or review your CV.
          </p>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-purple-500">
            <input
              type="text"
              placeholder="Ask about your CV, professional summary, projects..."
              className="flex-1 p-3 bg-transparent border-none rounded-lg focus:outline-none text-gray-700"
            />
            <button className="p-3 text-purple-600 rounded-lg hover:bg-purple-100 m-1">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerBot;