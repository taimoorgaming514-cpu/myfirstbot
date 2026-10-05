const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("untimeout")
    .setDescription("Remove a member's timeout")
    .addUserOption(o => o.setName("user").setDescription("Member").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ Member not found.", ephemeral: true });

    try {
      await member.timeout(null, `Timeout removed by ${interaction.user.tag}`);
      await interaction.reply(`🔊 Timeout removed from **${user.tag}**.`);
    } catch {
      await interaction.reply({ content: "❌ I couldn't remove the timeout.", ephemeral: true });
    }
  }
};