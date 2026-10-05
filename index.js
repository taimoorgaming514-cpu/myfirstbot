require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"))) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
  console.log(`✅ ${c.user.tag} is online!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const message = { content: "❌ Something went wrong while running this command.", ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(message).catch(() => {});
    } else {
      await interaction.reply(message).catch(() => {});
    }
  }
});

const { getUser, updateUser } = require("./utils/database");

const xpCooldown = new Map();

client.on(Events.MessageCreate, async message => {
  if (message.author.bot || !message.guild) return;

  const key = `${message.guild.id}:${message.author.id}`;
  const now = Date.now();
  if (xpCooldown.has(key) && now - xpCooldown.get(key) < 60000) return;
  xpCooldown.set(key, now);

  const data = getUser(message.guild.id, message.author.id);
  const gained = Math.floor(Math.random() * 11) + 10;
  let xp = data.xp + gained;
  let level = data.level;
  let coins = data.coins + Math.floor(Math.random() * 6) + 1;
  const needed = level * 100;

  if (xp >= needed) {
    xp -= needed;
    level++;
    coins += 100;

    await message.channel.send(
      `🎉 **${message.author.username}** leveled up to **Level ${level}**! +100 bonus coins!`
    ).catch(() => {});
  }

  updateUser(message.guild.id, message.author.id, { xp, level, coins });
});

client.login(process.env.TOKEN);