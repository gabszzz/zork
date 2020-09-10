const Discord = require('discord.js');
const { readdirSync } = require('fs');

module.exports = (commandsDirectory, client) => {
  console.log('> Carregando comandos...');

  client.commands = new Discord.Collection();

  try {
    const commandFiles = readdirSync(commandsDirectory);

    for (const file of commandFiles) {
      const command = require(`${commandsDirectory}/${file}`);
      client.commands.set(command.name, command);
    }
    console.log(`> ${commandFiles.length} comandos carregados com sucesso.`);
  } catch (err) {
    console.error(err);
    throw new Error('Houve uma falha ao carregar os comandos!');
  }
};
