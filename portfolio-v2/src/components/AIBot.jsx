import React, { useState, useEffect, useRef } from 'react';
import './AIBot.css';

const AIBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'SYSTEM_READY. LOADING_RESUME_DATA... [OK].\nWelcome to the Julius_Sale_Portfolio CLI.\nEnter query to retrieve candidate data.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "nearest" 
        });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://portfolio-project.261509jz79gj.us-south.codeengine.appdomain.cloud/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            
            // Simulate typing delay for effect
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
                setIsLoading(false);
            }, 500);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'ERR_CONNECTION_REFUSED: Backend offline or unreachable.' }]);
            setIsLoading(false);
        }
    };

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="title">Julius_Sale_Bot -- -bash</span>
            </div>
            <div className="terminal-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`line ${msg.sender}`}>
                        <span className="prompt">{msg.sender === 'user' ? '> visitor@portfolio:~$ ' : '> root@julius-ai:~$ '}</span>
                        <span className="text">{msg.text}</span>
                    </div>
                ))}
                {isLoading && (
                    <div className="line bot">
                        <span className="prompt">{'> root@julius-ai:~$ '}</span>
                        <span className="cursor">_</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="terminal-input-area">
                <span className="prompt">{'> visitor@portfolio:~$ '}</span>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command..." 
                />
            </form>
        </div>
    );
};

export default AIBot;
