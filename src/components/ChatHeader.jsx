import React from 'react';
import { Twitter, Github, MoreVertical, Zap, Menu } from 'lucide-react';

const ChatHeader = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuToggle}
          className="-ml-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu size={24} />
        </button>
        <div className="ml-2 flex items-center gap-2 md:hidden">
          <Zap className="text-white fill-white" size={20} />
          <span className="font-bold">JINIM AI</span>
        </div>
      </div>
      <div className="hidden text-sm font-medium text-gray-400 md:block">
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
