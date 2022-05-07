async function execute(message, args) {
  if (!args[0]) {
    message.reply('é necessário informar um usuário como parâmetro!');
    return;
  }

  const percent = await getRandomGayPercent();
  message.channel.send(`${args[0]} é ${percent}% gay.`);
}

async function getRandomGayPercent(min = 0, max = 100) {
  const randomPercent = Math.floor(Math.random() * max + min);
  return randomPercent;
}

module.exports = {
  name: 'gaypercent',
  description: 'Revela o quão gay uma pessoa é, em porcentagem.',
  usage: process.env.PREFIX + ' gaypercent <marque alguém>',
  execute
};
