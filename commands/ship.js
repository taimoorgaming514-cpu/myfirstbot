const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Fun compatibility score")
    .addUserOption(o => o.setName("user").setDescription("Choose a user").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const score = Math.floor(Math.random() * 101);
    await interaction.reply(`💖 **${interaction.user.username}** + **${user.username}** = **${score}%** compatibility!`);
  }
};