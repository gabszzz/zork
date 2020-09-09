const ig = require('instagram-scraping');
const { MessageAttachment } = require('discord.js');

async function execute(message) {
  const result = await ig.scrapeUserPage('stock.images.rar');
  const imageNumber = calculateRandomNumber(result.total);
  const { display_url, text } = result.medias[imageNumber];

  const attachment = new MessageAttachment(display_url);
  message.channel.send(`${text}`, attachment);
}

function calculateRandomNumber(max, min = 0) {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === global.lastCalculatedNumber);

  global.lastCalculatedNumber = randomNumber;
  return randomNumber;
}

module.exports = {
  name: 'wtf',
  description: 'Envia imagens aleatórias e sem sentido.',
  execute
};
