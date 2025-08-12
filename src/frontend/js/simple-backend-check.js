// Simple Backend Check - Simplified version for testing

class SimpleBackendCheck {
    constructor() {
        this.isRunning = false;
    }

    // Check if backend is running
    async checkBackend() {
        try {
            console.log('Checking backend connection...');
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const response = await fetch('http://localhost:3000/api/health', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                console.log('✅ Backend is running!');
                this.isRunning = true;
                return true;
            } else {
                console.log('❌ Backend responded but with error status:', response.status);
                this.isRunning = false;
                return false;
            }
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('❌ Backend check timeout - server not responding');
            } else {
                console.log('❌ Backend check failed:', error.message);
            }
            this.isRunning = false;
            return false;
        }
    }

    // Get status
    getStatus() {
        return {
            isRunning: this.isRunning
        };
    }
}

// Create global instance
export const simpleBackendCheck = new SimpleBackendCheck();

// Make available globally for debugging
window.simpleBackendCheck = simpleBackendCheck;