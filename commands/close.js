const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("close")
    .setDescription("Close the current ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    if (!interaction.channel.name.startsWith("ticket-")) {
      return interaction.reply({ content: "❌ This is not a ticket channel.", ephemeral: true });
    }
    await interaction.reply("🔒 Ticket closing...");
    setTimeout(() => interaction.channel.delete().catch(() => {}), 1500);
  }
};