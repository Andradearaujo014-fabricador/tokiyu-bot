const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const CATEGORIA_ID = process.env.CATEGORIA;

// 🛒 PRODUTOS
const produtos = {
  giro: { preco: "R$1,50", desc: "5000x giro" },
  set: { preco: "R$5,00", desc: "Set completo" }
};

// 🤖 BOT ONLINE
client.on('ready', () => {
  console.log('Bot online!');
});

// 🎫 QUANDO ABRIR TICKET
client.on('channelCreate', async (channel) => {
  if (channel.parentId === CATEGORIA_ID) {
    channel.send(`👋 Olá!

🛒 Atendimento automático

Digite o produto que deseja:
➡ giro
➡ set`);
  }
});

// 💬 RESPOSTA AUTOMÁTICA
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // 🔍 verificar produtos
  for (let nome in produtos) {
    if (msg.includes(nome)) {
      let p = produtos[nome];

      message.channel.send(`🛒 Produto: ${p.desc}
💰 Preço: ${p.preco}

💳 Pix: 13d8a112-0bdf-4c4f-9897-00ef097ba223

📩 Após pagar, envie o comprovante.`);
    }
  }

  // 📦 confirmar entrega
  if (msg === "!entregue") {
    message.channel.send("✅ Pedido entregue! Obrigado pela compra.");
  }
});

client.login(TOKEN);