async function execute(message) {

  let helpstr = '';

  message.client.commands.map(command => {
    helpstr += 'Nome: ' + command.name + '\n' +
               'Descrição: ' + command.description + '\n' +
               'Como usar: ' + command.usage + '\n\n';
  });

  message.channel.send(helpstr);

}

module.exports = {
  name: 'help',
  description: 'Lista todos os comandos.',
  usage: process.env.PREFIX + ' help',
  execute
};
