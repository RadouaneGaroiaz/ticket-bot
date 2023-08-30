const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');
const {MessageActionRow, MessageSelectMenu} = require('discord.js')

module.exports = {
        name: 'messageCreate',
        async execute(client, message, ) {

            if (message.author.bot) return
            if (message.channel.type == "DM") return;

            const messages1 = ["wipe", "Wipe", "mort rp", "wipi", "WIP", "wip", "Wip", "WIP", "report", "reporti", "Report", "Reporti", "REPORT", "REPORTI", "REPORTI", "REPORT", "need admin", "Need admin", "Chi admin", "chi admin", "chi Admin", "Chi Admin", "Chi admin", "help", "Help", "HELP"];
            const messages2 = ["Whitelist", "whitelist", "Whitelisti", "whitelisti", "whiteliste", "Whiteliste", "witeliste", "witelist"]
         
            if (messages1.some(word => message.content.includes(word))) {
                message.reply({content: 'For (Wipe/Report/Problems) please open ticket on <#831886363938259001>'})
            }
            if (messages2.some(word => message.content.includes(word))) {
                message.reply({content: 'Please send your whitelist request in our website: https://www.ultimatex.online/'})
            }

            const args = message.content.slice(prefix.length).trim().split(' ')
       
    
            if (!message.content.startsWith(prefix) || message.author.bot) return;
      
          
            }
        }