const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Playfully slap someone")
    .addUserOption(o => o.setName("user").setDescription("User to slap").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    await interaction.reply(`👋 **${interaction.user.username}** playfully slapped **${user.username}**!`);
  }
};