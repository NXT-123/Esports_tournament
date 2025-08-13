const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Use mock users for now
        if (global.mockUsers && global.mockUsers.has(decoded.id)) {
            const mockUser = global.mockUsers.get(decoded.id);
            req.user = mockUser;
            return next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error during authentication.'
        });
    }
};

// Check if user has required role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Please login first.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${roles.join(' or ')}`
            });
        }

        next();
    };
};

// Check if user is organizer of the tournament
const checkTournamentOwnership = async (req, res, next) => {
    try {
        const tournamentId = req.params.id || req.params.tournamentId || req.body.tournamentId;

        if (!tournamentId) {
            return res.status(400).json({
                success: false,
                message: 'Tournament ID is required.'
            });
        }

        // For now, allow all authenticated users to access tournaments
        // In a real app, you would check tournament ownership from JSON file
        next();
    } catch (error) {
        console.error('Tournament ownership check error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during authorization check.'
        });
    }
};

// Optional authentication (user can be logged in or not)
const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, config.jwtSecret);
                
                // Use mock users for now
                if (global.mockUsers && global.mockUsers.has(decoded.id)) {
                    const mockUser = global.mockUsers.get(decoded.id);
                    req.user = mockUser;
                }
            } catch (error) {
                // Token is invalid, but we continue without user
                console.log('Optional auth failed:', error.message);
            }
        }

        next();
    } catch (error) {
        console.error('Optional authentication error:', error);
        next(); // Continue without authentication
    }
};

module.exports = {
    authenticateToken,
    authorize,
    checkTournamentOwnership,
    optionalAuth
};