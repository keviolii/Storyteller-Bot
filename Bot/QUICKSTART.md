# 🚀 Quick Start Guide

Get your Collaborative Storyteller bot running in 5 minutes!

## Step 1: Prerequisites

Make sure you have:
- [Node.js](https://nodejs.org/) installed (version 18 or higher)
- A Discord account
- An Anthropic account

## Step 2: Get Your Tokens

### Discord Bot Token

1. Go to https://discord.com/developers/applications
2. Click "New Application" → Name it "Collaborative Storyteller"
3. Go to "Bot" tab → Click "Add Bot"
4. Enable these under "Privileged Gateway Intents":
   - ✅ MESSAGE CONTENT INTENT
5. Click "Reset Token" → Copy your bot token
6. Go to "General Information" tab → Copy your Application ID (CLIENT_ID)

### Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" → Create a new key
4. Copy your API key

## Step 3: Install & Configure

```bash
# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Edit `.env` and paste your tokens:
```
DISCORD_TOKEN=your_actual_discord_token
CLIENT_ID=your_actual_client_id
ANTHROPIC_API_KEY=your_actual_anthropic_key
```

## Step 4: Invite Bot to Server

1. Back in Discord Developer Portal
2. Go to "OAuth2" → "URL Generator"
3. Select scopes: `bot` and `applications.commands`
4. Select permissions:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Read Message History
5. Copy the URL at the bottom
6. Open URL in browser → Select your server → Authorize

## Step 5: Start the Bot

### Option A: Using Prefix Commands (!)
```bash
npm start
```
Commands: `!story start`, `!add <text>`, `!story summary`, etc.

### Option B: Using Slash Commands (/)
```bash
node bot-slash-commands.js
```
Commands: `/story-start`, `/add`, `/story-summary`, etc.

## Step 6: Test It!

In any Discord channel:

**For prefix commands:**
```
!story start
```

**For slash commands:**
```
/story-start
```

The bot will generate a story starter. Then add to it:

**For prefix commands:**
```
!add The mysterious stranger turned around slowly.
```

**For slash commands:**
```
/add sentence: The mysterious stranger turned around slowly.
```

## 🎉 You're Done!

### Next Steps:
- Try `!story summary` or `/story-summary` to get an AI summary
- Try `!story image` or `/story-image` for scene visualization
- Read the full README.md for more features

### Troubleshooting:
- Bot not responding? Check MESSAGE CONTENT INTENT is enabled
- Slash commands not appearing? Wait a minute or restart Discord
- API errors? Verify your keys are correct in .env

### Need Help?
Check the full README.md or troubleshooting section for detailed help.

---

**Happy Storytelling! 📖✨**
