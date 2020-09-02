const { readdirSync } = require('fs');
const { parse } = require('path');

module.exports = async (command, commandsDirectory) => {
  const commandFiles = readdirSync(commandsDirectory);

  for (file of commandFiles) {
    if (command === parse(file).name) return true;
    else return false;
  }

};
