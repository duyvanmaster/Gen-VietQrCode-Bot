const { Client, GatewayIntentBits} = require ('discord.js');
const Discord = require("discord.js")
const keep_alive = require ('./keep_alive')
const dotenv = require('dotenv').config();
const commands = require('./commands/commands')
const qrcode = require('./commands/qrcode')
const client = new Client({ intents:
  
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({
    name: '.gg/legitvn',
  });
});

client.login(process.env.TOKEN);