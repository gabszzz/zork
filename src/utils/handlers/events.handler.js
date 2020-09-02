const { readdirSync } = require('fs');
const { parse } = require('path');

module.exports = async (eventsDirectory, client) => {
  const eventFiles = readdirSync(eventsDirectory);

  for (const file of eventFiles) {
    const eventName = parse(file).name;
    const event = require(`${eventsDirectory}/${file}`);
    client.on(eventName, event);
  }

};
