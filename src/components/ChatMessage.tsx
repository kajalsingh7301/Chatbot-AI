import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface Props {
  message: ChatMessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const { text, isUser, timestamp } = message;
  
  // Format time as HH:MM
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex mb-4 animate-fadeIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
          <span className="text-xs font-bold">AI</span>
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{text}</p>
        </div>
        <span className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'} text-gray-500`}>
          {formattedTime}
        </span>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2 flex-shrink-0">
          <span className="text-xs font-bold">You</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;