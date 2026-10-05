const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your OwO-style coin balance"),
  async execute(interaction) {
    await interaction.reply(`💰 **${interaction.user.username}**, you have **0 coins**.`);
  }
};