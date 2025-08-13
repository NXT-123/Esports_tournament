const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files for frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../../')));

// Helper functions
function getMockTournaments() {
    try {
        const mockDataPath = path.join(__dirname, 'data/tournaments.json');
        const mockData = fs.readFileSync(mockDataPath, 'utf8');
        return JSON.parse(mockData);
    } catch (error) {
        console.error('Error reading mock tournaments data:', error);
        return [];
    }
}

function getMockNews() {
    try {
        const mockDataPath = path.join(__dirname, 'data/news.json');
        const mockData = fs.readFileSync(mockDataPath, 'utf8');
        return JSON.parse(mockData);
    } catch (error) {
        console.error('Error reading mock news data:', error);
        return [];
    }
}

function getMockUsers() {
    try {
        const mockDataPath = path.join(__dirname, 'data/users.json');
        const mockData = fs.readFileSync(mockDataPath, 'utf8');
        return JSON.parse(mockData);
    } catch (error) {
        console.error('Error reading mock users data:', error);
        return [];
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Tournament Management System API is running',
        timestamp: new Date().toISOString(),
        environment: 'development'
    });
});

// Tournaments endpoints
app.get('/api/tournaments/upcoming', (req, res) => {
    try {
        const tournaments = getMockTournaments();
        const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming').slice(0, 10);

        res.json({
            success: true,
            data: { tournaments: upcomingTournaments }
        });
    } catch (error) {
        console.error('Get upcoming tournaments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching upcoming tournaments'
        });
    }
});

app.get('/api/tournaments/ongoing', (req, res) => {
    try {
        const tournaments = getMockTournaments();
        const ongoingTournaments = tournaments.filter(t => t.status === 'ongoing');

        res.json({
            success: true,
            data: { tournaments: ongoingTournaments }
        });
    } catch (error) {
        console.error('Get ongoing tournaments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching ongoing tournaments'
        });
    }
});

// News endpoints
app.get('/api/news/published', (req, res) => {
    try {
        const allNews = getMockNews();
        const publishedNews = allNews.filter(n => n.status === 'published');

        res.json({
            success: true,
            data: { news: publishedNews }
        });
    } catch (error) {
        console.error('Get published news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching published news'
        });
    }
});

app.get('/api/news/featured', (req, res) => {
    try {
        const allNews = getMockNews();
        const featuredNews = allNews
            .filter(n => n.status === 'published')
            .slice(0, 5);

        res.json({
            success: true,
            data: { news: featuredNews }
        });
    } catch (error) {
        console.error('Get featured news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching featured news'
        });
    }
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
    try {
        const { email, fullName, password, role = 'user' } = req.body;

        // Validate required fields
        if (!email || !fullName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email, full name, and password are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Validate role
        const validRoles = ['user', 'organizer', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be user, organizer, or admin'
            });
        }

        // Check if user already exists
        const users = getMockUsers();
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const newUser = {
            _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email,
            fullName,
            passwordHash: password, // In real app, this should be hashed
            role,
            avatarUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=150&h=150&fit=crop&crop=face`
        };

        // Add to users array
        users.push(newUser);

        // Write back to file
        const mockDataPath = path.join(__dirname, 'data/users.json');
        fs.writeFileSync(mockDataPath, JSON.stringify(users, null, 4), 'utf8');

        // Remove password from response
        const userResponse = { ...newUser };
        delete userResponse.passwordHash;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userResponse,
                token: 'mock_token_' + Date.now()
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const users = getMockUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.'
            });
        }

        // Check password (in real app, use bcrypt.compare)
        if (user.passwordHash !== password) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu không đúng. Vui lòng nhập lại mật khẩu.'
            });
        }

        // Create user object for response
        const userResponse = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            avatarUrl: user.avatarUrl
        };

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: userResponse,
                token: 'mock_token_' + Date.now(),
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Simple Tournament Management System Server running on http://localhost:${port}`);
    console.log(`📊 Environment: development`);
    console.log(`🏥 Health Check: http://localhost:${port}/api/health`);
});