const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

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

// Define slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('story-start')
    .setDescription('Start a new collaborative story'),
  
  new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add your sentence to the story')
    .addStringOption(option =>
      option.setName('sentence')
        .setDescription('Your contribution to the story')
        .setRequired(true)),
  
  new SlashCommandBuilder()
    .setName('story-show')
    .setDescription('Display the complete story so far'),
  
  new SlashCommandBuilder()
    .setName('story-summary')
    .setDescription('Get an AI-generated summary of the story'),
  
  new SlashCommandBuilder()
    .setName('story-image')
    .setDescription('Generate a visual description of the current scene'),
  
  new SlashCommandBuilder()
    .setName('story-end')
    .setDescription('End the current story with an AI conclusion'),
].map(command => command.toJSON());

// Register slash commands
async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

// Handle interactions (slash commands)
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case 'story-start':
        await interaction.deferReply();
        await startStorySlash(interaction);
        break;
      case 'add':
        await interaction.deferReply();
        await addToStorySlash(interaction);
        break;
      case 'story-show':
        await interaction.deferReply();
        await showStorySlash(interaction);
        break;
      case 'story-summary':
        await interaction.deferReply();
        await generateSummarySlash(interaction);
        break;
      case 'story-image':
        await interaction.deferReply();
        await generateSceneImageSlash(interaction);
        break;
      case 'story-end':
        await interaction.deferReply();
        await endStorySlash(interaction);
        break;
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    const errorMessage = 'Sorry, I encountered an error processing your command.';
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(errorMessage);
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  }
});

// Slash command handlers
async function startStorySlash(interaction) {
  if (activeStories.has(interaction.channel.id)) {
    return interaction.editReply('There\'s already an active story in this channel! Use `/story-end` to finish it first.');
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: 'Start an engaging collaborative story with just 1-2 sentences. Make it intriguing and open-ended so others can continue it. Be creative and set up an interesting scenario.'
    }]
  });

  const storyStart = response.content[0].text.trim();
  const story = new Story(interaction.channel.id, storyStart);
  activeStories.set(interaction.channel.id, story);

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📖 New Collaborative Story Started!')
    .setDescription(storyStart)
    .addFields(
      { name: 'How to Participate', value: 'Add to the story using `/add`' },
      { name: 'Other Commands', value: '`/story-summary` - Get a summary\n`/story-show` - See the full story\n`/story-image` - Generate scene image\n`/story-end` - End the story' }
    )
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function addToStorySlash(interaction) {
  const story = activeStories.get(interaction.channel.id);
  
  if (!story) {
    return interaction.editReply('No active story in this channel. Start one with `/story-start`');
  }

  const sentence = interaction.options.getString('sentence').trim();
  story.addContribution(interaction.user.id, interaction.user.username, sentence);

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`✍️ ${sentence}`)
    .setFooter({ text: `Story contributions: ${story.contributions.length}` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function showStorySlash(interaction) {
  const story = activeStories.get(interaction.channel.id);
  
  if (!story) {
    return interaction.editReply('No active story in this channel. Start one with `/story-start`');
  }

  const storyText = story.getFormattedStory();
  const chunks = splitIntoChunks(storyText, 4000);

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📚 Complete Story')
    .setDescription(chunks[0])
    .setFooter({ text: `Total contributions: ${story.contributions.length}` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });

  // Send additional chunks as follow-up messages
  for (let i = 1; i < chunks.length; i++) {
    const followEmbed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`📚 Complete Story (continued ${i + 1})`)
      .setDescription(chunks[i]);

    await interaction.followUp({ embeds: [followEmbed] });
  }
}

async function generateSummarySlash(interaction) {
  const story = activeStories.get(interaction.channel.id);
  
  if (!story) {
    return interaction.editReply('No active story in this channel. Start one with `/story-start`');
  }

  const fullStory = story.getFullStory();

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

  const embed = new EmbedBuilder()
    .setColor('#FEE75C')
    .setTitle('📝 Story Summary')
    .setDescription(summary)
    .setFooter({ text: `Based on ${story.contributions.length} contributions` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function generateSceneImageSlash(interaction) {
  const story = activeStories.get(interaction.channel.id);
  
  if (!story) {
    return interaction.editReply('No active story in this channel. Start one with `/story-start`');
  }

  const fullStory = story.getFullStory();

  const promptResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Based on this story, create a detailed visual description of the current scene that could be used to generate an image. Focus on the setting, characters, mood, and key visual elements. Be specific and vivid:\n\n${fullStory}`
    }]
  });

  const imagePrompt = promptResponse.content[0].text.trim();

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

  await interaction.editReply({ embeds: [embed] });
}

async function endStorySlash(interaction) {
  const story = activeStories.get(interaction.channel.id);
  
  if (!story) {
    return interaction.editReply('No active story in this channel.');
  }

  const fullStory = story.getFullStory();

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `This collaborative story has ended. Please provide:\n1. A brief summary of what happened\n2. A satisfying conclusion paragraph that ties up the story\n\nStory:\n${fullStory}`
    }]
  });

  const conclusion = response.content[0].text.trim();

  const embed = new EmbedBuilder()
    .setColor('#ED4245')
    .setTitle('📖 Story Concluded!')
    .setDescription(conclusion)
    .addFields(
      { name: '📊 Statistics', value: `**Total Contributions:** ${story.contributions.length}\n**Contributors:** ${new Set(story.contributions.map(c => c.username)).size}\n**Duration:** ${Math.round((new Date() - story.createdAt) / 60000)} minutes` }
    )
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });

  activeStories.delete(interaction.channel.id);
}

// Helper function
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

// Bot ready event
client.on('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`📖 Collaborative Storyteller is ready!`);
  
  if (process.env.CLIENT_ID) {
    await registerCommands();
  } else {
    console.warn('⚠️  CLIENT_ID not found in .env - slash commands will not be registered');
  }
  
  client.user.setActivity('collaborative stories', { type: 3 }); // Type 3 = WATCHING
});

// Error handling
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login
client.login(process.env.DISCORD_TOKEN);
