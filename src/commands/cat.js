const { get } = require('axios');

async function execute(message) {
  const res = await get('https://aws.random.cat/meow');
  const file = res.data.file;
  message.channel.send(file);
}

module.exports = {
  name: 'cat',
  description: 'Envia link de imagens (gif, jpg...) de gatos aleatórios.',
  execute
};
