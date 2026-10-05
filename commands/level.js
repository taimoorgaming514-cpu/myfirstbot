const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getUser } = require("../utils/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Show your current level and XP")
    .addUserOption(o => o.setName("user").setDescription("Select a user").setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const data = getUser(interaction.guild.id, user.id);
    const needed = data.level * 100;

    const embed = new EmbedBuilder()
      .setTitle(`⭐ ${user.username}'s Level`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Level", value: `${data.level}`, inline: true },
        { name: "XP", value: `${data.xp} / ${needed}`, inline: true },
        { name: "Coins", value: `${data.coins}`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};
