# CineMatch - Personal Movie & TV Show Recommender

![CineMatch Logo](https://img.shields.io/badge/CineMatch-v1.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A cinematic web application that provides personalized movie and TV show recommendations based on your viewing history. Built with vanilla JavaScript, featuring a stunning film-noir inspired design with secure user authentication.

## 🎬 Features

- **User Authentication System**: Secure login and signup functionality with password protection
- **Personal Movie Library**: Add and manage your watched movies and TV shows
- **Smart Recommendations**: Get personalized suggestions filtered by your viewing history
- **Persistent Data Storage**: All user data is saved locally in the browser
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Cinematic UI/UX**: Elegant gold and dark-themed interface with smooth animations

## 🚀 Demo

[Live Demo](#) _(Add your deployment link here)_

## 📸 Screenshots

### Authentication Screen
Beautiful login/signup interface with animated backgrounds

### Movie Library
Grid-based layout showcasing your watched content

### Recommendations
Personalized suggestions with detailed reasoning

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom properties, animations, grid/flexbox layouts
- **JavaScript (ES6+)**: Modular code architecture
- **LocalStorage API**: Client-side data persistence
- **Google Fonts**: Bebas Neue & Crimson Pro typography

## 📁 Project Structure

```
cinematch-project/
│
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling and animations
├── js/
│   ├── auth.js            # Authentication logic
│   ├── movies.js          # Movie management functions
│   ├── recommendations.js # Recommendation engine
│   └── app.js             # Main application initialization
└── docs/
    └── PROJECT_DOCUMENTATION.docx
```

## 🎯 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cinematch.git
   cd cinematch
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your web browser
   # Or use a local server (optional):
   python -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

3. **Start using the app**
   - Create an account or login
   - Add your favorite movies and shows
   - Get personalized recommendations!

## 💻 Usage

### Creating an Account
1. Click the "Sign Up" tab
2. Enter a username and password
3. Confirm your password
4. Click "Create Account"

### Adding Movies
1. After logging in, enter a movie or show title
2. Select whether it's a Movie or TV Show
3. Click "Add" or press Enter

### Getting Recommendations
1. Add at least one movie or show to your library
2. Click the "Get Recommendations" button
3. View 4 personalized suggestions with explanations

### Managing Your Library
- Remove any movie from your library by clicking "Remove"
- Your data persists between sessions

## 🎨 Design Philosophy

CineMatch features a **cinematic, film-noir inspired aesthetic** with:

- **Typography**: Bebas Neue for dramatic headings, Crimson Pro for readable body text
- **Color Palette**: Gold (#FFD700) primary, Orange accent (#FF6B35), dark backgrounds
- **Animations**: Smooth transitions, staggered card reveals, glowing effects
- **Layout**: Responsive grid systems, asymmetric spacing, layered depth

## 🔒 Security Considerations

**Note**: This is a demonstration project using client-side storage. For production use, consider:

- Implementing proper backend authentication
- Encrypting passwords with bcrypt or similar
- Using JWT tokens for session management
- Migrating to a database (MongoDB, PostgreSQL, etc.)
- Adding HTTPS for secure data transmission

## 🚀 Future Enhancements

- [ ] Integration with TMDB or IMDB APIs for real movie data
- [ ] Machine learning-based recommendation algorithm
- [ ] User ratings and reviews
- [ ] Social features (share recommendations with friends)
- [ ] Advanced filters (genre, year, rating)
- [ ] Watchlist functionality
- [ ] Dark/Light theme toggle
- [ ] Export/Import user data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- Portfolio: [yourwebsite.com](https://yourwebsite.com)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Font families from Google Fonts
- Inspiration from classic cinema and modern streaming platforms
- Color palette inspired by film noir aesthetics

---

**Built with ❤️ and JavaScript**
