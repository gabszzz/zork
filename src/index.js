require('dotenv').config();

const Discord = require('discord.js');
const commandHandler = require('./utils/handlers/commands.handler');
const eventsHandler = require('./utils/handlers/events.handler');
const { resolve } = require('path');

const client = new Discord.Client();

commandHandler(resolve(__dirname, 'commands'), client);
eventsHandler(resolve(__dirname, 'events'), client);

client.login(process.env.BOT_TOKEN);
