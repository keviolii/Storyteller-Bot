/**
 * CineMatch - Recommendations Module
 * Handles generating and displaying personalized movie/show recommendations
 */

/**
 * Recommendation pool with popular titles
 * In a production app, this would be replaced with an AI/ML recommendation engine
 */
const recommendationPool = [
    { title: "The Shawshank Redemption", type: "movie", reason: "A masterclass in storytelling and human resilience" },
    { title: "Breaking Bad", type: "show", reason: "Intense character development and gripping narrative" },
    { title: "Inception", type: "movie", reason: "Mind-bending thriller with exceptional cinematography" },
    { title: "The Wire", type: "show", reason: "Deep social commentary with complex characters" },
    { title: "Parasite", type: "movie", reason: "Brilliant social satire with unexpected twists" },
    { title: "Better Call Saul", type: "show", reason: "Character-driven drama with meticulous attention to detail" },
    { title: "Dune", type: "movie", reason: "Epic sci-fi with stunning visuals and world-building" },
    { title: "Succession", type: "show", reason: "Sharp writing and complex family dynamics" },
    { title: "Everything Everywhere All at Once", type: "movie", reason: "Wildly creative multiverse adventure with heart" },
    { title: "The Bear", type: "show", reason: "Intense kitchen drama with authentic emotions" },
    { title: "Oppenheimer", type: "movie", reason: "Historical epic with powerful performances" },
    { title: "The Last of Us", type: "show", reason: "Post-apocalyptic journey with emotional depth" },
    { title: "Interstellar", type: "movie", reason: "Emotionally powerful space exploration with stunning visuals" },
    { title: "Dark", type: "show", reason: "Complex time-travel mystery with intricate plotting" },
    { title: "The Grand Budapest Hotel", type: "movie", reason: "Whimsical storytelling with distinctive visual style" },
    { title: "Fleabag", type: "show", reason: "Sharp, intimate comedy-drama with fourth-wall breaking" },
    { title: "Blade Runner 2049", type: "movie", reason: "Visually stunning neo-noir with philosophical depth" },
    { title: "Chernobyl", type: "show", reason: "Gripping historical drama with meticulous attention to detail" },
    { title: "The Godfather", type: "movie", reason: "Iconic crime saga with complex family dynamics" },
    { title: "True Detective (Season 1)", type: "show", reason: "Atmospheric crime drama with stellar performances" },
    { title: "Eternal Sunshine of the Spotless Mind", type: "movie", reason: "Unique love story with inventive narrative structure" },
    { title: "Atlanta", type: "show", reason: "Innovative comedy with surreal and thought-provoking moments" },
    { title: "Whiplash", type: "movie", reason: "Intense drama about perfection and obsession" },
    { title: "The Leftovers", type: "show", reason: "Profound exploration of grief and meaning" },
    { title: "Mad Max: Fury Road", type: "movie", reason: "Action masterpiece with incredible practical effects" },
    { title: "The Crown", type: "show", reason: "Lavish historical drama with exceptional production value" }
];

/**
 * Generate personalized recommendations based on user's watched content
 */
function getRecommendations() {
    const movies = users[currentUser].movies || [];
    
    if (movies.length === 0) {
        alert('Please add some movies or shows first!');
        return;
    }

    // Filter out already watched content
    const watchedTitles = movies.map(m => m.title.toLowerCase());
    const available = recommendationPool.filter(r => 
        !watchedTitles.includes(r.title.toLowerCase())
    );

    // Get random recommendations (up to 4)
    const recommendations = [];
    const shuffled = available.sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.min(4, shuffled.length); i++) {
        recommendations.push(shuffled[i]);
    }

    renderRecommendations(recommendations);
}

/**
 * Render recommendations to the DOM
 * @param {Array} recommendations - Array of recommendation objects
 */
function renderRecommendations(recommendations) {
    const section = document.getElementById('recommendationsSection');
    const grid = document.getElementById('recommendationsGrid');

    if (recommendations.length === 0) {
        grid.innerHTML = '<div class="empty-state">You\'ve watched everything we can recommend! Add more titles to get new suggestions.</div>';
    } else {
        grid.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-title">${escapeHtml(rec.title)}</div>
                <div class="rec-type">${rec.type}</div>
                <div class="rec-reason">${escapeHtml(rec.reason)}</div>
            </div>
        `).join('');
    }

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
