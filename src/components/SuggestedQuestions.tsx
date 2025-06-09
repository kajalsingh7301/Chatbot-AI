import React from 'react';
import { ChatbotData } from '../types';

interface Props {
  questions: ChatbotData[];
  onSelectQuestion: (question: string) => void;
}

const SuggestedQuestions: React.FC<Props> = ({ questions, onSelectQuestion }) => {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 mb-2">
      <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectQuestion(item.question)}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition-colors duration-200"
          >
            {item.question.length > 40 
              ? `${item.question.substring(0, 40)}...` 
              : item.question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;