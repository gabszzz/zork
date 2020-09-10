const { getUserByUsername } = require('instapro');
const { MessageAttachment } = require('discord.js');
const { resolve } = require('path');

async function execute(message) {
  const loadingGIF =
    resolve(__dirname, '..', 'assets', 'images', 'loading.gif');

  const msg = await message
    .channel
    .send(
      `Vasculhando a rede em busca de memes, ${message.userReference} ...`,
      {
        files: [loadingGIF]
      }
    );

  const media = await getRandomMediaFromInstagramPage();

  if (media.__typename === 'GraphVideo') {
    const attachment = new MessageAttachment(media.video_url);

    await msg.delete();
    message.channel.send(attachment);

  } else if (media.__typename === 'GraphImage') {
    const attachment = new MessageAttachment(media.display_url);

    await msg.delete();
    message.channel.send(attachment);
  }
}

async function getRandomMediaFromInstagramPage(page = 'absolutelymemesbr') {
  const fetch = await getUserByUsername(page);
  const posts = fetch.edge_owner_to_timeline_media.edges;
  const max =  posts.length;
  const randomNumber = generateRandomNumber(max);

  return posts[randomNumber].node;
}

function generateRandomNumber(max, min = 0) {
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
