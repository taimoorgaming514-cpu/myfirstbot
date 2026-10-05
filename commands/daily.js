const { SlashCommandBuilder } = require("discord.js");
const { getUser, updateUser } = require("../utils/database");

const DAY = 24 * 60 * 60 * 1000;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily coins"),
  async execute(interaction) {
    const data = getUser(interaction.guild.id, interaction.user.id);
    const now = Date.now();

    if (now - data.lastDaily < DAY) {
      const remaining = DAY - (now - data.lastDaily);
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      return interaction.reply(`⏳ You already claimed your daily reward. Try again in **${hours}h ${minutes}m**.`);
    }

    updateUser(interaction.guild.id, interaction.user.id, {
      coins: data.coins + 500,
      lastDaily: now
    });

    await interaction.reply(`🎁 **${interaction.user.username}** claimed **500 coins**!`);
  }
};
