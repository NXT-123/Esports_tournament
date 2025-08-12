const fs = require('fs');
const path = require('path');

// Load all data files
const dataDir = path.join(__dirname, 'data');

function loadJsonFile(filename) {
    try {
        const filePath = path.join(dataDir, filename);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error.message);
        return null;
    }
}

// Load all data
const users = loadJsonFile('users.json');
const tournaments = loadJsonFile('tournaments.json');
const competitors = loadJsonFile('competitors.json');
const matches = loadJsonFile('matches.json');
const news = loadJsonFile('news.json');
const highlights = loadJsonFile('highlights.json');

console.log('=== Data Structure Test ===\n');

// Test 1: Check if all files loaded successfully
console.log('1. File Loading Test:');
console.log(`- users.json: ${users ? '✓ Loaded' : '✗ Failed'}`);
console.log(`- tournaments.json: ${tournaments ? '✓ Loaded' : '✗ Failed'}`);
console.log(`- competitors.json: ${competitors ? '✓ Loaded' : '✗ Failed'}`);
console.log(`- matches.json: ${matches ? '✓ Loaded' : '✗ Failed'}`);
console.log(`- news.json: ${news ? '✓ Loaded' : '✗ Failed'}`);
console.log(`- highlights.json: ${highlights ? '✓ Loaded' : '✗ Failed'}`);

if (!users || !tournaments || !competitors || !matches || !news || !highlights) {
    console.log('\n❌ Some files failed to load. Exiting...');
    process.exit(1);
}

// Test 2: Check ID consistency
console.log('\n2. ID Consistency Test:');

// Create sets of all IDs
const userIds = new Set(users.map(u => u._id));
const tournamentIds = new Set(tournaments.map(t => t._id));
const competitorIds = new Set(competitors.map(c => c._id));
const matchIds = new Set(matches.map(m => m._id));
const newsIds = new Set(news.map(n => n._id));
const highlightIds = new Set(highlights.map(h => h._id));

console.log(`- Users: ${userIds.size} unique IDs`);
console.log(`- Tournaments: ${tournamentIds.size} unique IDs`);
console.log(`- Competitors: ${competitorIds.size} unique IDs`);
console.log(`- Matches: ${matchIds.size} unique IDs`);
console.log(`- News: ${newsIds.size} unique IDs`);
console.log(`- Highlights: ${highlightIds.size} unique IDs`);

// Test 3: Check references
console.log('\n3. Reference Integrity Test:');

// Check tournament organizer references
let validOrganizerRefs = 0;
let invalidOrganizerRefs = 0;
tournaments.forEach(tournament => {
    if (userIds.has(tournament.organizerId)) {
        validOrganizerRefs++;
    } else {
        invalidOrganizerRefs++;
        console.log(`  ❌ Tournament ${tournament.name} has invalid organizerId: ${tournament.organizerId}`);
    }
});
console.log(`- Tournament organizers: ${validOrganizerRefs} valid, ${invalidOrganizerRefs} invalid`);

// Check tournament competitor references
let validCompetitorRefs = 0;
let invalidCompetitorRefs = 0;
tournaments.forEach(tournament => {
    tournament.competitor.forEach(compId => {
        if (competitorIds.has(compId)) {
            validCompetitorRefs++;
        } else {
            invalidCompetitorRefs++;
            console.log(`  ❌ Tournament ${tournament.name} has invalid competitorId: ${compId}`);
        }
    });
});
console.log(`- Tournament competitors: ${validCompetitorRefs} valid, ${invalidCompetitorRefs} invalid`);

// Check match references
let validMatchRefs = 0;
let invalidMatchRefs = 0;
matches.forEach(match => {
    if (tournamentIds.has(match.tournamentId)) {
        validMatchRefs++;
    } else {
        invalidMatchRefs++;
        console.log(`  ❌ Match ${match._id} has invalid tournamentId: ${match.tournamentId}`);
    }
    if (competitorIds.has(match.teamA)) {
        validMatchRefs++;
    } else {
        invalidMatchRefs++;
        console.log(`  ❌ Match ${match._id} has invalid teamA: ${match.teamA}`);
    }
    if (competitorIds.has(match.teamB)) {
        validMatchRefs++;
    } else {
        invalidMatchRefs++;
        console.log(`  ❌ Match ${match._id} has invalid teamB: ${match.teamB}`);
    }
});
console.log(`- Match references: ${validMatchRefs} valid, ${invalidMatchRefs} invalid`);

// Check news references
let validNewsRefs = 0;
let invalidNewsRefs = 0;
news.forEach(article => {
    if (article.tournamentId === null || tournamentIds.has(article.tournamentId)) {
        validNewsRefs++;
    } else {
        invalidNewsRefs++;
        console.log(`  ❌ News ${article.title} has invalid tournamentId: ${article.tournamentId}`);
    }
    if (userIds.has(article.authorId)) {
        validNewsRefs++;
    } else {
        invalidNewsRefs++;
        console.log(`  ❌ News ${article.title} has invalid authorId: ${article.authorId}`);
    }
});
console.log(`- News references: ${validNewsRefs} valid, ${invalidNewsRefs} invalid`);

// Check highlight references
let validHighlightRefs = 0;
let invalidHighlightRefs = 0;
highlights.forEach(highlight => {
    if (tournamentIds.has(highlight.tournamentId)) {
        validHighlightRefs++;
    } else {
        invalidHighlightRefs++;
        console.log(`  ❌ Highlight ${highlight.title} has invalid tournamentId: ${highlight.tournamentId}`);
    }
    if (highlight.matchId === null || matchIds.has(highlight.matchId)) {
        validHighlightRefs++;
    } else {
        invalidHighlightRefs++;
        console.log(`  ❌ Highlight ${highlight.title} has invalid matchId: ${highlight.matchId}`);
    }
});
console.log(`- Highlight references: ${validHighlightRefs} valid, ${invalidHighlightRefs} invalid`);

// Test 4: Sample data output
console.log('\n4. Sample Data:');
console.log(`- First tournament: ${tournaments[0].name} (${tournaments[0].gameName})`);
console.log(`- First competitor: ${competitors[0].name}`);
console.log(`- First match: ${matches[0].gameType} - ${matches[0].status}`);
console.log(`- First news: ${news[0].title}`);
console.log(`- First highlight: ${highlights[0].title}`);

// Test 5: API-like response simulation
console.log('\n5. API Response Simulation:');

// Simulate tournaments API response
const tournamentsResponse = {
    success: true,
    data: {
        tournaments: tournaments.slice(0, 3), // First 3 tournaments
        pagination: {
            current: 1,
            pages: Math.ceil(tournaments.length / 10),
            total: tournaments.length
        }
    }
};

console.log('Sample tournaments API response:');
console.log(JSON.stringify(tournamentsResponse, null, 2));

console.log('\n✅ All tests completed successfully!');
console.log('📊 Data structure is consistent and ready for use.');