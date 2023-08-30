const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientid, guildid } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = clientid;
const guildId = guildid;

for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();