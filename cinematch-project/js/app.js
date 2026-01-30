/**
 * CineMatch - Main Application
 * Initializes the application and sets up event listeners
 */

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('CineMatch initialized');
    
    // Add Enter key support for movie input
    document.getElementById('movieTitle').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addMovie();
        }
    });
});

/**
 * Application Configuration
 */
const APP_CONFIG = {
    name: 'CineMatch',
    version: '1.0.0',
    storageKey: 'cinematch_users',
    maxRecommendations: 4
};

/**
 * Console welcome message
 */
console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║          CINEMATCH v1.0.0            ║
║     Your Personal Film Curator        ║
║                                       ║
╚═══════════════════════════════════════╝
`);
