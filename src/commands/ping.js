async function execute(message) {
  const msg = await message.reply('Calculando...');
  msg.edit(`Cálculos finalizados, ${message.userReference}.`);

  message.channel.send({
    embed:
    {
      color: '#c40000',
      title: 'Dados sobre latência',
      fields:
      [
        {
          name: 'Tempo de resposta com a API do discord',
          value: `${Math.round(message.client.ws.ping)}ms.`
        }
      ],
      timestamp: new Date()
    }
  });
}

module.exports = {
  name: 'ping',
  description: 'Calcula o tempo de resposta com a API do discord.',
  execute
};
