import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';

interface Props {
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<Props> = ({ onSendMessage, onClearChat, isLoading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="flex justify-end p-2">
        <button
          onClick={onClearChat}
          className="text-gray-500 hover:text-gray-700 flex items-center text-xs"
          aria-label="Clear chat"
        >
          <RefreshCw size={14} className="mr-1" />
          Clear chat
        </button>
      </div>
      
      <div className="px-4 pb-4">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Type your question..."
            className="w-full py-2 px-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
              input.trim() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;