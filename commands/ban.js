const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member")
    .addUserOption(o => o.setName("user").setDescription("Member to ban").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Ban reason").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    try {
      await interaction.guild.members.ban(user.id, { reason });
      await interaction.reply(`🔨 **${user.tag}** has been banned.\nReason: ${reason}`);
    } catch {
      await interaction.reply({ content: "❌ I couldn't ban that user. Check my role and permissions.", ephemeral: true });
    }
  }
};