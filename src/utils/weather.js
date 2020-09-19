const puppeteer = require('puppeteer');

async function getWeather(city) {
  const baseURL = 'https://www.google.com/search?q=Temperatura+';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const cityFormatted = city.replace(/ /g, '+');

  await page.goto(`${baseURL + cityFormatted}`);
  await page.click('span[aria-label=°Celsius]');

  const weather = await page.evaluate(() => {
    const location = document.querySelector('div#wob_loc').innerText;
    const moment = document.querySelector('div#wob_dts').innerText;
    const climate = document.querySelector('span#wob_dc').innerText;
    const temperature = document.querySelector('span#wob_tm').innerText;
    return {
      location,
      moment,
      climate,
      temperature
    };
  });

  return weather;
}

module.exports = {
  getWeather
};
