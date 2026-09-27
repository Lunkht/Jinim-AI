import React, { useEffect } from 'react';
import { MessageSquare, Plus, Settings, User, Zap, Trash2, X } from 'lucide-react';

const Sidebar = ({ chats, onClearChat, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 overflow-hidden border-r border-gray-800 bg-[#0a0a0a]',
          'transition-[width,transform] duration-300 ease-out',
          'md:relative md:inset-y-auto md:z-40 md:translate-x-0',
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:border-r-0',
        ].join(' ')}
        aria-hidden={!isOpen}
      >
        <div className="flex h-full w-64 flex-col justify-between overflow-y-auto p-4">
          <div className="flex-1 overflow-y-auto">
            <div className="mb-8 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Zap className="text-white fill-white" size={24} />
                <span className="text-xl font-bold tracking-tighter">JINIM AI</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <button className="mb-6 flex w-full items-center gap-3 rounded-full bg-white px-3 py-2 font-medium text-black transition-colors hover:bg-gray-200">
              <Plus size={18} />
              <span className="whitespace-nowrap">New Chat</span>
            </button>

            <div className="space-y-1">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Recent
              </p>
              {chats.map((chat, i) => (
                <div
                  key={i}
                  onClick={onClose}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white"
                >
                  <MessageSquare size={16} />
                  <span className="truncate">{chat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-gray-800 pt-4">
            <button
              onClick={onClearChat}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-red-900/20 hover:text-red-400"
            >
              <Trash2 size={18} />
              <span className="whitespace-nowrap">Clear History</span>
            </button>
            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white">
              <Settings size={18} />
              <span className="whitespace-nowrap">Settings</span>
            </div>
            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white">
              <User size={18} />
              <span className="whitespace-nowrap">Profile</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
