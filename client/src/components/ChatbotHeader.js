import React from 'react';

const ChatbotHeader = ({ close }) => {
  return (
    <header>
      <h2>Chatbot</h2>
      <span className="close-btn material-symbols-outlined" onClick={close}>close</span>
    </header>
  );
};

export default ChatbotHeader;
