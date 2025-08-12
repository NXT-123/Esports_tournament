#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Tournament Management System...\n');

// Start backend server
console.log('📡 Starting backend server on port 3000...');
const backend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'src', 'backend'),
    stdio: 'inherit',
    shell: true
});

// Wait a bit for backend to start
setTimeout(() => {
    console.log('\n🌐 Starting frontend server on port 8080...');
    
    // Try to use live-server if available, otherwise use Python
    const frontend = spawn('python', ['-m', 'http.server', '8080'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
    });

    frontend.on('error', (err) => {
        console.error('Failed to start frontend server:', err);
        console.log('Please install Python or use another web server to serve the files');
    });

}, 3000);

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    process.exit(0);
});

console.log('\n✅ Servers are starting up...');
console.log('📝 Backend API: http://localhost:3000');
console.log('🌐 Frontend App: http://localhost:8080');
console.log('\n💡 Press Ctrl+C to stop both servers');