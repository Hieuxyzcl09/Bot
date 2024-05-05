module.exports = {
  name: 'uptime',
  description: 'Get the uptime of the bot.',

  execute(message, args) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));

    message.channel.send(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`);
  },
};
