# 📖 Collaborative Storyteller Discord Bot

An AI-powered Discord bot that facilitates collaborative storytelling using Claude AI. Users can take turns adding to a story, and the bot provides summaries, scene descriptions, and story conclusions.

## ✨ Features

- 🎬 **AI Story Starters**: Claude generates engaging story openings
- ✍️ **Collaborative Writing**: Users take turns adding sentences
- 📝 **Story Summaries**: AI-generated summaries of the story so far
- 🖼️ **Scene Visualization**: Generates detailed visual descriptions of current scenes
- 📊 **Story Memory**: Tracks all contributions and maintains context
- 🎭 **Story Conclusions**: AI creates satisfying endings when stories conclude
- 💬 **Rich Embeds**: Beautiful Discord embeds for all interactions

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18.0.0 or higher
- A Discord account
- An Anthropic API account

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section
4. Click "Add Bot"
5. Under "Privileged Gateway Intents", enable:
   - MESSAGE CONTENT INTENT
   - SERVER MEMBERS INTENT (optional)
6. Click "Reset Token" and copy your bot token (save it securely!)

### 2. Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key and copy it (save it securely!)

### 3. Install the Bot

```bash
# Clone or download the project files
cd collaborative-storyteller-bot

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your tokens
# DISCORD_TOKEN=your_discord_bot_token_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Invite Bot to Your Server

1. Go back to Discord Developer Portal
2. Go to "OAuth2" > "URL Generator"
3. Select scopes:
   - `bot`
4. Select bot permissions:
   - Send Messages
   - Embed Links
   - Read Message History
   - Use External Emojis
5. Copy the generated URL and open it in your browser
6. Select your server and authorize the bot

### 5. Start the Bot

```bash
# Start the bot
npm start

# Or for development with auto-restart
npm run dev
```

## 📚 Commands

| Command | Description |
|---------|-------------|
| `!story start` | Start a new collaborative story |
| `!add <sentence>` | Add your sentence to the active story |
| `!story show` | Display the complete story so far |
| `!story summary` | Get an AI-generated summary |
| `!story image` | Generate a visual description of the scene |
| `!story end` | End the story with an AI conclusion |
| `!story help` | Show help message |

## 🎮 How to Use

### Starting a Story

```
User: !story start
Bot: 📖 New Collaborative Story Started!
     The old lighthouse keeper discovered something impossible that night—
     a message in a bottle, addressed to him, dated fifty years in the future.
```

### Adding to the Story

```
User: !add His hands trembled as he broke the wax seal.
Bot: ✍️ His hands trembled as he broke the wax seal.
```

### Getting a Summary

```
User: !story summary
Bot: 📝 Story Summary
     A lighthouse keeper finds a mysterious bottle containing a message 
     from the future addressed to him. He's just opened it with trembling 
     hands, suggesting fear or anticipation about its contents...
```

### Visualizing the Scene

```
User: !story image
Bot: 🖼️ Scene Visualization
     Image Prompt Generated:
     An elderly lighthouse keeper in a weathered stone lighthouse at night,
     illuminated by a single oil lamp. He holds an opened glass bottle with
     trembling hands, an aged letter visible inside...
```

### Ending the Story

```
User: !story end
Bot: 📖 Story Concluded!
     [AI-generated conclusion and summary]
     
     📊 Statistics
     Total Contributions: 8
     Contributors: 3
     Duration: 15 minutes
```

## 🏗️ Project Structure

```
collaborative-storyteller-bot/
├── bot.js              # Main bot code
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .env               # Your actual environment variables (gitignored)
└── README.md          # This file
```

## 🔧 Configuration

The bot uses environment variables for configuration:

- `DISCORD_TOKEN`: Your Discord bot token
- `ANTHROPIC_API_KEY`: Your Anthropic API key

## 🎨 Features Explained

### Story Memory
The bot maintains a `Story` object for each active story that includes:
- Original story starter
- All user contributions with usernames
- Timestamps for activity tracking
- Summary cache

### AI Integration
Uses Claude Sonnet 4 for:
- Generating engaging story starters
- Creating contextual summaries
- Generating scene descriptions
- Writing satisfying conclusions

### Channel Management
- One active story per Discord channel
- Stories are isolated between channels
- Automatic cleanup when stories end

## 🚨 Error Handling

The bot includes comprehensive error handling:
- API request failures
- Invalid commands
- Missing permissions
- Rate limiting considerations

## 💡 Tips for Best Experience

1. **Keep contributions short**: 1-2 sentences work best
2. **Stay consistent**: Follow the story's tone and direction
3. **Use summaries**: Request summaries periodically for long stories
4. **Visualize scenes**: Use `!story image` to get detailed scene descriptions
5. **End stories**: Use `!story end` to get a proper conclusion

## 🔐 Security Notes

- Never commit your `.env` file
- Keep your API keys secure
- Rotate tokens if compromised
- Use environment variables only

## 📝 API Usage

The bot uses:
- **Discord.js v14**: For Discord integration
- **Anthropic SDK**: For Claude AI integration
- **Claude Sonnet 4**: The latest model for best results

## 🐛 Troubleshooting

### Bot doesn't respond
- Check if MESSAGE CONTENT INTENT is enabled
- Verify bot has permissions in the channel
- Check console for error messages

### API errors
- Verify your Anthropic API key is valid
- Check your API usage limits
- Ensure you have credits available

### Bot crashes
- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check error logs for details

## 📜 License

MIT License - feel free to modify and use as you wish!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Acknowledgments

- Built with [Discord.js](https://discord.js.org/)
- Powered by [Anthropic's Claude](https://www.anthropic.com/)
- Inspired by collaborative storytelling games

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review Discord.js documentation
- Check Anthropic API documentation

---

**Happy Storytelling! 📖✨**
