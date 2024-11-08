import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ input, setInput, sendMessage }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustHeight = () => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    adjustHeight();

    const handleInput = () => {
      adjustHeight();
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, [input]); 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault(); 
      sendMessage(); 
    }
  };

  return (
    <div className="chat-input">
      <textarea 
        ref={textareaRef}
        placeholder="Enter a message..." 
        spellCheck="false" 
        required 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      <span id="send-btn" className="material-symbols-rounded" onClick={sendMessage}>send</span>
    </div>
  );
};

export default ChatInput;
