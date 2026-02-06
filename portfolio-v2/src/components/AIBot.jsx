import React, { useState } from 'react';
import './AIBot.css';

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: "Hi! I'm Julius's AI Assistant. Ask me anything about his resume!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User Message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to Backend
      const response = await fetch('https://portfolio-project.261509jz79gj.us-south.codeengine.appdomain.cloud/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // AI Response
      setMessages(prev => [...prev, { role: 'system', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'system', content: "Oops! I'm having trouble connecting to Julius's brain." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bot-container">
      {/* Floating Button */}
      {!isOpen && (
        <button className="bot-trigger" onClick={() => setIsOpen(true)}>
          🤖 Ask AI
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bot-window">
          <div className="bot-header">
            <span>Ask about Julius</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          
          <div className="bot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && <div className="message system">Thinking...</div>}
          </div>

          <div className="bot-input">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about skills, projects..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBot;