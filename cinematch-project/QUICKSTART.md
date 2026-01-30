# CineMatch - Quick Start Guide

A 5-minute guide to get CineMatch running on your machine.

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime Text, Atom, etc.) - Optional
- Git (for cloning) - Optional

## 🚀 Installation

### Option 1: Quick Start (No Server Needed)

1. **Download the project**
   - Download and extract the ZIP file
   - Or clone: `git clone [your-repo-url]`

2. **Open the application**
   ```
   Simply double-click index.html
   ```
   That's it! The app will open in your default browser.

### Option 2: Using a Local Server (Recommended for Development)

**Using Python:**
```bash
cd cinematch-project
python -m http.server 8000
# Open http://localhost:8000 in browser
```

**Using Node.js:**
```bash
cd cinematch-project
npx http-server -p 8000
# Open http://localhost:8000 in browser
```

**Using PHP:**
```bash
cd cinematch-project
php -S localhost:8000
# Open http://localhost:8000 in browser
```

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click index.html
3. Select "Open with Live Server"

## 📁 Project Structure

```
cinematch-project/
│
├── index.html           ← Main entry point
├── css/
│   └── styles.css      ← All styling
├── js/
│   ├── auth.js         ← Login/signup
│   ├── movies.js       ← Movie management
│   ├── recommendations.js
│   └── app.js          ← Initialization
└── docs/               ← Documentation
```

## 🎯 First Steps

1. **Open the app** (see installation above)
2. **Create an account:**
   - Click "Sign Up"
   - Enter username: `demo`
   - Enter password: `password`
   - Click "Create Account"

3. **Add some movies:**
   - Type: "The Matrix"
   - Select: Movie
   - Click Add (or press Enter)
   - Add a few more titles

4. **Get recommendations:**
   - Click "Get Recommendations"
   - View your personalized suggestions!

## 🛠️ Development

### Making Changes

**To modify styles:**
- Edit `css/styles.css`
- Changes reflect immediately (refresh browser)

**To modify functionality:**
- Edit files in `js/` folder
- Refresh browser to see changes

**To modify layout:**
- Edit `index.html`
- Refresh browser to see changes

### Customization Ideas

**Change colors:**
```css
/* In css/styles.css, modify these variables: */
:root {
    --primary: #FFD700;    /* Your color here */
    --accent: #FF6B35;     /* Your color here */
}
```

**Add more recommendations:**
```javascript
// In js/recommendations.js, add to recommendationPool array:
{ 
  title: "Your Movie", 
  type: "movie", 
  reason: "Why it's great" 
}
```

**Change fonts:**
```html
<!-- In index.html, replace Google Fonts link with your fonts -->
<link href="https://fonts.googleapis.com/..." rel="stylesheet">
```

## 🐛 Troubleshooting

**Problem:** Page is blank  
**Solution:** Check browser console (F12) for errors

**Problem:** Styles not loading  
**Solution:** Verify file structure is intact

**Problem:** LocalStorage not working  
**Solution:** Check browser settings allow localStorage

**Problem:** Browser compatibility issues  
**Solution:** Update to latest browser version

## 📚 Next Steps

1. Read `README.md` for detailed project information
2. Check `docs/PROJECT_DOCUMENTATION.md` for comprehensive documentation
3. Review `CHANGELOG.md` to see version history
4. Explore the code and customize to your needs!

## 🤝 Contributing

Want to improve CineMatch?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

Need help? Check:
- **Documentation:** `docs/PROJECT_DOCUMENTATION.md`
- **README:** `README.md`
- **Issues:** [GitHub Issues Page]

---

**Ready to build something amazing?** Start exploring the code! 🎬

*Last updated: January 30, 2026*
