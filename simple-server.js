const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'src/frontend')));
app.use(express.static(__dirname));

// Mock data
const mockTournaments = [
  {
    id: '1',
    name: 'League of Legends Championship',
    game: 'League of Legends',
    status: 'ongoing',
    participants: 16,
    maxParticipants: 32,
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    prize: '$10,000',
    description: 'Annual championship tournament'
  },
  {
    id: '2',
    name: 'CS:GO Major Tournament',
    game: 'Counter-Strike: Global Offensive',
    status: 'upcoming',
    participants: 8,
    maxParticipants: 16,
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    prize: '$25,000',
    description: 'Major CS:GO tournament'
  }
];

const mockNews = [
  {
    id: '1',
    title: 'Tournament Registration Now Open',
    content: 'Registration for the upcoming championship is now available.',
    author: 'Admin',
    publishedAt: '2024-01-10',
    featured: true
  },
  {
    id: '2',
    title: 'New Game Categories Added',
    content: 'We have added support for more games in our platform.',
    author: 'Admin',
    publishedAt: '2024-01-08',
    featured: false
  }
];

// Mock user for testing
let mockUser = null;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, fullName } = req.body;
  
  // Mock registration
  mockUser = {
    id: '1',
    username,
    email,
    fullName,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Registration successful',
    user: mockUser,
    token: 'mock-jwt-token-' + Date.now()
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock login - accept any credentials
  mockUser = {
    id: '1',
    username: 'testuser',
    email: email,
    fullName: 'Test User',
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Login successful',
    user: mockUser,
    token: 'mock-jwt-token-' + Date.now()
  });
});

app.get('/api/auth/profile', (req, res) => {
  if (!mockUser) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  res.json({
    success: true,
    user: mockUser
  });
});

app.post('/api/auth/logout', (req, res) => {
  mockUser = null;
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Tournament routes
app.get('/api/tournaments', (req, res) => {
  res.json({
    success: true,
    data: mockTournaments,
    count: mockTournaments.length
  });
});

app.get('/api/tournaments/upcoming', (req, res) => {
  const upcoming = mockTournaments.filter(t => t.status === 'upcoming');
  res.json({
    success: true,
    data: upcoming,
    count: upcoming.length
  });
});

app.get('/api/tournaments/ongoing', (req, res) => {
  const ongoing = mockTournaments.filter(t => t.status === 'ongoing');
  res.json({
    success: true,
    data: ongoing,
    count: ongoing.length
  });
});

app.get('/api/tournaments/:id', (req, res) => {
  const tournament = mockTournaments.find(t => t.id === req.params.id);
  if (!tournament) {
    return res.status(404).json({ success: false, message: 'Tournament not found' });
  }
  
  res.json({
    success: true,
    data: tournament
  });
});

// News routes
app.get('/api/news', (req, res) => {
  res.json({
    success: true,
    data: mockNews,
    count: mockNews.length
  });
});

app.get('/api/news/featured', (req, res) => {
  const featured = mockNews.filter(n => n.featured);
  res.json({
    success: true,
    data: featured,
    count: featured.length
  });
});

app.get('/api/news/:id', (req, res) => {
  const news = mockNews.find(n => n.id === req.params.id);
  if (!news) {
    return res.status(404).json({ success: false, message: 'News not found' });
  }
  
  res.json({
    success: true,
    data: news
  });
});

// Catch all - serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`🚀 Tournament Management System`);
  console.log(`📡 Backend API running on http://localhost:${port}`);
  console.log(`🌐 Frontend available at http://localhost:${port}`);
  console.log(`✅ Server started successfully!`);
});