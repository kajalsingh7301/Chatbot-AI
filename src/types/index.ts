export type Category = 'customer_support' | 'internship_support' | 'general_ai';

export interface ChatbotData {
  id: string;
  category: Category;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export type ChatbotStatus = 'idle' | 'loading' | 'error';