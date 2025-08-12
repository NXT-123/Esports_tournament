// Router for Single Page Application
import { apiCall, API_ENDPOINTS, TokenManager } from './api.js';
import { renderGuestView } from './views/guestView.js';
import { authController } from './controllers/auth.js';
import { tournamentController } from './controllers/tournaments.js';
import { newsController } from './controllers/news.js';

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.init();
    }

    // Initialize router
    init() {
        // Register routes
        this.addRoute('/', () => this.renderHomePage());
        this.addRoute('/home', () => this.renderHomePage());
        this.addRoute('/login', () => this.renderLoginPage());
        this.addRoute('/register', () => this.renderRegisterPage());
        this.addRoute('/dashboard', () => this.renderDashboardPage());
        this.addRoute('/tournaments', () => this.renderTournamentsPage());
        this.addRoute('/tournament/:id', (id) => this.renderTournamentDetailPage(id));
        this.addRoute('/news', () => this.renderNewsPage());
        this.addRoute('/news/:id', (id) => this.renderNewsDetailPage(id));
        this.addRoute('/profile', () => this.renderProfilePage());
        this.addRoute('/support', () => this.renderSupportPage());

        // Listen for URL changes
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
    }

    // Add a route
    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    // Navigate to a route
    navigate(path) {
        history.pushState(null, null, path);
        this.handleRoute();
    }

    // Handle current route
    handleRoute() {
        const path = window.location.pathname || '/';
        this.currentRoute = path;

        // Check for parameterized routes
        const route = this.findMatchingRoute(path);
        if (route) {
            route.handler(...route.params);
        } else {
            // Default to home page
            this.renderHomePage();
        }
    }

    // Find matching route with parameters
    findMatchingRoute(path) {
        for (const routePath in this.routes) {
            const routeRegex = this.createRouteRegex(routePath);
            const match = path.match(routeRegex);
            
            if (match) {
                const params = match.slice(1); // Remove the full match
                return {
                    handler: this.routes[routePath],
                    params: params
                };
            }
        }
        return null;
    }

    // Create regex for route with parameters
    createRouteRegex(route) {
        const escaped = route.replace(/\//g, '\\/');
        const withParams = escaped.replace(/:([^\/]+)/g, '([^\/]+)');
        return new RegExp(`^${withParams}$`);
    }

    // Route handlers
    async renderHomePage() {
        this.showLoading();
        try {
            await renderGuestView();
            this.setupHomePageEvents();
        } catch (error) {
            console.error('Error rendering home page:', error);
            this.showError('Lỗi tải trang chủ');
        }
    }

    async renderLoginPage() {
        this.showLoading();
        try {
            await this.loadHTMLPage('login.html');
            this.setupLoginPageEvents();
        } catch (error) {
            console.error('Error rendering login page:', error);
            this.showError('Lỗi tải trang đăng nhập');
        }
    }

    async renderRegisterPage() {
        this.showLoading();
        try {
            await this.loadHTMLPage('register.html');
            this.setupRegisterPageEvents();
        } catch (error) {
            console.error('Error rendering register page:', error);
            this.showError('Lỗi tải trang đăng ký');
        }
    }

    async renderDashboardPage() {
        if (!TokenManager.isAuthenticated()) {
            this.navigate('/login');
            return;
        }

        this.showLoading();
        try {
            await this.loadHTMLPage('dashboard.html');
            this.setupDashboardEvents();
        } catch (error) {
            console.error('Error rendering dashboard:', error);
            this.showError('Lỗi tải dashboard');
        }
    }

    async renderTournamentsPage() {
        this.showLoading();
        try {
            await this.loadHTMLPage('tournament-management.html');
            await tournamentController.initManagementPage();
        } catch (error) {
            console.error('Error rendering tournaments page:', error);
            this.showError('Lỗi tải trang giải đấu');
        }
    }

    async renderTournamentDetailPage(id) {
        this.showLoading();
        try {
            await this.loadHTMLPage('tournament-detail.html');
            await tournamentController.initDetailPage(id);
        } catch (error) {
            console.error('Error rendering tournament detail:', error);
            this.showError('Lỗi tải chi tiết giải đấu');
        }
    }

    async renderNewsPage() {
        this.showLoading();
        try {
            await this.loadHTMLPage('news-management.html');
            await newsController.initManagementPage();
        } catch (error) {
            console.error('Error rendering news page:', error);
            this.showError('Lỗi tải trang tin tức');
        }
    }

    async renderNewsDetailPage(id) {
        this.showLoading();
        try {
            await this.loadHTMLPage('view-news.html');
            await newsController.initDetailPage(id);
        } catch (error) {
            console.error('Error rendering news detail:', error);
            this.showError('Lỗi tải chi tiết tin tức');
        }
    }

    async renderProfilePage() {
        if (!TokenManager.isAuthenticated()) {
            this.navigate('/login');
            return;
        }

        this.showLoading();
        try {
            await this.loadHTMLPage('user-profile.html');
            this.setupProfileEvents();
        } catch (error) {
            console.error('Error rendering profile page:', error);
            this.showError('Lỗi tải trang hồ sơ');
        }
    }

    async renderSupportPage() {
        this.showLoading();
        try {
            await this.loadHTMLPage('support.html');
            this.setupSupportEvents();
        } catch (error) {
            console.error('Error rendering support page:', error);
            this.showError('Lỗi tải trang hỗ trợ');
        }
    }

    // Load HTML page content
    async loadHTMLPage(filename) {
        try {
            const response = await fetch(`./src/frontend/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            const html = await response.text();
            
            // Extract body content (remove html, head, body tags)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const bodyContent = tempDiv.querySelector('body')?.innerHTML || html;
            
            const contentElement = document.getElementById('content');
            if (contentElement) {
                contentElement.innerHTML = bodyContent;
            }
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            throw error;
        }
    }

    // Event setup methods
    setupHomePageEvents() {
        // Setup login/register buttons
        const loginBtn = document.getElementById('loginGuestBtn');
        const registerBtn = document.getElementById('registerGuestBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.navigate('/login'));
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.navigate('/register'));
        }

        // Setup navigation events
        this.setupGlobalNavigation();
    }

    setupLoginPageEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(loginForm);
                const credentials = {
                    email: formData.get('email'),
                    password: formData.get('password')
                };

                try {
                    await authController.login(credentials);
                    this.navigate('/dashboard');
                } catch (error) {
                    this.showError('Đăng nhập thất bại: ' + error.message);
                }
            });
        }
    }

    setupRegisterPageEvents() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(registerForm);
                const userData = {
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    fullName: formData.get('fullName')
                };

                try {
                    await authController.register(userData);
                    this.navigate('/dashboard');
                } catch (error) {
                    this.showError('Đăng ký thất bại: ' + error.message);
                }
            });
        }
    }

    setupDashboardEvents() {
        // Setup dashboard-specific events
        this.setupGlobalNavigation();
    }

    setupProfileEvents() {
        // Setup profile-specific events
        this.setupGlobalNavigation();
    }

    setupSupportEvents() {
        // Setup support-specific events
        this.setupGlobalNavigation();
    }

    // Setup global navigation
    setupGlobalNavigation() {
        // Handle all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });

        // Setup logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                authController.logout();
                this.navigate('/');
            });
        }
    }

    // Utility methods
    showLoading() {
        const contentElement = document.getElementById('content');
        if (contentElement) {
            contentElement.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            `;
        }
    }

    showError(message) {
        const contentElement = document.getElementById('content');
        if (contentElement) {
            contentElement.innerHTML = `
                <div class="error-container">
                    <h2>Đã xảy ra lỗi</h2>
                    <p>${message}</p>
                    <button onclick="router.navigate('/')">Về trang chủ</button>
                </div>
            `;
        }
    }
}

// Create global router instance
export const router = new Router();
export default Router;