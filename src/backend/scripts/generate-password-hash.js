const bcrypt = require('bcryptjs');

// Generate password hash for testing
async function generatePasswordHash(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    return hash;
}

// Test passwords
const testPasswords = [
    'password123',
    'admin123',
    'organizer123',
    'user123'
];

async function main() {
    console.log('Generating password hashes for testing:\n');
    
    for (const password of testPasswords) {
        await generatePasswordHash(password);
        console.log('---');
    }
}

main().catch(console.error);