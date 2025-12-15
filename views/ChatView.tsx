import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole } from '../types';
import { createChatSession, sendMessageStream } from '../services/gemini';
import { Button } from '../components/Button';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Hello! I'm Aura. How can I help you explore your ideas today?",
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to store the chat session instance
  const chatSessionRef = useRef(createChatSession());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Create a placeholder for the bot response
    const botMsgId = (Date.now() + 1).toString();
    const initialBotMsg: Message = {
      id: botMsgId,
      role: MessageRole.MODEL,
      text: '',
      timestamp: Date.now() + 1
    };
    
    setMessages(prev => [...prev, initialBotMsg]);

    try {
      let accumulatedText = '';
      await sendMessageStream(chatSessionRef.current, userMsg.text, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
          )
        );
      });
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: "I encountered an error connecting to the ether. Please try again.", isError: true } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                msg.role === MessageRole.USER 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'glass-panel text-slate-200 rounded-bl-none'
              } ${msg.isError ? 'border-red-500/50 bg-red-900/20' : ''}`}
            >
              {msg.role === MessageRole.MODEL && (
                <div className="text-xs text-indigo-300 mb-1 font-bold tracking-wide uppercase">Aura</div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role === MessageRole.USER && (
           <div className="flex justify-start">
             <div className="glass-panel text-slate-200 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 glass-panel border-t-0 rounded-t-2xl md:rounded-xl md:mb-6 md:mx-6">
        <div className="flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message to Aura..."
            className="flex-1 bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-12 max-h-32 scrollbar-hide"
            rows={1}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputText.trim() || isLoading}
            className="rounded-xl px-4"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};