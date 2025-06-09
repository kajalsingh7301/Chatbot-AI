import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the dist directory
app.use(express.static('dist'));

// API endpoint to get chatbot data
app.get('/api/chatbot', (req, res) => {
  try {
    const data = fs.readFileSync(join(__dirname, 'chatbotData.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading chatbot data:', error);
    res.status(500).json({ error: 'Failed to load chatbot data' });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Chatbot API available at http://localhost:${PORT}/api/chatbot`);
  console.log(`Open http://localhost:${PORT} in your browser to view the application`);
});