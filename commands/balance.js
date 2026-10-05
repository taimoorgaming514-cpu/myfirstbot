const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../utils/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your coin balance")
    .addUserOption(o => o.setName("user").setDescription("Select a user").setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const data = getUser(interaction.guild.id, user.id);
    await interaction.reply(`💰 **${user.username}** has **${data.coins.toLocaleString()} coins**.`);
  }
};
