const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create a private support ticket"),
  async execute(interaction) {
    const existing = interaction.guild.channels.cache.find(
      c => c.name === `ticket-${interaction.user.id}` && c.type === ChannelType.GuildText
    );
    if (existing) return interaction.reply({ content: `🎫 You already have a ticket: ${existing}`, ephemeral: true });

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.id}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
        { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels] }
      ]
    });

    await channel.send(`🎫 Welcome ${interaction.user}! Please explain your issue. A staff member will help you soon.`);
    await interaction.reply({ content: `🎫 Ticket created: ${channel}`, ephemeral: true });
  }
};