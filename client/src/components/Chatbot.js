import React, { useState, useEffect } from 'react';
import ChatbotToggle from './ChatbotToggle';
import Chatbox from './Chatbox';
import ChatInput from './ChatInput';
import ChatbotHeader from './ChatbotHeader';
import './Chatbot.css'; 
import intents from "./intents.json";

const API_KEY = "your_api_key"; 
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatbotData] = useState(intents); 
  useEffect(() => {
    if (isOpen) {
      setMessages([{ user: 'Bot', text: 'Hi there!\n How can I help you today?' }]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: 'User', text: input }];
    setMessages(newMessages);
    setInput('');

    const botMessage = await generateResponse(input); 
    setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: botMessage }]);
  };

  const generateResponse = async (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = "Sorry, I don't understand.";

    chatbotData.intents.forEach(intent => {
      if (intent.patterns.some(pattern => lowerCaseMessage.includes(pattern.toLowerCase()))) {
        responseText = intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
    });

    if (responseText === "Sorry, I don't understand.") {
      responseText = await fetchAIResponse(userMessage);
    }

    return responseText;
  };

  const fetchAIResponse = async (userMessage) => {
    try {
      const messageToSend = userMessage.trim().length > 0 ? `${userMessage} in 3 lines` : userMessage;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: messageToSend }] 
          }] 
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, there was an error generating a response.';
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'show-chatbot' : ''}`}>
      <ChatbotToggle isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
      <div className={`chatbot ${isOpen ? 'show-chatbot' : ''}`}>
        <ChatbotHeader close={() => setIsOpen(false)} />
        <Chatbox messages={messages} />
        <ChatInput 
          input={input} 
          setInput={setInput} 
          sendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
};

export default Chatbot;
