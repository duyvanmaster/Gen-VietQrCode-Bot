const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { VietQR } = require('vietqr');
require('dotenv').config();

// Initialize the Discord bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const bankNames = {
    '970422': 'MBBank',
    '970436': 'Vietcombank',
    '970415': 'VietinBank',
    '970418': 'BIDV',
    '970405': 'Agribank',
    '970448': 'OCB',
    '970407': 'Techcombank',
    '970416': 'ACB',
    '970432': 'VPBank',
    '970423': 'TPBank',
    '970403': 'Sacombank',
    '970437': 'HDBank',
    '970454': 'VietCapitalBank',
    '970429': 'SCB',
    '970441': 'VIB',
    '970443': 'SHB',
    '970431': 'Eximbank',
    '970426': 'MSB',
    '971005': 'ViettelMoney',
    '971011': 'VNPTMoney',
    '970400': 'SaigonBank',
    '970412': 'PVcomBank',
    '970414': 'Oceanbank',
    '970424': 'ShinhanBank',
    '970425': 'ABBANK'
  };
  
// Initialize VietQR with your credentials
let vietQR = new VietQR({
    clientID: '1b0d2d70-c111-406e-9dec-94477f83e333',
    apiKey: 'db1c6efe-ce89-456b-9f7e-935fb5403918',
});

// Event listener for the bot when it's ready
client.once('ready', () => {
    console.log(`./qrcode.js`);
});

// Event listener for interaction with slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'qrcode') {
        const bank = interaction.options.getString('bank');
        const accountNumber = interaction.options.getString('account');
        const accountName = interaction.options.getString('accountname');
        const amount = interaction.options.getInteger('amount');
        const memo = interaction.options.getString('memo');
        const template = interaction.options.getString('template') || 'compact';
        const media = interaction.options.getString('media') || 'jpg';

        try {
            // Generate the quick link using VietQR
            const link = vietQR.genQuickLink({
                bank,
                accountName,
                accountNumber,
                amount,
                memo,
                template,
                media,
            });

            // Create an embed with the information and link
            const embed = new EmbedBuilder()
            .setColor('#ffffff')
            .addFields(
              { 
                name: 'Ngân hàng', 
                value: `${bankNames[bank] || 'Unknown Bank'} \n`, 
                inline: true 
              },
              { 
                name: 'Số tài khoản', 
                value: `${accountNumber}\n`, 
                inline: true 
              },
              { 
                name: 'Tên tài khoản', 
                value: `${accountName}\n`, 
                inline: true 
              },
              { 
                name: 'Số tiền', 
                value: amount ? `${amount} VND\n` : 'N/A\n', 
                inline: true 
              },
              { 
                name: 'Nội dung', 
                value: memo || 'N/A\n', 
                inline: true 
              }
            )
            .setImage(`${link}`)
            .setTimestamp()
          
          

            // Send the embed as a response
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            await interaction.reply('There was an error generating the quick link.');
        }
    }
});

// Log in to Discord with your app's token
client.login(process.env.TOKEN);
