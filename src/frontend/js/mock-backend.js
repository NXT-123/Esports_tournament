// Mock Backend System - Simulates all server functionality using localStorage
// This allows the entire application to run standalone without a real backend server

class MockBackend {
    constructor() {
        this.initializeDatabase();
        this.currentUser = this.getCurrentUser();
    }

    // Initialize mock database with sample data
    initializeDatabase() {
        // Initialize users if not exists
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: '1',
                    email: 'admin@tournament.com',
                    password: 'admin123', // In real app, this would be hashed
                    fullName: 'Administrator',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    email: 'organizer@tournament.com',
                    password: 'organizer123',
                    fullName: 'Tournament Organizer',
                    role: 'organizer',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '3',
                    email: 'user@tournament.com',
                    password: 'user123',
                    fullName: 'Regular User',
                    role: 'user',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        // Initialize tournaments if not exists
        if (!localStorage.getItem('tournaments')) {
            const defaultTournaments = [
                {
                    id: '1',
                    name: 'League of Legends Championship 2024',
                    description: 'Giải đấu League of Legends lớn nhất năm 2024',
                    game: 'League of Legends',
                    startDate: '2024-06-15T10:00:00Z',
                    endDate: '2024-06-17T18:00:00Z',
                    registrationDeadline: '2024-06-10T23:59:59Z',
                    maxParticipants: 64,
                    currentParticipants: 32,
                    prizePool: 50000000,
                    status: 'registration',
                    organizer: { id: '2', fullName: 'Tournament Organizer' },
                    image: '/assets/lol-tournament.jpg',
                    rules: 'Luật chơi theo chuẩn Riot Games...',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    name: 'VALORANT VCT Masters',
                    description: 'Giải đấu VALORANT chuyên nghiệp',
                    game: 'VALORANT',
                    startDate: '2024-07-01T09:00:00Z',
                    endDate: '2024-07-03T20:00:00Z',
                    registrationDeadline: '2024-06-25T23:59:59Z',
                    maxParticipants: 32,
                    currentParticipants: 16,
                    prizePool: 30000000,
                    status: 'registration',
                    organizer: { id: '2', fullName: 'Tournament Organizer' },
                    image: '/assets/valorant-tournament.jpg',
                    rules: 'Luật chơi theo chuẩn Riot Games VALORANT...',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '3',
                    name: 'CS2 Major Championship',
                    description: 'Giải đấu Counter-Strike 2 chuyên nghiệp',
                    game: 'Counter-Strike 2',
                    startDate: '2024-05-20T10:00:00Z',
                    endDate: '2024-05-22T18:00:00Z',
                    registrationDeadline: '2024-05-15T23:59:59Z',
                    maxParticipants: 16,
                    currentParticipants: 16,
                    prizePool: 40000000,
                    status: 'ongoing',
                    organizer: { id: '2', fullName: 'Tournament Organizer' },
                    image: '/assets/cs2-tournament.jpg',
                    rules: 'Luật chơi theo chuẩn Valve...',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('tournaments', JSON.stringify(defaultTournaments));
        }

        // Initialize news if not exists
        if (!localStorage.getItem('news')) {
            const defaultNews = [
                {
                    id: '1',
                    title: 'Thông báo mở đăng ký League of Legends Championship 2024',
                    content: 'Chúng tôi vui mừng thông báo mở đăng ký cho giải đấu League of Legends Championship 2024. Đây là giải đấu lớn nhất trong năm với tổng giải thưởng lên đến 50 triệu VNĐ...',
                    category: 'announcements',
                    featured: true,
                    author: { id: '1', fullName: 'Administrator' },
                    image: '/assets/lol-news.jpg',
                    tags: ['league of legends', 'tournament', 'announcement'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Hướng dẫn đăng ký tham gia giải đấu',
                    content: 'Để đăng ký tham gia giải đấu, các bạn cần thực hiện theo các bước sau...',
                    category: 'guides',
                    featured: false,
                    author: { id: '2', fullName: 'Tournament Organizer' },
                    image: '/assets/guide-news.jpg',
                    tags: ['guide', 'registration', 'tutorial'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '3',
                    title: 'Kết quả vòng bảng CS2 Major Championship',
                    content: 'Vòng bảng của CS2 Major Championship đã kết thúc với nhiều trận đấu hấp dẫn...',
                    category: 'results',
                    featured: true,
                    author: { id: '1', fullName: 'Administrator' },
                    image: '/assets/cs2-results.jpg',
                    tags: ['cs2', 'results', 'championship'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('news', JSON.stringify(defaultNews));
        }

        // Initialize matches if not exists
        if (!localStorage.getItem('matches')) {
            const defaultMatches = [
                {
                    id: '1',
                    tournamentId: '3',
                    team1: 'Team Alpha',
                    team2: 'Team Beta',
                    score1: 16,
                    score2: 12,
                    status: 'completed',
                    scheduledTime: '2024-05-20T14:00:00Z',
                    completedTime: '2024-05-20T15:30:00Z',
                    round: 'quarter-final'
                },
                {
                    id: '2',
                    tournamentId: '3',
                    team1: 'Team Gamma',
                    team2: 'Team Delta',
                    score1: 0,
                    score2: 0,
                    status: 'live',
                    scheduledTime: '2024-05-21T10:00:00Z',
                    round: 'semi-final'
                }
            ];
            localStorage.setItem('matches', JSON.stringify(defaultMatches));
        }

        // Initialize highlights if not exists
        if (!localStorage.getItem('highlights')) {
            const defaultHighlights = [
                {
                    id: '1',
                    title: 'Best Plays - CS2 Quarter Finals',
                    description: 'Những pha highlight đẹp nhất từ vòng tứ kết',
                    videoUrl: '/assets/highlight1.mp4',
                    thumbnailUrl: '/assets/highlight1-thumb.jpg',
                    matchId: '1',
                    featured: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('highlights', JSON.stringify(defaultHighlights));
        }

        // Initialize registrations if not exists
        if (!localStorage.getItem('registrations')) {
            localStorage.setItem('registrations', JSON.stringify([]));
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    // Get current user from localStorage
    getCurrentUser() {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                // In a real app, you'd verify JWT token
                // Here we just decode the user info
                const userData = JSON.parse(atob(token.split('.')[1]));
                return userData;
            } catch (error) {
                localStorage.removeItem('authToken');
                return null;
            }
        }
        return null;
    }

    // Create JWT-like token (mock)
    createToken(user) {
        const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
        const payload = btoa(JSON.stringify({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
        const signature = btoa('mock_signature');
        return `${header}.${payload}.${signature}`;
    }

    // Simulate API delay
    async delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Authentication APIs
    async login(credentials) {
        await this.delay();
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            const token = this.createToken(user);
            localStorage.setItem('authToken', token);
            this.currentUser = user;
            
            return {
                success: true,
                token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                }
            };
        } else {
            throw new Error('Email hoặc mật khẩu không đúng');
        }
    }

    async register(userData) {
        await this.delay();
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email đã được sử dụng');
        }

        const newUser = {
            id: this.generateId(),
            email: userData.email,
            password: userData.password, // In real app, hash this
            fullName: userData.fullName,
            role: userData.role || 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const token = this.createToken(newUser);
        localStorage.setItem('authToken', token);
        this.currentUser = newUser;

        return {
            success: true,
            token: token,
            user: {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role
            }
        };
    }

    async getProfile() {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        return {
            success: true,
            user: {
                id: this.currentUser.id,
                email: this.currentUser.email,
                fullName: this.currentUser.fullName,
                role: this.currentUser.role
            }
        };
    }

    async updateProfile(profileData) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...profileData };
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];
        }

        return {
            success: true,
            user: {
                id: this.currentUser.id,
                email: this.currentUser.email,
                fullName: this.currentUser.fullName,
                role: this.currentUser.role
            }
        };
    }

    async logout() {
        await this.delay();
        localStorage.removeItem('authToken');
        this.currentUser = null;
        return { success: true };
    }

    // Tournament APIs
    async getAllTournaments(filters = {}) {
        await this.delay();
        
        let tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        
        // Apply filters
        if (filters.game) {
            tournaments = tournaments.filter(t => 
                t.game.toLowerCase().includes(filters.game.toLowerCase())
            );
        }
        
        if (filters.status) {
            tournaments = tournaments.filter(t => t.status === filters.status);
        }

        return {
            success: true,
            data: tournaments
        };
    }

    async getTournamentById(id) {
        await this.delay();
        
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournament = tournaments.find(t => t.id === id);
        
        if (!tournament) {
            throw new Error('Không tìm thấy giải đấu');
        }

        // Check if current user is registered
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        const isRegistered = this.currentUser && registrations.some(r => 
            r.tournamentId === id && r.userId === this.currentUser.id
        );

        return {
            success: true,
            data: { ...tournament, isRegistered }
        };
    }

    async getUpcomingTournaments() {
        await this.delay();
        
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const upcoming = tournaments.filter(t => 
            ['registration', 'upcoming'].includes(t.status) &&
            new Date(t.startDate) > new Date()
        );

        return {
            success: true,
            data: upcoming
        };
    }

    async getOngoingTournaments() {
        await this.delay();
        
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const ongoing = tournaments.filter(t => t.status === 'ongoing');

        return {
            success: true,
            data: ongoing
        };
    }

    async searchTournaments(query, filters = {}) {
        await this.delay();
        
        let tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        
        // Search by name, description, or game
        if (query) {
            tournaments = tournaments.filter(t => 
                t.name.toLowerCase().includes(query.toLowerCase()) ||
                t.description.toLowerCase().includes(query.toLowerCase()) ||
                t.game.toLowerCase().includes(query.toLowerCase())
            );
        }

        return {
            success: true,
            data: tournaments
        };
    }

    async createTournament(tournamentData) {
        await this.delay();
        
        if (!this.currentUser || !['organizer', 'admin'].includes(this.currentUser.role)) {
            throw new Error('Không có quyền tạo giải đấu');
        }

        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const newTournament = {
            id: this.generateId(),
            ...tournamentData,
            organizer: {
                id: this.currentUser.id,
                fullName: this.currentUser.fullName
            },
            currentParticipants: 0,
            status: 'draft',
            createdAt: new Date().toISOString()
        };

        tournaments.push(newTournament);
        localStorage.setItem('tournaments', JSON.stringify(tournaments));

        return {
            success: true,
            data: newTournament
        };
    }

    async updateTournament(id, updateData) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournamentIndex = tournaments.findIndex(t => t.id === id);
        
        if (tournamentIndex === -1) {
            throw new Error('Không tìm thấy giải đấu');
        }

        const tournament = tournaments[tournamentIndex];
        
        // Check permission
        if (this.currentUser.role !== 'admin' && tournament.organizer.id !== this.currentUser.id) {
            throw new Error('Không có quyền chỉnh sửa giải đấu này');
        }

        tournaments[tournamentIndex] = { ...tournament, ...updateData };
        localStorage.setItem('tournaments', JSON.stringify(tournaments));

        return {
            success: true,
            data: tournaments[tournamentIndex]
        };
    }

    async deleteTournament(id) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournamentIndex = tournaments.findIndex(t => t.id === id);
        
        if (tournamentIndex === -1) {
            throw new Error('Không tìm thấy giải đấu');
        }

        const tournament = tournaments[tournamentIndex];
        
        // Check permission
        if (this.currentUser.role !== 'admin' && tournament.organizer.id !== this.currentUser.id) {
            throw new Error('Không có quyền xóa giải đấu này');
        }

        tournaments.splice(tournamentIndex, 1);
        localStorage.setItem('tournaments', JSON.stringify(tournaments));

        return { success: true };
    }

    async registerForTournament(tournamentId) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Vui lòng đăng nhập để đăng ký');
        }

        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournament = tournaments.find(t => t.id === tournamentId);
        
        if (!tournament) {
            throw new Error('Không tìm thấy giải đấu');
        }

        if (tournament.status !== 'registration') {
            throw new Error('Giải đấu không đang mở đăng ký');
        }

        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        
        // Check if already registered
        if (registrations.some(r => r.tournamentId === tournamentId && r.userId === this.currentUser.id)) {
            throw new Error('Bạn đã đăng ký giải đấu này rồi');
        }

        // Check if tournament is full
        if (tournament.currentParticipants >= tournament.maxParticipants) {
            throw new Error('Giải đấu đã đầy');
        }

        // Add registration
        registrations.push({
            id: this.generateId(),
            tournamentId: tournamentId,
            userId: this.currentUser.id,
            userFullName: this.currentUser.fullName,
            registeredAt: new Date().toISOString()
        });
        
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Update tournament participant count
        const tournamentIndex = tournaments.findIndex(t => t.id === tournamentId);
        tournaments[tournamentIndex].currentParticipants++;
        localStorage.setItem('tournaments', JSON.stringify(tournaments));

        return { success: true };
    }

    async withdrawFromTournament(tournamentId) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Vui lòng đăng nhập');
        }

        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        const registrationIndex = registrations.findIndex(r => 
            r.tournamentId === tournamentId && r.userId === this.currentUser.id
        );
        
        if (registrationIndex === -1) {
            throw new Error('Bạn chưa đăng ký giải đấu này');
        }

        // Remove registration
        registrations.splice(registrationIndex, 1);
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Update tournament participant count
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournamentIndex = tournaments.findIndex(t => t.id === tournamentId);
        if (tournamentIndex !== -1) {
            tournaments[tournamentIndex].currentParticipants--;
            localStorage.setItem('tournaments', JSON.stringify(tournaments));
        }

        return { success: true };
    }

    // News APIs
    async getAllNews(filters = {}) {
        await this.delay();
        
        let news = JSON.parse(localStorage.getItem('news') || '[]');
        
        if (filters.category) {
            news = news.filter(n => n.category === filters.category);
        }

        return {
            success: true,
            data: news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }

    async getNewsById(id) {
        await this.delay();
        
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const newsItem = news.find(n => n.id === id);
        
        if (!newsItem) {
            throw new Error('Không tìm thấy tin tức');
        }

        return {
            success: true,
            data: newsItem
        };
    }

    async getFeaturedNews() {
        await this.delay();
        
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const featured = news.filter(n => n.featured);

        return {
            success: true,
            data: featured.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }

    async getNewsByCategory(category) {
        await this.delay();
        
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const categoryNews = news.filter(n => n.category === category);

        return {
            success: true,
            data: categoryNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }

    async createNews(newsData) {
        await this.delay();
        
        if (!this.currentUser || !['organizer', 'admin'].includes(this.currentUser.role)) {
            throw new Error('Không có quyền tạo tin tức');
        }

        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const newNews = {
            id: this.generateId(),
            ...newsData,
            author: {
                id: this.currentUser.id,
                fullName: this.currentUser.fullName
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        news.push(newNews);
        localStorage.setItem('news', JSON.stringify(news));

        return {
            success: true,
            data: newNews
        };
    }

    async updateNews(id, updateData) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const newsIndex = news.findIndex(n => n.id === id);
        
        if (newsIndex === -1) {
            throw new Error('Không tìm thấy tin tức');
        }

        const newsItem = news[newsIndex];
        
        // Check permission
        if (this.currentUser.role !== 'admin' && newsItem.author.id !== this.currentUser.id) {
            throw new Error('Không có quyền chỉnh sửa tin tức này');
        }

        news[newsIndex] = { 
            ...newsItem, 
            ...updateData, 
            updatedAt: new Date().toISOString() 
        };
        localStorage.setItem('news', JSON.stringify(news));

        return {
            success: true,
            data: news[newsIndex]
        };
    }

    async deleteNews(id) {
        await this.delay();
        
        if (!this.currentUser) {
            throw new Error('Không có quyền truy cập');
        }

        const news = JSON.parse(localStorage.getItem('news') || '[]');
        const newsIndex = news.findIndex(n => n.id === id);
        
        if (newsIndex === -1) {
            throw new Error('Không tìm thấy tin tức');
        }

        const newsItem = news[newsIndex];
        
        // Check permission
        if (this.currentUser.role !== 'admin' && newsItem.author.id !== this.currentUser.id) {
            throw new Error('Không có quyền xóa tin tức này');
        }

        news.splice(newsIndex, 1);
        localStorage.setItem('news', JSON.stringify(news));

        return { success: true };
    }

    // Health check
    async getHealth() {
        await this.delay(100);
        return {
            success: true,
            message: 'Mock backend is running',
            timestamp: new Date().toISOString()
        };
    }

    // Statistics
    async getTournamentStats() {
        await this.delay();
        
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        
        return {
            success: true,
            data: {
                total: tournaments.length,
                ongoing: tournaments.filter(t => t.status === 'ongoing').length,
                completed: tournaments.filter(t => t.status === 'completed').length,
                registration: tournaments.filter(t => t.status === 'registration').length
            }
        };
    }

    async getAdminStats() {
        await this.delay();
        
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            throw new Error('Không có quyền truy cập');
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        
        return {
            success: true,
            data: {
                users: {
                    total: users.length,
                    active: users.length, // All users are considered active in mock
                    admins: users.filter(u => u.role === 'admin').length,
                    organizers: users.filter(u => u.role === 'organizer').length
                },
                tournaments: {
                    total: tournaments.length,
                    ongoing: tournaments.filter(t => t.status === 'ongoing').length,
                    completed: tournaments.filter(t => t.status === 'completed').length
                },
                news: {
                    total: news.length,
                    featured: news.filter(n => n.featured).length
                }
            }
        };
    }
}

// Create global mock backend instance
export const mockBackend = new MockBackend();

// Make it available globally for debugging
window.mockBackend = mockBackend;