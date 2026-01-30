/**
 * CineMatch - Authentication Module
 * Handles user login, signup, and session management
 */

// Global variables
let users = JSON.parse(localStorage.getItem('cinematch_users')) || {};
let currentUser = null;

/**
 * Switch between login and signup tabs
 * @param {string} tab - Either 'login' or 'signup'
 */
function switchTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
    }
}

/**
 * Handle login form submission
 */
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        showMainApp();
    } else {
        alert('Invalid username or password');
    }
});

/**
 * Handle signup form submission
 */
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    // Validate password match
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    // Check if username already exists
    if (users[username]) {
        alert('Username already exists');
        return;
    }

    // Create new user
    users[username] = {
        password: password,
        movies: []
    };
    localStorage.setItem('cinematch_users', JSON.stringify(users));
    
    currentUser = username;
    showMainApp();
});

/**
 * Show main application and hide authentication screen
 */
function showMainApp() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('currentUser').textContent = currentUser;
    renderMovies();
}

/**
 * Logout current user and return to authentication screen
 */
function logout() {
    currentUser = null;
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    document.getElementById('recommendationsSection').classList.add('hidden');
}
