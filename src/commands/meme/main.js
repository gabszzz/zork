const getMemeList = require('./getMemeList');
const { MessageAttachment } = require('discord.js');

async function execute(message) {
  const memeList = await getMemeList();
  const randomNumber = await generateRandomNumber((memeList.length - 1));

  // if (!memeList || !memeList[randomNumber]) {
  //   message.channel.send(`Houve um erro inesperado, ${message.userReference}.`);
  //   return;
  // }
  console.log('randomNumber', randomNumber);
  console.log('memeList', memeList);
  console.log('meme', memeList[randomNumber]);

  const attachment = new MessageAttachment(memeList[randomNumber]);
  message.reply(attachment);
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
  description: 'Envia memes aleatórios de páginas do Instagram.',
  execute
};
