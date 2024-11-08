import React from 'react';

const ChatbotToggle = ({ isOpen, toggleOpen }) => {
  return (
    <button className="chatbot-toggler" onClick={toggleOpen}>
      <span className="material-symbols-rounded">mode_comment</span>
      <span className="material-symbols-outlined">close</span>
    </button>
  );
};

export default ChatbotToggle;
