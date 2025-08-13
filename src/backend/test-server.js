const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Test server is running',
        timestamp: new Date().toISOString()
    });
});

// Test tournaments endpoint
app.get('/api/tournaments/upcoming', (req, res) => {
    res.json({
        success: true,
        data: {
            tournaments: [
                {
                    _id: "test_1",
                    name: "Test Tournament 1",
                    status: "upcoming"
                }
            ]
        }
    });
});

// Test news endpoint
app.get('/api/news/published', (req, res) => {
    res.json({
        success: true,
        data: {
            news: [
                {
                    _id: "test_1",
                    title: "Test News 1",
                    status: "published"
                }
            ]
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Test server running on http://localhost:${port}`);
});