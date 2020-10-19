const { get } = require('axios');

function mkUrl(lang, text) {
  const encodedText = encodeURI(text);

  // eslint-disable-next-line max-len
  return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodedText}`;
}

async function execute(message, args) {
  const lang = args[0];
  const text = args.slice(1).join(' ');
  const url = mkUrl(lang, text);
  const result = await get(url);
  const translatedText = result.data[0][0][0];
  message.channel.send(`**Tradução:**\`\`\`${translatedText}\`\`\``);
}

module.exports = {
  name: 'translate',
  description: 'Traduz uma palavra, frase ou texto para um idioma específico.',
  execute
};
