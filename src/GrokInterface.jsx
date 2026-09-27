import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import { sendMessageToAI } from './services/apiService';

const STORAGE_KEY = 'jinim_conversations';
const ACTIVE_KEY = 'jinim_active_conversation';
const LEGACY_KEY = 'jinim_chat_history';

const WELCOME = {
  role: 'ai',
  content: 'I am Jinim AI. I have real-time access to the world. What do you want to know?'
};

const deriveTitle = (messages) => {
  const firstUserMessage = messages.find((m) => m.role === 'user');
  if (!firstUserMessage) return 'New Chat';
  const text = firstUserMessage.content.trim().replace(/\s+/g, ' ');
  if (!text) return 'New Chat';
  return text.length > 32 ? `${text.slice(0, 32)}…` : text;
};

const createConversation = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: 'New Chat',
  messages: [{ ...WELCOME }],
  createdAt: Date.now()
});

const readJSON = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const loadConversations = () => {
  const saved = readJSON(STORAGE_KEY);
  if (Array.isArray(saved) && saved.length > 0) return saved;

  const legacy = readJSON(LEGACY_KEY);
  if (Array.isArray(legacy) && legacy.length > 0) {
    return [{
      id: 'migrated',
      title: deriveTitle(legacy),
      messages: legacy,
      createdAt: Date.now()
    }];
  }

  return [createConversation()];
};

const JinimInterface = () => {
  const [conversations, setConversations] = useState(loadConversations);
  const [activeId, setActiveId] = useState(() => localStorage.getItem(ACTIVE_KEY));
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => window.innerWidth >= 768);
  const messagesEndRef = useRef(null);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeConversation) localStorage.setItem(ACTIVE_KEY, activeConversation.id);
  }, [activeConversation]);

  const messages = activeConversation ? activeConversation.messages : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const updateConversation = (id, updater) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
  };

  const handleNewChat = () => {
    const conversation = createConversation();
    setConversations((prev) => [conversation, ...prev]);
    setActiveId(conversation.id);
    setInput('');
  };

  const handleSelectChat = (id) => {
    setActiveId(id);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !activeConversation) return;

    const conversationId = activeConversation.id;
    const userMessage = { role: 'user', content: input };
    const sentMessages = [...activeConversation.messages, userMessage];

    updateConversation(conversationId, (c) => ({
      ...c,
      title: c.title === 'New Chat' ? deriveTitle(sentMessages) : c.title,
      messages: sentMessages
    }));
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(sentMessages);
      updateConversation(conversationId, (c) => ({
        ...c,
        messages: [...c.messages, { role: 'ai', content: response }]
      }));
    } catch (error) {
      updateConversation(conversationId, (c) => ({
        ...c,
        messages: [
          ...c.messages,
          { role: 'ai', content: `Error: ${error.message}. Please make sure your API key is set in the .env file.` }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (!window.confirm('Are you sure you want to clear the chat history?')) return;
    const fresh = createConversation();
    setConversations([fresh]);
    setActiveId(fresh.id);
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-black font-sans text-gray-100">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        conversations={conversations}
        activeId={activeConversation ? activeConversation.id : null}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClearChat={clearHistory}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <ChatHeader
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-0">
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {messages.map((msg, i) => (
              <Message key={`${activeConversation.id}-${i}`} msg={msg} />
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
