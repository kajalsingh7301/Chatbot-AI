import React from 'react';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Our Support Center</h1>
        
        <p className="text-gray-600 mb-8">
          This is a demonstration of our static chatbot that can help with customer support, 
          internship inquiries, and general AI assistance. Click the chat button in the 
          bottom-right corner to start a conversation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Customer Support</h2>
            <p className="text-sm text-gray-600">
              Get help with password resets, orders, billing, and general account questions.
            </p>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-teal-700 mb-2">Internship Support</h2>
            <p className="text-sm text-gray-600">
              Learn about internship applications, qualifications, and program details.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">AI Assistance</h2>
            <p className="text-sm text-gray-600">
              Get information about AI concepts, machine learning, and related technologies.
            </p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>This chatbot uses a predefined set of questions and answers.</p>
          <p>Try asking about password resets, internship applications, or what machine learning is!</p>
        </div>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}

export default App;