import React from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ input, setInput, handleSend }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Grok anything..." 
            className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-gray-600 transition-all placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 p-2 rounded-xl bg-white text-black hover:bg-gray-200 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-3 uppercase tracking-widest">
          Real-time Intelligence • Powered by xAI
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
