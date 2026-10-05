const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getUser, allUsers } = require("../utils/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Show your server leaderboard rank")
    .addUserOption(o => o.setName("user").setDescription("Select a user").setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const target = getUser(interaction.guild.id, user.id);
    const users = Object.entries(allUsers(interaction.guild.id))
      .sort((a, b) => (b[1].level * 100 + b[1].xp) - (a[1].level * 100 + a[1].xp));
    const rank = users.findIndex(([id]) => id === user.id) + 1;

    const embed = new EmbedBuilder()
      .setTitle(`🏆 ${user.username}'s Rank`)
      .setDescription(`**#${rank}** on this server`)
      .addFields(
        { name: "Level", value: `${target.level}`, inline: true },
        { name: "XP", value: `${target.xp}`, inline: true },
        { name: "Coins", value: `${target.coins}`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};
