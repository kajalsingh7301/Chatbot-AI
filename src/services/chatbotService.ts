import Fuse from 'fuse.js';
import { ChatbotData, Category } from '../types';
import { calculateStringSimilarity, extractKeywords } from '../utils/stringUtils';

// Threshold for string similarity matching
const SIMILARITY_THRESHOLD = 0.7;

// Cache for the chatbot data
let chatbotDataCache: ChatbotData[] = [];

// Initialize Fuse.js instance for fuzzy searching
let fuse: Fuse<ChatbotData> | null = null;

/**
 * Fetches chatbot data from the server
 */
export async function fetchChatbotData(): Promise<ChatbotData[]> {
  try {
    // In development, use localhost
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3000/api/chatbot'
      : '/api/chatbot';
      
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch chatbot data: ${response.statusText}`);
    }
    
    const data: ChatbotData[] = await response.json();
    chatbotDataCache = data;
    
    // Initialize Fuse.js with the fetched data
    fuse = new Fuse(data, {
      keys: ['question'],
      includeScore: true,
      threshold: 0.4
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching chatbot data:', error);
    throw error;
  }
}

/**
 * Finds the best matching question for the user input
 * @param userInput The user's question
 * @returns The matching chatbot data or null if no match found
 */
export function findBestMatch(userInput: string): ChatbotData | null {
  if (!userInput.trim()) return null;
  
  // Try fuzzy search first (using Fuse.js)
  if (fuse && chatbotDataCache.length > 0) {
    const results = fuse.search(userInput);
    
    if (results.length > 0 && results[0].score && results[0].score < 0.4) {
      return results[0].item;
    }
  }
  
  // Fall back to our custom similarity algorithm
  let bestMatch: ChatbotData | null = null;
  let highestSimilarity = 0;
  
  for (const item of chatbotDataCache) {
    const similarity = calculateStringSimilarity(userInput, item.question);
    
    if (similarity > highestSimilarity && similarity >= SIMILARITY_THRESHOLD) {
      highestSimilarity = similarity;
      bestMatch = item;
    }
  }
  
  return bestMatch;
}

/**
 * Gets suggested questions based on category or keywords
 * @param category Optional category to filter by
 * @param userInput Optional user input to find related questions
 * @returns Array of suggested questions
 */
export function getSuggestedQuestions(category?: Category, userInput?: string): ChatbotData[] {
  if (!chatbotDataCache.length) return [];
  
  // If category is provided, filter questions by that category
  if (category) {
    return chatbotDataCache
      .filter(item => item.category === category)
      .slice(0, 5);
  }
  
  // If user input is provided, try to find related questions
  if (userInput && userInput.trim().length > 0) {
    const keywords = extractKeywords(userInput);
    
    if (keywords.length > 0) {
      // Score each question based on keyword matches
      const scoredQuestions = chatbotDataCache.map(item => {
        const questionKeywords = extractKeywords(item.question);
        let score = 0;
        
        for (const keyword of keywords) {
          if (questionKeywords.some(qk => qk.includes(keyword) || keyword.includes(qk))) {
            score += 1;
          }
        }
        
        return { item, score };
      });
      
      // Sort by score (descending) and take top 5
      return scoredQuestions
        .sort((a, b) => b.score - a.score)
        .filter(item => item.score > 0)
        .map(item => item.item)
        .slice(0, 5);
    }
  }
  
  // Default: return a mix of questions from all categories
  const result: ChatbotData[] = [];
  const categories: Category[] = ['customer_support', 'internship_support', 'general_ai'];
  
  // Take 1-2 questions from each category
  for (const cat of categories) {
    const categoryQuestions = chatbotDataCache
      .filter(item => item.category === cat)
      .slice(0, 2);
    
    result.push(...categoryQuestions);
  }
  
  return result.slice(0, 5);
}