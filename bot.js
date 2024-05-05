const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const imageDownloader = require('./utils/imageDownloader');
const imageProcessor = require('./utils/imageProcessor');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (!message.content.startsWith('/')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const commandFile = require(`./commands/${file}`);
    if (commandFile.name === command) {
      if (!isCommandAllowedInChannel(message.channel.id)) {
        message.channel.send('This command is not allowed in this channel.');
        return;
      }

      if (isUserOnCooldown(message.author.id, commandFile.cooldown)) {
        message.channel.send('You are on cooldown for this command.');
        return;
      }

      commandFile.execute(message, args);
      break;
     }

  if (command === 'get') {
    const imageUrl = args[0];
    if (!imageUrl) {
      message.channel.send('Please provide an image URL.');
      return;
    }

    const userId = message.author.id;
    clearUserLeakFolder(userId);
    imageDownloader.downloadImage(imageUrl, userId);
  }
});

function isCommandAllowedInChannel(channelId) {
  const allowedChannels = config.allowedChannels;
  return allowedChannels.includes(channelId);
}

function isUserOnCooldown(userId, cooldown) {
  const cooldowns = cooldownsMap.get(userId) || new Discord.Collection();
  const now = Date.now();
  const timestamp = cooldowns.get(command) || 0;
  const expirationTime = timestamp + cooldown * 1000;

  if (now < expirationTime) {
    return true;
  }

  cooldowns.set(command, now);
  cooldownsMap.set(userId, cooldowns);
  setTimeout(() => cooldowns.delete(command), cooldown * 1000);
  return false;
}

function clearUserLeakFolder(userId) {
  const directory = `leak/${userId}`;
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      fs.unlinkSync(`${directory}/${file}`);
    });
    fs.rmdirSync(directory);
  }
}

client.login(config.token);
