import axios from 'axios';

const API_KEY = import.meta.env.VITE_AI_API_KEY;
const API_URL = 'https://api.x.ai/v1/chat/completions'; // Default to xAI

export const sendMessageToAI = async (messages) => {
  if (!API_KEY) {
    throw new Error('API Key is missing. Please add VITE_AI_API_KEY to your .env file.');
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'grok-beta', // Or your preferred model
        messages: messages.map(m => ({
          role: m.role === 'ai' ? 'assistant' : m.role,
          content: m.content
        })),
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to connect to AI service');
  }
};
