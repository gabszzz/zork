const error = require('../utils/handlers/errors.handler');
const commandSearcher = require('../utils/commandSearcher');
const { resolve } = require('path');

const prefix = process.env.PREFIX;

module.exports = async (message) => {
  if (message.author.id === process.env.OWNER_ID) {
    message.userReference = process.env.OWNER_NAME;
    global.userReference = process.env.OWNER_NAME;
  } else {
    message.userReference = message.member;
    global.userReference = message.member;
  }

  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!command) throw new Error(error.COMMAND_NOT_INFORMED);

    const commandExists =
      await commandSearcher(command, resolve(__dirname, '..', 'commands'));
    if (!commandExists) throw new Error(error.COMMAND_NOT_FOUND);

    message.client.commands.get(command).execute(message, args);
  } catch (err) {
    error.handler(err, message);
  }
};
