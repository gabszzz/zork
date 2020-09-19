const { getWeather } = require('./weather');

module.exports = async (client) => {
  const city = 'São Paulo';

  global.weather = await getWeather(city);
  // Updates the weather every 20 minutes.
  setInterval(async () => {
    global.weather = await getWeather(city);
  }, 1200000);

  const activities = [
    `${global.weather.temperature}°C | ${global.weather.moment}h`,
    global.weather.location,
    global.weather.climate
  ];

  let i = 0;
  setInterval(async () => {
    client.user.setActivity(`${activities[i++ % activities.length]}`);
  }, 8000);
};
