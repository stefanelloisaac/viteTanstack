// src/routes/index.tsx
import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const Route = createFileRoute("/")({
  component: ChatInterface,
});

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your retro AI assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fake data for sidebar
  const recentPrompts = [
    "How to implement Redux in React?",
    "Best practices for TypeScript",
    "CSS Grid vs Flexbox comparison",
    "JavaScript async/await tutorial",
    "React component lifecycle methods"
  ];

  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Pro User",
    tokensUsed: "1,247 / 5,000"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective:",
      "Great point! I'd be happy to help with that.",
      "I see what you mean. Let me break that down for you:",
      "Fascinating! I love discussing topics like this.",
      "That reminds me of something similar I was thinking about...",
      "Excellent question! Here's how I see it:",
      "I appreciate you asking that. My thoughts are:",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return "Hello there! It's great to meet you. What would you like to chat about?";
    }
    
    if (userMessage.toLowerCase().includes('how are you')) {
      return "I'm doing wonderfully, thank you for asking! Running at optimal parameters and ready to help. How are you doing today?";
    }
    
    return `${randomResponse} You mentioned: "${userMessage}". That's quite thought-provoking!`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: simulateAIResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="retro-container">
      <div className="retro-chat-window">
        {/* Sidebar */}
        <div className="retro-sidebar">
          <div className="retro-sidebar-header">
            User Dashboard
          </div>
          <div className="retro-sidebar-content">
            {/* User Info */}
            <div className="retro-user-info">
              <div className="retro-user-avatar"></div>
              <div className="text-xs font-bold">{userInfo.name}</div>
              <div className="text-xs">{userInfo.email}</div>
              <div className="text-xs mt-1">Plan: {userInfo.plan}</div>
              <div className="text-xs">Tokens: {userInfo.tokensUsed}</div>
            </div>

            {/* Recent Prompts */}
            <div className="retro-recent-prompts">
              <div className="retro-section-title">Recent Prompts</div>
              {recentPrompts.map((prompt, index) => (
                <div key={index} className="retro-prompt-item">
                  {prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <div className="retro-section-title">Quick Actions</div>
              <div className="retro-prompt-item">New Conversation</div>
              <div className="retro-prompt-item">Export Chat</div>
              <div className="retro-prompt-item">Settings</div>
            </div>
          </div>
        </div>

        {/* Main Chat Window */}
        <div className="retro-main-window">
          <div className="retro-title-bar">
            <div className="retro-title-text">
              <span>AI Chat Assistant - [Conversation]</span>
            </div>
            <div className="retro-window-controls">
              <button className="retro-control-btn">_</button>
              <button className="retro-control-btn">□</button>
              <button className="retro-control-btn">×</button>
            </div>
          </div>
          <div className="retro-toolbar">
            <div className="retro-menu-item">File</div>
            <div className="retro-menu-item">Edit</div>
            <div className="retro-menu-item">View</div>
            <div className="retro-menu-item">Tools</div>
            <div className="retro-menu-item">Help</div>
          </div>
          
          <div className="retro-window-content">
            <div className="retro-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`retro-message ${
                    message.sender === 'user' ? 'retro-message-user' : 'retro-message-assistant'
                  }`}
                >
                  <div className="retro-message-label">
                    {message.sender === 'user' ? 'USER' : 'ASSISTANT'}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
              
              {isTyping && (
                <div className="retro-message retro-message-assistant">
                  <div className="retro-message-label">ASSISTANT</div>
                  <div className="retro-typing">Thinking...</div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="retro-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your message..."
                className="retro-input"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !inputValue.trim()}
                className="retro-send-btn"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
