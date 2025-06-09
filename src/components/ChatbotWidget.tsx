import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import InputArea from './InputArea';
import SuggestedQuestions from './SuggestedQuestions';
import { ChatMessage as ChatMessageType, ChatbotStatus, ChatbotData, Category } from '../types';
import { fetchChatbotData, findBestMatch, getSuggestedQuestions } from '../services/chatbotService';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<ChatbotData[]>([]);
  const [status, setStatus] = useState<ChatbotStatus>('idle');
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setStatus('loading');
        await fetchChatbotData();
        setStatus('idle');
        
        // Set initial suggested questions
        const initialSuggestions = getSuggestedQuestions();
        setSuggestedQuestions(initialSuggestions);
      } catch (error) {
        console.error('Failed to load chatbot data', error);
        setStatus('error');
      }
    };
    
    loadData();
  }, []);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
    
    // Add welcome message if opening and no messages yet
    if (!isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
        id: 'welcome',
        text: "Hello! I'm your support assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
  };
  
  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setStatus('loading');
    
    // Find response
    setTimeout(() => {
      const match = findBestMatch(text);
      
      if (match) {
        // Add bot response
        const botMessage: ChatMessageType = {
          id: `bot-${Date.now()}`,
          text: match.answer,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Update current category based on matched question
        setCurrentCategory(match.category);
        
        // Update suggested questions based on the new category
        const newSuggestions = getSuggestedQuestions(match.category);
        setSuggestedQuestions(newSuggestions);
      } else {
        // No match found, send fallback message
        const fallbackMessage: ChatMessageType = {
          id: `bot-fallback-${Date.now()}`,
          text: "Sorry, I didn't understand your question. Please try rephrasing or select from the suggested questions below.",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
        
        // Update suggested questions based on user input
        const newSuggestions = getSuggestedQuestions(undefined, text);
        setSuggestedQuestions(newSuggestions);
      }
      
      setStatus('idle');
    }, 500); // Simulate API call delay
  };
  
  const handleSelectQuestion = (question: string) => {
    handleSendMessage(question);
  };
  
  const handleClearChat = () => {
    // Keep only the welcome message
    const welcomeMessage: ChatMessageType = {
      id: 'welcome',
      text: "Hello! I'm your support assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setCurrentCategory(undefined);
    setSuggestedQuestions(getSuggestedQuestions());
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col mt-4 overflow-hidden transition-transform animate-scaleIn"
          style={{
            transformOrigin: 'bottom right',
          }}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-medium">SupportBot</h3>
            <div className="text-xs bg-blue-700 px-2 py-1 rounded">
              {currentCategory === 'customer_support' && 'Customer Support'}
              {currentCategory === 'internship_support' && 'Internship Support'}
              {currentCategory === 'general_ai' && 'AI Assistance'}
              {!currentCategory && 'General Support'}
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {status === 'error' ? (
              <div className="text-center p-4 text-red-500">
                Failed to load chatbot data. Please try again later.
              </div>
            ) : (
              <>
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {/* Loading indicator */}
                {status === 'loading' && (
                  <div className="flex items-center text-gray-500 text-sm ml-10 mb-4">
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span>Typing...</span>
                  </div>
                )}
                
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Suggested questions */}
          <div className="px-4">
            <SuggestedQuestions 
              questions={suggestedQuestions} 
              onSelectQuestion={handleSelectQuestion} 
            />
          </div>
          
          {/* Input area */}
          <InputArea 
            onSendMessage={handleSendMessage} 
            onClearChat={handleClearChat} 
            isLoading={status === 'loading'} 
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;