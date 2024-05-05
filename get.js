const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'get',
  description: 'Get images from the leak folder.',
  cooldown: 5 * 60, // 5 minutes cooldown

  execute(message, args) {
    if (message.author.id === config.adminId) {
      sendImagesToUser(message.author.id);
    } else {
      message.channel.send('You do not have permission to use this command.');
    }
  },
};

function sendImagesToUser(userId) {
  const directory = `leak/${userId}`;
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    if (files.length === 0) {
      console.log('No images found.');
      return;
    }

    const user = client.users.cache.get(userId);
    if (!user) {
      console.log('User not found.');
      return;
    }

    for (const file of files) {
      const attachment = new Discord.MessageAttachment(`${directory}/${file}`);
      user.send(attachment);
    }
  });
}
