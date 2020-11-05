const fs = require('fs');
const { resolve } = require('path');

module.exports = async () => {
  const memesListPath = resolve(__dirname, 'memes.json');
  return new Promise((resolve, reject) => {
    fs.readFile(memesListPath, 'utf-8', (err, data) => {
      if (err) return reject(null);
      return resolve(JSON.parse(data));
    });
  });
};
