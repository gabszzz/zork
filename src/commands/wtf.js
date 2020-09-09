const ig = require('instagram-scraping');
const { MessageAttachment } = require('discord.js');

async function execute(message) {
  let attemps = 0;
  do {
    var { display_url } = await getRandomMediaFromInstagramPage();
    attemps++;
  } while (!display_url && attemps < 3);

  const attachment = new MessageAttachment(display_url);
  message.channel.send(attachment);
}

async function getRandomMediaFromInstagramPage(page = 'stock.images.rar') {
  const posts = await ig.scrapeUserPage(page);

  const max = posts.total;
  const min = 0;
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === global.lastCalculatedNumber);
  global.lastCalculatedNumber = randomNumber;

  return posts.medias[randomNumber];
}

module.exports = {
  name: 'wtf',
  description: 'Envia imagens aleatórias e sem sentido.',
  execute
};
