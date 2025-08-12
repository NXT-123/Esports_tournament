// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const USE_MOCK_BACKEND = false; // Using real backend server

// Token management
class TokenManager {
    static getToken() {
        return localStorage.getItem('authToken');
    }

    static setToken(token) {
        localStorage.setItem('authToken', token);
    }

    static removeToken() {
        localStorage.removeItem('authToken');
    }

    static isAuthenticated() {
        return !!this.getToken();
    }
}

// Enhanced API call function with comprehensive error handling and authentication
export async function apiCall(endpoint, data = {}, method = 'GET', requireAuth = false) {
    // Use mock backend if enabled
    if (USE_MOCK_BACKEND) {
        return await callMockBackend(endpoint, data, method, requireAuth);
    }
    
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Add authentication header if required or token is available
    if (requireAuth || TokenManager.isAuthenticated()) {
        const token = TokenManager.getToken();
        if (token) {
            options.headers.Authorization = `Bearer ${token}`;
        } else if (requireAuth) {
            throw new Error('Authentication required but no token found');
        }
    }

    // Add body for non-GET requests
    if (method !== 'GET' && Object.keys(data).length > 0) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        // Handle authentication token from response
        if (result.token) {
            TokenManager.setToken(result.token);
        }

        return result;
    } catch (error) {
        console.error(`API call failed: ${method} ${url}`, error);
        
        // Handle authentication errors
        if (error.message.includes('401') || error.message.includes('unauthorized')) {
            TokenManager.removeToken();
            // Redirect to login if on a protected page
            if (requireAuth && window.location.pathname !== '/login.html') {
                window.location.href = '/login.html';
            }
        }
        
        throw error;
    }
}

// Mock backend API calls
async function callMockBackend(endpoint, data, method, requireAuth) {
    // Import mock backend dynamically to avoid circular dependency
    const { mockBackend } = await import('./mock-backend.js');
    
    // Route to appropriate mock backend method
    const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
    
    try {
        // Authentication endpoints
        if (cleanEndpoint === 'auth/login') {
            return await mockBackend.login(data);
        }
        if (cleanEndpoint === 'auth/register') {
            return await mockBackend.register(data);
        }
        if (cleanEndpoint === 'auth/profile' && method === 'GET') {
            return await mockBackend.getProfile();
        }
        if (cleanEndpoint === 'auth/profile' && method === 'PUT') {
            return await mockBackend.updateProfile(data);
        }
        if (cleanEndpoint === 'auth/logout') {
            return await mockBackend.logout();
        }
        
        // Tournament endpoints
        if (cleanEndpoint === 'tournaments' && method === 'GET') {
            return await mockBackend.getAllTournaments(data);
        }
        if (cleanEndpoint === 'tournaments/upcoming') {
            return await mockBackend.getUpcomingTournaments();
        }
        if (cleanEndpoint === 'tournaments/ongoing') {
            return await mockBackend.getOngoingTournaments();
        }
        if (cleanEndpoint === 'tournaments/search') {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q') || '';
            return await mockBackend.searchTournaments(query, data);
        }
        if (cleanEndpoint.startsWith('tournaments/') && method === 'GET') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.getTournamentById(id);
        }
        if (cleanEndpoint === 'tournaments' && method === 'POST') {
            return await mockBackend.createTournament(data);
        }
        if (cleanEndpoint.startsWith('tournaments/') && method === 'PUT') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.updateTournament(id, data);
        }
        if (cleanEndpoint.startsWith('tournaments/') && method === 'DELETE') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.deleteTournament(id);
        }
        if (cleanEndpoint.includes('/register') && method === 'POST') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.registerForTournament(id);
        }
        if (cleanEndpoint.includes('/withdraw') && method === 'DELETE') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.withdrawFromTournament(id);
        }
        if (cleanEndpoint === 'tournaments/stats') {
            return await mockBackend.getTournamentStats();
        }
        
        // News endpoints
        if (cleanEndpoint === 'news' && method === 'GET') {
            return await mockBackend.getAllNews(data);
        }
        if (cleanEndpoint === 'news/featured') {
            return await mockBackend.getFeaturedNews();
        }
        if (cleanEndpoint.startsWith('news/category/')) {
            const category = cleanEndpoint.split('/')[2];
            return await mockBackend.getNewsByCategory(category);
        }
        if (cleanEndpoint.startsWith('news/') && method === 'GET') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.getNewsById(id);
        }
        if (cleanEndpoint === 'news' && method === 'POST') {
            return await mockBackend.createNews(data);
        }
        if (cleanEndpoint.startsWith('news/') && method === 'PUT') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.updateNews(id, data);
        }
        if (cleanEndpoint.startsWith('news/') && method === 'DELETE') {
            const id = cleanEndpoint.split('/')[1];
            return await mockBackend.deleteNews(id);
        }
        
        // Admin endpoints
        if (cleanEndpoint === 'admin/stats') {
            return await mockBackend.getAdminStats();
        }
        
        // Health check
        if (cleanEndpoint === 'health') {
            return await mockBackend.getHealth();
        }
        
        // Default fallback
        throw new Error(`Mock backend endpoint not implemented: ${method} ${endpoint}`);
        
    } catch (error) {
        console.error(`Mock API call failed: ${method} ${endpoint}`, error);
        throw error;
    }
}

// API endpoints configuration
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        PROFILE: '/auth/profile',
        CHANGE_PASSWORD: '/auth/change-password'
    },
    
    // Tournaments
    TOURNAMENTS: {
        BASE: '/tournaments',
        UPCOMING: '/tournaments/upcoming',
        ONGOING: '/tournaments/ongoing',
        SEARCH: '/tournaments/search',
        BY_GAME: (game) => `/tournaments/game/${game}`,
        BY_ID: (id) => `/tournaments/${id}`,
        PARTICIPANTS: (id) => `/tournaments/${id}/participants`,
        BY_ORGANIZER: (organizerId) => `/tournaments/organizer/${organizerId}`,
        REGISTER: (id) => `/tournaments/${id}/register`,
        WITHDRAW: (id) => `/tournaments/${id}/withdraw`,
        STATUS: (id) => `/tournaments/${id}/status`,
        STATS: '/tournaments/stats'
    },
    
    // News
    NEWS: {
        BASE: '/news',
        BY_ID: (id) => `/news/${id}`,
        FEATURED: '/news/featured',
        BY_CATEGORY: (category) => `/news/category/${category}`
    },
    
    // Matches
    MATCHES: {
        BASE: '/matches',
        BY_ID: (id) => `/matches/${id}`,
        BY_TOURNAMENT: (tournamentId) => `/matches/tournament/${tournamentId}`,
        UPCOMING: '/matches/upcoming',
        LIVE: '/matches/live',
        RESULTS: '/matches/results'
    },
    
    // Highlights
    HIGHLIGHTS: {
        BASE: '/highlights',
        BY_ID: (id) => `/highlights/${id}`,
        FEATURED: '/highlights/featured',
        BY_MATCH: (matchId) => `/highlights/match/${matchId}`
    },
    
    // Users
    USERS: {
        BASE: '/users',
        BY_ID: (id) => `/users/${id}`,
        PROFILE: '/users/profile',
        STATS: (id) => `/users/${id}/stats`
    },
    
    // Admin
    ADMIN: {
        USERS: '/admin/users',
        STATS: '/admin/stats',
        MODERATE: '/admin/moderate'
    },
    
    // Health
    HEALTH: '/health'
};

// Export token manager for use in other modules
export { TokenManager };