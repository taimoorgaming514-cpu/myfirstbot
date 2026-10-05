const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Set the welcome channel")
    .addChannelOption(o => o.setName("channel").setDescription("Welcome channel").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    await interaction.reply(`👋 Welcome channel set to ${channel}.`);
  }
};