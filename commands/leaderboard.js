const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { allUsers } = require("../utils/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the top 10 members by level and XP"),
  async execute(interaction) {
    const users = allUsers(interaction.guild.id);
    const top = Object.entries(users)
      .sort((a, b) => (b[1].level * 100 + b[1].xp) - (a[1].level * 100 + a[1].xp))
      .slice(0, 10);

    if (!top.length) return interaction.reply("📊 No XP data yet.");

    const lines = [];
    for (let i = 0; i < top.length; i++) {
      const [id, data] = top[i];
      const member = await interaction.guild.members.fetch(id).catch(() => null);
      lines.push(`**${i + 1}.** ${member ? member.user.username : id} — Level **${data.level}** • ${data.xp} XP`);
    }

    const embed = new EmbedBuilder()
      .setTitle("🏆 Server Leaderboard")
      .setDescription(lines.join("\n"));
    await interaction.reply({ embeds: [embed] });
  }
};
