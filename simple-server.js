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

// Enhanced Mock data with more detailed information
const mockTournaments = [
  {
    id: '1',
    name: 'League of Legends World Championship',
    game: 'League of Legends',
    status: 'ongoing',
    participants: 16,
    maxParticipants: 32,
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    prize: '$10,000',
    description: 'Annual championship tournament for League of Legends players worldwide',
    category: 'MOBA',
    location: 'Online',
    organizer: 'Riot Games',
    tags: ['esports', 'championship', 'online', 'moba'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
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
    description: 'Major CS:GO tournament with top teams from around the world',
    category: 'FPS',
    location: 'Berlin, Germany',
    organizer: 'ESL Gaming',
    tags: ['fps', 'major', 'offline', 'berlin'],
    createdAt: '2024-01-02',
    updatedAt: '2024-01-12'
  },
  {
    id: '3',
    name: 'Valorant Champions',
    game: 'Valorant',
    status: 'completed',
    participants: 32,
    maxParticipants: 32,
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    prize: '$50,000',
    description: 'The biggest Valorant tournament of the year',
    category: 'FPS',
    location: 'Los Angeles, USA',
    organizer: 'Riot Games',
    tags: ['fps', 'champions', 'offline', 'los-angeles'],
    createdAt: '2023-11-01',
    updatedAt: '2023-12-20'
  },
  {
    id: '4',
    name: 'Dota 2 International',
    game: 'Dota 2',
    status: 'upcoming',
    participants: 5,
    maxParticipants: 24,
    startDate: '2024-03-01',
    endDate: '2024-03-20',
    prize: '$100,000',
    description: 'The most prestigious Dota 2 tournament',
    category: 'MOBA',
    location: 'Seattle, USA',
    organizer: 'Valve Corporation',
    tags: ['moba', 'international', 'offline', 'seattle'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  }
];

const mockNews = [
  {
    id: '1',
    title: 'Tournament Registration Now Open',
    content: 'Registration for the upcoming League of Legends World Championship is now available. Players can sign up through our platform.',
    excerpt: 'Registration for the upcoming championship is now available.',
    author: 'Admin',
    authorId: '1',
    publishedAt: '2024-01-10',
    featured: true,
    category: 'announcement',
    tags: ['registration', 'tournament', 'league-of-legends'],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/news1.jpg',
    views: 1250,
    status: 'published'
  },
  {
    id: '2',
    title: 'New Game Categories Added',
    content: 'We have expanded our platform to include support for more games including Valorant, Apex Legends, and Rocket League.',
    excerpt: 'We have added support for more games in our platform.',
    author: 'Admin',
    authorId: '1',
    publishedAt: '2024-01-08',
    featured: false,
    category: 'update',
    tags: ['games', 'platform', 'update'],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/news2.jpg',
    views: 892,
    status: 'published'
  },
  {
    id: '3',
    title: 'CS:GO Major Tournament Schedule Released',
    content: 'The complete schedule for the upcoming CS:GO Major tournament has been released. Matches will start February 1st.',
    excerpt: 'Complete schedule for CS:GO Major tournament is now available.',
    author: 'Tournament Director',
    authorId: '2',
    publishedAt: '2024-01-12',
    featured: true,
    category: 'schedule',
    tags: ['csgo', 'major', 'schedule'],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/news3.jpg',
    views: 2100,
    status: 'published'
  },
  {
    id: '4',
    title: 'Prize Pool Increased for Dota 2 International',
    content: 'Due to overwhelming community support, the prize pool for The International has been increased to $100,000.',
    excerpt: 'Prize pool increased due to community support.',
    author: 'Finance Team',
    authorId: '3',
    publishedAt: '2024-01-14',
    featured: false,
    category: 'announcement',
    tags: ['dota2', 'prize-pool', 'international'],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/news4.jpg',
    views: 3250,
    status: 'published'
  },
  {
    id: '5',
    title: 'Platform Maintenance Scheduled',
    content: 'We will be performing scheduled maintenance on January 20th from 2AM to 6AM UTC. All services will be temporarily unavailable.',
    excerpt: 'Scheduled maintenance on January 20th.',
    author: 'Tech Team',
    authorId: '4',
    publishedAt: '2024-01-16',
    featured: false,
    category: 'maintenance',
    tags: ['maintenance', 'downtime', 'technical'],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/news5.jpg',
    views: 450,
    status: 'published'
  }
];

// Mock user for testing
let mockUser = null;

// Helper functions for search and filtering
function searchInText(text, query) {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
}

function filterByDateRange(date, startDate, endDate) {
  if (!startDate && !endDate) return true;
  const itemDate = new Date(date);
  if (startDate && itemDate < new Date(startDate)) return false;
  if (endDate && itemDate > new Date(endDate)) return false;
  return true;
}

function paginateResults(items, page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    data: paginatedItems,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(items.length / limit),
      totalItems: items.length,
      itemsPerPage: parseInt(limit),
      hasNextPage: endIndex < items.length,
      hasPrevPage: page > 1
    }
  };
}

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

// Enhanced Tournament routes with search and filtering
app.get('/api/tournaments', (req, res) => {
  const { 
    search, 
    game, 
    status, 
    category, 
    organizer,
    startDate,
    endDate,
    page = 1, 
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  let filteredTournaments = [...mockTournaments];

  // Search filter
  if (search) {
    filteredTournaments = filteredTournaments.filter(tournament => 
      searchInText(tournament.name, search) ||
      searchInText(tournament.description, search) ||
      searchInText(tournament.game, search) ||
      tournament.tags.some(tag => searchInText(tag, search))
    );
  }

  // Game filter
  if (game) {
    filteredTournaments = filteredTournaments.filter(t => 
      t.game.toLowerCase().includes(game.toLowerCase())
    );
  }

  // Status filter
  if (status) {
    filteredTournaments = filteredTournaments.filter(t => t.status === status);
  }

  // Category filter
  if (category) {
    filteredTournaments = filteredTournaments.filter(t => t.category === category);
  }

  // Organizer filter
  if (organizer) {
    filteredTournaments = filteredTournaments.filter(t => 
      searchInText(t.organizer, organizer)
    );
  }

  // Date range filter
  if (startDate || endDate) {
    filteredTournaments = filteredTournaments.filter(t => 
      filterByDateRange(t.startDate, startDate, endDate)
    );
  }

  // Sorting
  filteredTournaments.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'startDate' || sortBy === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });

  // Pagination
  const result = paginateResults(filteredTournaments, page, limit);

  res.json({
    success: true,
    ...result,
    filters: {
      search, game, status, category, organizer, startDate, endDate
    },
    sorting: { sortBy, sortOrder }
  });
});

app.get('/api/tournaments/search', (req, res) => {
  const { q } = req.query;
  
  if (!q || q.length < 2) {
    return res.json({
      success: true,
      data: [],
      suggestions: ['League of Legends', 'CS:GO', 'Valorant', 'Dota 2']
    });
  }

  const searchResults = mockTournaments.filter(tournament => 
    searchInText(tournament.name, q) ||
    searchInText(tournament.game, q) ||
    tournament.tags.some(tag => searchInText(tag, q))
  );

  // Generate suggestions based on search
  const suggestions = [...new Set([
    ...mockTournaments.map(t => t.game),
    ...mockTournaments.map(t => t.category),
    ...mockTournaments.flatMap(t => t.tags)
  ])].filter(item => searchInText(item, q)).slice(0, 5);

  res.json({
    success: true,
    data: searchResults.slice(0, 10), // Limit search results
    count: searchResults.length,
    suggestions
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

// Enhanced News routes with search and filtering
app.get('/api/news', (req, res) => {
  const { 
    search, 
    category, 
    author,
    featured,
    startDate,
    endDate,
    page = 1, 
    limit = 10,
    sortBy = 'publishedAt',
    sortOrder = 'desc'
  } = req.query;

  let filteredNews = [...mockNews];

  // Search filter
  if (search) {
    filteredNews = filteredNews.filter(news => 
      searchInText(news.title, search) ||
      searchInText(news.content, search) ||
      searchInText(news.excerpt, search) ||
      news.tags.some(tag => searchInText(tag, search))
    );
  }

  // Category filter
  if (category) {
    filteredNews = filteredNews.filter(n => n.category === category);
  }

  // Author filter
  if (author) {
    filteredNews = filteredNews.filter(n => 
      searchInText(n.author, author)
    );
  }

  // Featured filter
  if (featured !== undefined) {
    filteredNews = filteredNews.filter(n => n.featured === (featured === 'true'));
  }

  // Date range filter
  if (startDate || endDate) {
    filteredNews = filteredNews.filter(n => 
      filterByDateRange(n.publishedAt, startDate, endDate)
    );
  }

  // Sorting
  filteredNews.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'publishedAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortBy === 'views') {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }
    
    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });

  // Pagination
  const result = paginateResults(filteredNews, page, limit);

  res.json({
    success: true,
    ...result,
    filters: {
      search, category, author, featured, startDate, endDate
    },
    sorting: { sortBy, sortOrder }
  });
});

app.get('/api/news/search', (req, res) => {
  const { q } = req.query;
  
  if (!q || q.length < 2) {
    return res.json({
      success: true,
      data: [],
      suggestions: ['tournament', 'registration', 'update', 'schedule']
    });
  }

  const searchResults = mockNews.filter(news => 
    searchInText(news.title, q) ||
    searchInText(news.content, q) ||
    news.tags.some(tag => searchInText(tag, q))
  );

  // Generate suggestions
  const suggestions = [...new Set([
    ...mockNews.map(n => n.category),
    ...mockNews.flatMap(n => n.tags)
  ])].filter(item => searchInText(item, q)).slice(0, 5);

  res.json({
    success: true,
    data: searchResults.slice(0, 10),
    count: searchResults.length,
    suggestions
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

app.get('/api/news/categories', (req, res) => {
  const categories = [...new Set(mockNews.map(n => n.category))];
  res.json({
    success: true,
    data: categories
  });
});

app.get('/api/news/:id', (req, res) => {
  const news = mockNews.find(n => n.id === req.params.id);
  if (!news) {
    return res.status(404).json({ success: false, message: 'News not found' });
  }
  
  // Increment views
  news.views += 1;
  
  res.json({
    success: true,
    data: news
  });
});

// CRUD operations for news
app.post('/api/news', (req, res) => {
  if (!mockUser) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const { title, content, excerpt, category, tags, featured = false } = req.body;
  
  const newNews = {
    id: String(mockNews.length + 1),
    title,
    content,
    excerpt: excerpt || content.substring(0, 150) + '...',
    author: mockUser.fullName,
    authorId: mockUser.id,
    publishedAt: new Date().toISOString().split('T')[0],
    featured,
    category: category || 'general',
    tags: tags || [],
    imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/default.jpg',
    views: 0,
    status: 'published'
  };

  mockNews.unshift(newNews);

  res.json({
    success: true,
    message: 'News created successfully',
    data: newNews
  });
});

app.put('/api/news/:id', (req, res) => {
  if (!mockUser) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const newsIndex = mockNews.findIndex(n => n.id === req.params.id);
  if (newsIndex === -1) {
    return res.status(404).json({ success: false, message: 'News not found' });
  }

  const { title, content, excerpt, category, tags, featured } = req.body;
  
  const updatedNews = {
    ...mockNews[newsIndex],
    title: title || mockNews[newsIndex].title,
    content: content || mockNews[newsIndex].content,
    excerpt: excerpt || mockNews[newsIndex].excerpt,
    category: category || mockNews[newsIndex].category,
    tags: tags || mockNews[newsIndex].tags,
    featured: featured !== undefined ? featured : mockNews[newsIndex].featured
  };

  mockNews[newsIndex] = updatedNews;

  res.json({
    success: true,
    message: 'News updated successfully',
    data: updatedNews
  });
});

app.delete('/api/news/:id', (req, res) => {
  if (!mockUser) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const newsIndex = mockNews.findIndex(n => n.id === req.params.id);
  if (newsIndex === -1) {
    return res.status(404).json({ success: false, message: 'News not found' });
  }

  const deletedNews = mockNews.splice(newsIndex, 1)[0];

  res.json({
    success: true,
    message: 'News deleted successfully',
    data: deletedNews
  });
});

// Analytics endpoints
app.get('/api/analytics/news', (req, res) => {
  const totalNews = mockNews.length;
  const totalViews = mockNews.reduce((sum, news) => sum + news.views, 0);
  const featuredNews = mockNews.filter(n => n.featured).length;
  const categoriesCount = mockNews.reduce((acc, news) => {
    acc[news.category] = (acc[news.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalNews,
      totalViews,
      featuredNews,
      averageViews: Math.round(totalViews / totalNews),
      categoriesCount,
      recentNews: mockNews.slice(0, 5)
    }
  });
});

app.get('/api/analytics/tournaments', (req, res) => {
  const totalTournaments = mockTournaments.length;
  const ongoingTournaments = mockTournaments.filter(t => t.status === 'ongoing').length;
  const upcomingTournaments = mockTournaments.filter(t => t.status === 'upcoming').length;
  const totalParticipants = mockTournaments.reduce((sum, t) => sum + t.participants, 0);

  res.json({
    success: true,
    data: {
      totalTournaments,
      ongoingTournaments,
      upcomingTournaments,
      totalParticipants,
      averageParticipants: Math.round(totalParticipants / totalTournaments)
    }
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
  console.log(`🚀 Enhanced Tournament Management System`);
  console.log(`📡 Backend API running on http://localhost:${port}`);
  console.log(`🌐 Frontend available at http://localhost:${port}`);
  console.log(`✅ Server started with enhanced search & filtering!`);
});