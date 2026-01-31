const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Store active stories per channel
const activeStories = new Map();

// Story class to manage state
class Story {
  constructor(channelId, starter) {
    this.channelId = channelId;
    this.starter = starter;
    this.contributions = [];
    this.summary = '';
    this.createdAt = new Date();
    this.lastActivity = new Date();
  }

  addContribution(userId, username, sentence) {
    this.contributions.push({
      userId,
      username,
      sentence,
      timestamp: new Date(),
    });
    this.lastActivity = new Date();
  }

  getFullStory() {
    return [this.starter, ...this.contributions.map(c => c.sentence)].join(' ');
  }

  getFormattedStory() {
    let formatted = `**Story Start:** ${this.starter}\n\n`;
    this.contributions.forEach((c, i) => {
      formatted += `**${c.username}:** ${c.sentence}\n`;
    });
    return formatted;
  }
}

// Command: Start a new story
async function startStory(message) {
  if (activeStories.has(message.channel.id)) {
    return message.reply('There\'s already an active story in this channel! Use `!story end` to finish it first.');
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: 'Start an engaging collaborative story with just 1-2 sentences. Make it intriguing and open-ended so others can continue it. Be creative and set up an interesting scenario.'
      }]
    });

    const storyStart = response.content[0].text.trim();
    const story = new Story(message.channel.id, storyStart);
    activeStories.set(message.channel.id, story);

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📖 New Collaborative Story Started!')
      .setDescription(storyStart)
      .addFields(
        { name: 'How to Participate', value: 'Add to the story using `!add <your sentence>`' },
        { name: 'Other Commands', value: '`!story summary` - Get a summary\n`!story show` - See the full story\n`!story image` - Generate scene image\n`!story end` - End the story' }
      )
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error starting story:', error);
    message.reply('Sorry, I encountered an error starting the story. Please try again.');
  }
}

// Command: Add to the story
async function addToStory(message, sentence) {
  const story = activeStories.get(message.channel.id);
  
  if (!story) {
    return message.reply('No active story in this channel. Start one with `!story start`');
  }

  if (!sentence || sentence.trim().length === 0) {
    return message.reply('Please provide a sentence to add to the story: `!add <your sentence>`');
  }

  // Clean up the sentence
  sentence = sentence.trim();
  
  // Add contribution
  story.addContribution(message.author.id, message.author.username, sentence);

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
    .setDescription(`✍️ ${sentence}`)
    .setFooter({ text: `Story contributions: ${story.contributions.length}` })
    .setTimestamp();

  await message.channel.send({ embeds: [embed] });
}

// Command: Show full story
async function showStory(message) {
  const story = activeStories.get(message.channel.id);
  
  if (!story) {
    return message.reply('No active story in this channel. Start one with `!story start`');
  }

  const storyText = story.getFormattedStory();
  const chunks = splitIntoChunks(storyText, 4000);

  for (let i = 0; i < chunks.length; i++) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(i === 0 ? '📚 Complete Story' : `📚 Complete Story (continued ${i + 1})`)
      .setDescription(chunks[i])
      .setFooter({ text: `Total contributions: ${story.contributions.length}` })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }
}

// Command: Generate summary
async function generateSummary(message) {
  const story = activeStories.get(message.channel.id);
  
  if (!story) {
    return message.reply('No active story in this channel. Start one with `!story start`');
  }

  const fullStory = story.getFullStory();

  try {
    const thinking = await message.channel.send('🤔 Analyzing the story and generating a summary...');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Please provide a concise summary of this collaborative story, highlighting the key plot points, characters, and current situation:\n\n${fullStory}`
      }]
    });

    const summary = response.content[0].text.trim();
    story.summary = summary;

    await thinking.delete();

    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('📝 Story Summary')
      .setDescription(summary)
      .setFooter({ text: `Based on ${story.contributions.length} contributions` })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error generating summary:', error);
    message.reply('Sorry, I encountered an error generating the summary. Please try again.');
  }
}

// Command: Generate scene image
async function generateSceneImage(message) {
  const story = activeStories.get(message.channel.id);
  
  if (!story) {
    return message.reply('No active story in this channel. Start one with `!story start`');
  }

  const fullStory = story.getFullStory();

  try {
    const thinking = await message.channel.send('🎨 Analyzing the scene and generating image prompt...');

    // First, get Claude to create a detailed image prompt based on the story
    const promptResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Based on this story, create a detailed visual description of the current scene that could be used to generate an image. Focus on the setting, characters, mood, and key visual elements. Be specific and vivid:\n\n${fullStory}`
      }]
    });

    const imagePrompt = promptResponse.content[0].text.trim();

    await thinking.edit('🎨 Creating image... (Note: Using prompt description as Discord bots cannot directly generate images without additional APIs)');

    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('🖼️ Scene Visualization')
      .setDescription('**Image Prompt Generated:**\n\n' + imagePrompt)
      .addFields({
        name: '💡 Tip',
        value: 'Copy this prompt to use with image generation services like DALL-E, Midjourney, or Stable Diffusion!'
      })
      .setFooter({ text: 'Image generation requires integration with image APIs' })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error generating scene image:', error);
    message.reply('Sorry, I encountered an error generating the scene visualization. Please try again.');
  }
}

// Command: End story
async function endStory(message) {
  const story = activeStories.get(message.channel.id);
  
  if (!story) {
    return message.reply('No active story in this channel.');
  }

  const fullStory = story.getFullStory();

  try {
    const thinking = await message.channel.send('✍️ Creating final summary and conclusion...');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `This collaborative story has ended. Please provide:\n1. A brief summary of what happened\n2. A satisfying conclusion paragraph that ties up the story\n\nStory:\n${fullStory}`
      }]
    });

    const conclusion = response.content[0].text.trim();

    await thinking.delete();

    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('📖 Story Concluded!')
      .setDescription(conclusion)
      .addFields(
        { name: '📊 Statistics', value: `**Total Contributions:** ${story.contributions.length}\n**Contributors:** ${new Set(story.contributions.map(c => c.username)).size}\n**Duration:** ${Math.round((new Date() - story.createdAt) / 60000)} minutes` }
      )
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });

    // Remove from active stories
    activeStories.delete(message.channel.id);
  } catch (error) {
    console.error('Error ending story:', error);
    message.reply('Sorry, I encountered an error ending the story. Please try again.');
  }
}

// Helper function to split long text into chunks
function splitIntoChunks(text, maxLength) {
  const chunks = [];
  let current = '';
  
  const lines = text.split('\n');
  for (const line of lines) {
    if ((current + line + '\n').length > maxLength) {
      if (current) chunks.push(current.trim());
      current = line + '\n';
    } else {
      current += line + '\n';
    }
  }
  
  if (current) chunks.push(current.trim());
  return chunks;
}

// Help command
async function showHelp(message) {
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📚 Collaborative Storyteller - Help')
    .setDescription('An AI-powered bot for creating collaborative stories!')
    .addFields(
      { name: '!story start', value: 'Start a new collaborative story' },
      { name: '!add <sentence>', value: 'Add your sentence to the active story' },
      { name: '!story show', value: 'Display the complete story so far' },
      { name: '!story summary', value: 'Get an AI-generated summary of the story' },
      { name: '!story image', value: 'Generate a visual description of the current scene' },
      { name: '!story end', value: 'End the current story with an AI conclusion' },
      { name: '!story help', value: 'Show this help message' }
    )
    .setFooter({ text: 'Powered by Claude AI' })
    .setTimestamp();

  await message.channel.send({ embeds: [embed] });
}

// Event: Bot ready
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`📖 Collaborative Storyteller is ready!`);
  client.user.setActivity('collaborative stories | !story help', { type: 'WATCHING' });
});

// Event: Message received
client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  const content = message.content.trim();

  // Handle commands
  if (content === '!story start') {
    await startStory(message);
  } else if (content.startsWith('!add ')) {
    const sentence = content.substring(5);
    await addToStory(message, sentence);
  } else if (content === '!story show') {
    await showStory(message);
  } else if (content === '!story summary') {
    await generateSummary(message);
  } else if (content === '!story image') {
    await generateSceneImage(message);
  } else if (content === '!story end') {
    await endStory(message);
  } else if (content === '!story help') {
    await showHelp(message);
  }
});

// Error handling
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
