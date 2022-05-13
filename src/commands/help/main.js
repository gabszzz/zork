const Discord = require('discord.js');

async function execute(message) {

  let helpstr = '';

  message.client.commands.map(command => {
    helpstr += '**Nome:** ' + command.name + '\n' +
               '**Descrição:** ' + command.description + '\n' +
               '**Como usar:** ' + command.usage + '\n\n';
  });

  const embed = new Discord.MessageEmbed();

  embed.setTitle('Lista de comandos');
  embed.setDescription(helpstr);
  embed.setFooter(message.client.commands.size + ' comandos.');

  message.channel.send(embed);

}

module.exports = {
  name: 'help',
  description: 'Lista todos os comandos.',
  usage: process.env.PREFIX + ' help',
  execute
};
