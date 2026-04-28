const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const TOKEN = process.env.TOKEN;
const CATEGORIA_ID = process.env.CATEGORIA;

client.on('ready', () => {
  console.log('Bot online!');
});

client.on('channelCreate', async (channel) => {
  if (channel.parentId === CATEGORIA_ID) {
    channel.send(`👋 Olá!

🛒 Atendimento iniciado

📌 Envie:
➡ Produto
➡ Quantidade

💰 Pagamento: Pix

⏳ Aguarde...`);
  }
});

client.login(TOKEN);
