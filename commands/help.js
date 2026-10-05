const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all bot commands"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("🤖 All-In-One Bot")
      .setDescription("Available commands:")
      .addFields(
        { name: "🛡️ Moderation", value: "`/ban` `/kick` `/timeout` `/untimeout` `/clear`" },
        { name: "🔧 Utility", value: "`/ping` `/serverinfo` `/userinfo` `/avatar` `/help`" }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};