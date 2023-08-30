const {MessageActionRow, MessageSelectMenu} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data : new SlashCommandBuilder()
	.setName('setup-ticket')
	.setDescription('setup ticket'),
	

    async execute(interaction) {
		
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select an option...')
					.addOptions([
						{
							label: 'Mort RP',
							description: 'delete caractere or demande Mort rp',
							emoji: '🔪',
							value: 'mortrp',
						},
						{
							label: 'PROBLEME',
							description: 'any Probleme',
							emoji: '⚙️',
							value: 'probleme',
						},
						{
							label: 'REPORT',
							description: 'Report a user',
							emoji: '📑',
							value: 'report',
						},
						{
							label: 'OTHER',
							description: 'Other',
							emoji: '❔',
							value: 'other',
						},
						{
							label: 'Refresh',
							description: 'click to refresh the menu',
							emoji: '♻️',
							value: 'other1',
						},
					]),
			);

        await interaction.channel.send({
            embeds: [{
                title: 'ULTIMATE X TICKET', //Nome do seu servidor
                description: '> Need help with our server ? Open a ticket ! Then we can help you !', //Texto da sua preferência
                color: "0091FF", //Pesquise no navegador uma cor de sua preferência em HEX
				image: {url: 'https://cdn.discordapp.com/attachments/1141140058523570236/1143325760787062844/standard.gif'}, 
				footer: {text: '© ULTIMATE X TICKET - Edited By @kitso9681'} //Nome da sua preferênci
            }],
            components: [row]            
        })

		interaction.reply({content: 'Ticket was setup on this channel', ephemeral: true})
    }
} //by: /brancola