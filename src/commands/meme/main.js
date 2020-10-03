const { MessageAttachment } = require('discord.js');
const memeList = require('./memes.json');

async function execute(message) {
  const msg = await message
    .channel
    .send(`Processando meme, ${message.userReference}...`);

  const randomNumber = await generateRandomNumber(memeList.length);
  const meme = memeList[randomNumber];
  await msg.delete();
  const attachment = new MessageAttachment(meme);
  message.channel.send(attachment);
}

async function generateRandomNumber(max, min = 0) {
  do {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === global.lastCalculatedNumber);
  global.lastCalculatedNumber = randomNumber;
  return randomNumber;
}

module.exports = {
  name: 'meme',
  description: 'Envia memes aleatórios.',
  execute
};
