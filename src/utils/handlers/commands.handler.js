const Discord = require('discord.js');
const { readdirSync } = require('fs');

module.exports = (commandsDirectory, client) => {
  client.commands = new Discord.Collection();

  try {
    const commandFiles = readdirSync(commandsDirectory);

    for (const file of commandFiles) {
      const command = require(`${commandsDirectory}/${file}`);
      client.commands.set(command.name, command);
    }

    return commandFiles.length;
  }
  catch (err) {
    console.error(err);
    return false;
  }
};
