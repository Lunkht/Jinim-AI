import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import { sendMessageToAI } from './services/apiService';

const JinimInterface = () => {
  // Load chats from localStorage on initialization
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('jinim_chat_history');
    return savedMessages ? JSON.parse(savedMessages) : [
      { role: 'ai', content: 'I am Jinim AI. I have real-time access to the world. What do you want to know?' }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => window.innerWidth >= 768);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jinim_chat_history', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(updatedMessages);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Error: ${error.message}. Please make sure your API key is set in the .env file.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const resetMessages = [{ role: 'ai', content: 'I am Jinim AI. I have real-time access to the world. What do you want to know?' }];
      setMessages(resetMessages);
      localStorage.removeItem('jinim_chat_history');
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-black font-sans text-gray-100">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        chats={['AI Future', 'Quantum Physics', 'Latest News', 'Coding Help']}
        onClearChat={clearChat}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <ChatHeader
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-0">
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                </div>
                <div className="bg-transparent text-gray-400 p-3 rounded-2xl italic">
                  Jinim is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default JinimInterface;
