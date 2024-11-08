import React, { useRef, useEffect } from 'react';

const Chatbox = ({ messages }) => {
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul className="chatbox" ref={chatboxRef}>
      {messages.map((message, index) => (
        <li key={index} className={`chat ${message.user === 'User' ? 'outgoing' : 'incoming'}`}>
          {message.user === 'Bot' && <span className="material-symbols-outlined">smart_toy</span>}
          <p>{message.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default Chatbox;
