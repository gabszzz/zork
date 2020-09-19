console.log('> Iniciando...');
require('dotenv').config();

const Discord = require('discord.js');
const weatherActivity = require('./utils/weatherActivity');
const { resolve } = require('path');
const commandHandler = require('./utils/handlers/commands/commands.handler');
const eventsHandler = require('./utils/handlers/events/events.handler');

const client = new Discord.Client();

commandHandler(resolve(__dirname, 'commands'), client);
eventsHandler(resolve(__dirname, 'events'), client);

console.log('> Iniciando mecanismo de atividade meteorológica...');
weatherActivity(client);

console.log('> Autenticando-se com a API do Discord...');
client.login(process.env.BOT_TOKEN);
