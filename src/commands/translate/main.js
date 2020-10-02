const fetch = require('node-fetch');

function mkUrl(lang, text) {
  const encodedText = encodeURI(text);

  // eslint-disable-next-line max-len
  return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodedText}`;
}

async function execute(message) {
  const prefixSpaceCount = process.env.PREFIX.split(' ').length - 1;
  const messageSplit = message.content.split(' ');
  if (messageSplit.length > 1 + prefixSpaceCount) {
    const lang = messageSplit[1];
    const text = messageSplit.filter((_, index) => index > 1)
      .join(' ')
      .replace('`', '');

    fetch(mkUrl(lang, text))
      .then(req => req.json())
      .then((data) => {
        const translatedText = data[0]
          .map(it => it[0]).join('\n')
          .replace('\n', '. ')
          .replace('@everyone', '');

        if (!translatedText.length) {
          message
            .channel
            .send('Não foi possivel traduzir: Mensagem vazia');

          return;
        }

        // eslint-disable-next-line max-len
        if (
          translatedText.toLowerCase() === 'salve' &&
          lang.toLowerCase() === 'la'
        ) {
          message.channel.send(translatedText);
        } else if (translatedText.toLowerCase() === 'друг') {
          message.channel.send('<:apyr:670415182664695818>');
        } else {
          message.channel.send(`**Tradução:**\`\`\`${translatedText}\`\`\``);
        }

      }).catch((e) => {
        console.error(e);
        message
          .channel
          .send(`Não foi possivel traduzir: \`\`${e.message}\`\``);
      });
  } else {
    message
      .channel
      .send(`Use ${process.env.prefix}translate <idioma-2-digitos> <texto>`);
  }
}

module.exports = {
  name: 'translate',
  description: 'Traduz uma frase',
  execute
};
