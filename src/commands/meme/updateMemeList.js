const fs = require('fs').promises;
const { resolve } = require('path');
const scrapeMemes = require('./scrapeMemes');
const getPages = require('./getPages');

async function update() {
  console.log('> Atualizando base de memes...');
  const memeListPath = resolve(__dirname, 'memes.json');

  const igPages = await getPages();

  const memeLinks = await scrapeMemes(igPages);
  if (!memeLinks) return false;

  await fs.writeFile(memeListPath, JSON.stringify(memeLinks, null, 2));

  const dateNow = new Date();
  const dateStr = `${dateNow.getHours()}:${dateNow.getMinutes()}`;
  console.log(`> Base de memes atualizada (${dateStr}).`);

  return true;
}

module.exports = async (minInterval = 30) => {
  await update();
  setInterval(update, minInterval * 60000);
};
