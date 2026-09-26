import React from 'react';
import { MessageSquare, Plus, Settings, User, Zap, Trash2 } from 'lucide-react';

const Sidebar = ({ chats, onClearChat, isOpen }) => {
  return (
    <div className={`fixed md:relative z-50 h-full transition-all duration-300 ease-in-out ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-64 md:translate-x-0'} bg-[#0a0a0a] border-r border-gray-800 flex flex-col justify-between p-4`}>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Zap className="text-white fill-white" size={24} />
          <span className="text-xl font-bold tracking-tighter">JINIM AI</span>
        </div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors mb-6">
          <Plus size={18} />
          <span className="whitespace-nowrap">New Chat</span>
        </button>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">Recent</p>
          {chats.map((chat, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
              <MessageSquare size={16} />
              <span className="truncate">{chat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 space-y-2">
        <button 
          onClick={onClearChat}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-900/20 cursor-pointer text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={18} />
          <span className="whitespace-nowrap">Clear History</span>
        </button>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
          <Settings size={18} />
          <span className="whitespace-nowrap">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
          <User size={18} />
          <span className="whitespace-nowrap">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
