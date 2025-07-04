# Static Chatbot Application

This is a static chatbot application built with React and Node.js. The chatbot serves three primary functions: customer support, internship support, and general AI assistance.

## Features

- Floating chatbot widget in the bottom-right corner
- Three support categories with predefined Q&A pairs
- Simple string matching algorithm to find the best answers
- Suggested questions based on context
- Clean, responsive UI built with React and Tailwind CSS

## Project Structure

- `src/` - React frontend application
  - `components/` - React components
  - `services/` - API and data handling
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `server.js` - Express server to serve the chatbot data
- `chatbotData.json` - Predefined Q&A pairs

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. In a separate terminal, start the Node.js backend:
   ```
   npm run server
   ```

4. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/chatbot

### Building for Production

1. Build the frontend:
   ```
   npm run build
   ```

2. The production-ready files will be in the `dist/` directory.

3. Deploy both the `dist/` directory and the server files to your hosting provider.

## Testing the Chatbot

1. Click the chat button in the bottom-right corner to open the chatbot.

2. Try asking questions from each category:
   - Customer Support: "How do I reset my password?"
   - Internship Support: "How do I apply for an internship?"
   - AI Assistance: "What is machine learning?"

3. Test the fallback message by asking a question not in the database.

4. Click the suggested questions to see how the chatbot responds.

5. Use the "Clear chat" button to reset the conversation.

## Customization

To customize the chatbot with your own Q&A pairs, edit the `chatbotData.json` file. Each entry should have:
- `id`: A unique identifier
- `category`: One of 'customer_support', 'internship_support', or 'general_ai'
- `question`: The question text
- `answer`: The answer text#   C h a t b o t - A I  
 