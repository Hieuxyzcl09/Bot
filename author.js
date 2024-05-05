module.exports = {
  name: 'author',
  description: 'Get the author of the bot.',

  execute(message, args) {
    message.channel.send('The author of the bot is [Author Name].');
  },
};
