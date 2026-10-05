const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8-ball")
    .addStringOption(o => o.setName("question").setDescription("Your question").setRequired(true)),
  async execute(interaction) {
    const answers = ["Yes.", "No.", "Maybe.", "Definitely!", "Ask again later.", "Probably not."];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    await interaction.reply(`🎱 ${answer}`);
  }
};