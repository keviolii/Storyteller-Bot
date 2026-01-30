/**
 * CineMatch - Movies Module
 * Handles adding, removing, and displaying user's watched movies/shows
 */

/**
 * Add a new movie or show to the user's list
 */
function addMovie() {
    const title = document.getElementById('movieTitle').value.trim();
    const type = document.getElementById('movieType').value;

    if (!title) return;

    // Initialize movies array if it doesn't exist
    if (!users[currentUser].movies) {
        users[currentUser].movies = [];
    }

    // Add movie to user's list
    users[currentUser].movies.push({ title, type });
    localStorage.setItem('cinematch_users', JSON.stringify(users));

    // Clear input and re-render
    document.getElementById('movieTitle').value = '';
    renderMovies();
}

/**
 * Remove a movie from the user's list
 * @param {number} index - Index of the movie to remove
 */
function removeMovie(index) {
    users[currentUser].movies.splice(index, 1);
    localStorage.setItem('cinematch_users', JSON.stringify(users));
    renderMovies();
}

/**
 * Render the user's movie list to the DOM
 */
function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    const movies = users[currentUser].movies || [];

    if (movies.length === 0) {
        grid.innerHTML = '<div class="empty-state">No movies added yet. Add your favorites to get personalized recommendations.</div>';
        return;
    }

    grid.innerHTML = movies.map((movie, index) => `
        <div class="movie-card">
            <div class="movie-title">${escapeHtml(movie.title)}</div>
            <div class="movie-type">${movie.type}</div>
            <button class="btn-remove" onclick="removeMovie(${index})">Remove</button>
        </div>
    `).join('');
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
