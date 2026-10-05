const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll a dice"),
  async execute(interaction) {
    await interaction.reply(`🎲 You rolled **${Math.floor(Math.random() * 6) + 1}**!`);
  }
};