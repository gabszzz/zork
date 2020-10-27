const fs = require('fs');
const { resolve } = require('path');
const { MessageAttachment } = require('discord.js');
const puppeteer = require('puppeteer');
const { connect } = require('http2');

async function execute(message) {
  await updateMemeList();
}

async function scrapeMemes(igPageList) {
  if (!igPageList)
    return false;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com');
  await page.waitForTimeout(3000);
  await page.type('input[name=username]', 'memes_db@hotmail.com');
  await page.type('input[name=password]', '@memesdb2001');
  await page.click('button[type=submit]');
  await page.waitForTimeout(3000);

  // Getting all posts links of all pages
  const postsLinks = new Array();
  for (let igPage of igPageList) {
    await page.goto(`https://www.instagram.com/${igPage}`);
    await page.waitForTimeout(1000);
    const links = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('div.v1Nh3 a[href]');
      const arr = [...nodeList];
      return arr.map(post => post.href);
    });
    postsLinks.push(...links);
  }

  // Getting all media links of posts
  const memesLinks = new Array();
  for (let postLink of postsLinks) {
    await page.goto(postLink);
    await page.waitForTimeout(3000);
    const mediaLink = await page.evaluate(() => {
      const media =
        document
          .querySelector('article video')
        ||
        document
          .querySelector('article img.FFVAD');

      return media.getAttribute('src');
    });
    memesLinks.push(mediaLink);
  }

  browser.close();
  return memesLinks;
}

async function getMemeList() {
  const memesListPath = resolve(__dirname, 'memes.json');
  return new Promise((resolve, reject) => {
    fs.readFile(memesListPath, 'utf-8', (err, data) => {
      if (err) reject(false);
      resolve(data);
    });
  });
}

async function updateMemeList(msInterval = 86400000) {
  console.log('> Atualizando base de memes...');
  const memesListPath = resolve(__dirname, 'memes.json');
  const memesLinks = await scrapeMemes(['randomemesdb']);
  return new Promise((resolve, reject) => {
    if (!memesLinks) reject(false);
    fs.writeFile(memesListPath, JSON.stringify(memesLinks, null, 2), (err) => {
      if (err) reject(false);

      const dateNow = new Date();
      const dateStr = `${dateNow.getHours()}:${dateNow.getMinutes()}`;
      console.log(`> Base de memes atualizada (${dateStr}).`);

      resolve(true);
    });
  });
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
