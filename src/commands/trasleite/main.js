async function execute(message) {
  if (Math.random() >= .01) {
    message.channel.send(':milk: Aqui está o seu leite');
  } else {
    message.channel.send('<:naughty:397890892997984256> não vai se fude');
  }
}

module.exports = {
  name: 'trasleite',
  description: 'Traz leite',
  execute
};
