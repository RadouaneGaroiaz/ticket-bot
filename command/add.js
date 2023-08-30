const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
     data : new SlashCommandBuilder()
	.setName('add')
	.setDescription('add a member to ticket!')
	.addUserOption(option =>
		option.setName('user').setDescription('The member to ban')),

    async execute(interaction) {

		const user = interaction.options.getUser('user') || interaction.user;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            await interaction.reply({
                content: 'That user is not on the guild.'
            });

            return;
        };


const channelId = interaction.channel.id;

const channel = await interaction.guild.channels.fetch(channelId);
  
// edits overwrites to allow a user to view the channel
channel.permissionOverwrites.edit(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

await interaction.reply({
    content: `User ${user} has been added to the channel.`,
    ephemeral: true
    });
    }
} //by: /brancola