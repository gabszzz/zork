const puppeteer = require('puppeteer');

module.exports = async (igPageList) => {
  if (!igPageList)
    return false;

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();

  await page.goto('https://www.instagram.com');
  await page.waitForTimeout(3000);
  await page.type('input[name=username]', process.env.INSTAGRAM_USER);
  await page.type('input[name=password]', process.env.INSTAGRAM_PASS);
  await page.click('button[type=submit]');
  await page.waitForTimeout(3000);

  // Getting all posts links of all pages
  const postsLinks = new Array();
  for (let igPage of igPageList) {
    await page.goto(`https://www.instagram.com/${igPage}`);
    await page.waitForTimeout(3000);
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
  console.log('memesLinks', memesLinks);
  return memesLinks;
};
