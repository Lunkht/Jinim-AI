import React from 'react';
import { Zap } from 'lucide-react';

const Message = ({ msg }) => {
  return (
    <div className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {msg.role === 'ai' && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
          <Zap size={16} className="text-black fill-black" />
        </div>
      )}
      <div className={`max-w-[80%] p-3 rounded-2xl ${
        msg.role === 'user' 
        ? 'bg-[#1a1a1a] text-white rounded-tr-none' 
        : 'bg-transparent text-gray-200'
      }`}>
        <p className="leading-relaxed">{msg.content}</p>
      </div>
    </div>
  );
};

export default Message;
