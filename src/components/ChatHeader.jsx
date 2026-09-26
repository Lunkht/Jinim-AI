import React from 'react';
import { Twitter, Github, MoreVertical, Zap, Menu } from 'lucide-react';

const ChatHeader = ({ onMenuToggle }) => {
  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle} 
          className="p-2 rounded-lg hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="md:hidden flex items-center gap-2">
          <Zap className="text-white fill-white" size={20} />
          <span className="font-bold">JINIM AI</span>
        </div>
      </div>
      <div className="hidden md:block text-sm font-medium text-gray-400">
        Model: Jinim-1 (Real-time)
      </div>
      <div className="flex items-center gap-4 text-gray-400">
        <Twitter size={20} className="cursor-pointer hover:text-white" />
        <Github size={20} className="cursor-pointer hover:text-white" />
        <MoreVertical size={20} className="cursor-pointer hover:text-white" />
      </div>
    </header>
  );
};

export default ChatHeader;
