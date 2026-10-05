const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member")
    .addUserOption(o => o.setName("user").setDescription("Member to kick").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Kick reason").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ Member not found.", ephemeral: true });

    try {
      await member.kick(reason);
      await interaction.reply(`👢 **${user.tag}** has been kicked.\nReason: ${reason}`);
    } catch {
      await interaction.reply({ content: "❌ I couldn't kick that user. Check my role hierarchy and permissions.", ephemeral: true });
    }
  }
};