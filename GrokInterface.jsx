import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  User, 
  Send, 
  Zap, 
  Search, 
  MoreVertical, 
  Github, 
  Twitter 
} from 'lucide-react';

const GrokInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'I am Grok. I have real-time access to the world. What do you want to know?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add User Message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "This is a simulated response. To make me real, connect me to an API like xAI, OpenAI, or Anthropic!" 
      }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#000000] text-gray-100 font-sans">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <Zap className="text-white fill-white" size={24} />
            <span className="text-xl font-bold tracking-tighter">GROK</span>
          </div>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors mb-6">
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">Recent</p>
            {['AI Future', 'Quantum Physics', 'Latest News', 'Coding Help'].map((chat, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                <MessageSquare size={16} />
                <span className="truncate">{chat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
            <User size={18} />
            <span>Profile</span>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-0">
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
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
      </div>
    </div>
  );
};

export default GrokInterface;

          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="md:hidden flex items-center gap-2">
            <Zap className="text-white fill-white" size={20} />
            <span className="font-bold">GROK</span>
          </div>
          <div className="hidden md:block text-sm font-medium text-gray-400">
            Model: Grok-1 (Real-time)
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Twitter size={20} className="cursor-pointer hover:text-white" />
            <Github size={20} className="cursor-pointer hover:text-white" />
            <MoreVertical size={20} className="cursor-pointer hover:text-white" />
          </div>
        </header>
