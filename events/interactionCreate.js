const {
  Permissions,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");

let catégorie = "1145768818518536302"; // Categoria onde será criado o ticket

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    // if (!interaction.isSelectMenu()) return;

    if (interaction.isSelectMenu()) {
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("del")
          .setPlaceholder("Click to delete ticket")
          .addOptions([
            {
              label: "🗑️ Delete Ticket",
              description: "Ticket admin Only",
              value: "excluir",
            },
            {
              label: "♻️ Refresh",
              description: "click to refresh the selection .Ticket admin Only",
              value: "excluire",
            },
          ])
      );

      let roleStaff = interaction.guild.roles.cache.get("1143483697023164437"); // Cargo que respondera o ticket

      let DejaUnChannel = interaction.guild.channels.cache.find(
        (c) => c.topic == interaction.user.id
      );

      if (interaction.customId === "del") {
        if (interaction.values[0] === "excluir") {
          // Send a confirmation message with buttons
          const confirmationRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("confirm_yes")
              .setLabel("Yes")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("confirm_no")
              .setLabel("No")
              .setStyle("DANGER")
          );

          const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Delete Ticket Confirmation")
            .setDescription("Are you sure you want to delete this ticket?")
            .setFooter({
                text: "This confirmation will be deleted in 30 seconds if you don't respond.",
            })
            .setTimestamp();

          await interaction.reply({
            embeds: [embed],
            components: [confirmationRow],
            ephemeral: false,
          });

          // Define the timeout duration in milliseconds (e.g., 10 seconds)
          const timeoutDuration = 30000; // 10 seconds

          // Use setTimeout to delete the message after the specified duration
          setTimeout(async () => {
            try {
              // Delete the interaction reply
              const reply = await interaction.fetchReply();
              if (reply.deletable) {
                reply.delete();
                interaction.followUp({
                    content: "Ticket deletion confirmation timeout.",
                    ephemeral: true,
                  });
              }
            } catch (error) {
              //console.error("Error deleting message:", error);
            }
          }, timeoutDuration);

      /*     // Collect button interactions from the user
          const filter = (i) =>
            i.customId === "confirm_yes" || i.customId === "confirm_no";
          const collector = interaction.channel.createMessageComponentCollector(
            { filter, time: 30000 }
          );

          collector.on("collect", async (i) => {
            if (i.customId === "confirm_yes") {
              // Check if the user has permission to delete the ticket
              if (
                interaction.member.roles.cache.some(
                  (role) => role.name === "ticket"
                )
              ) {
                // Delay the ticket deletion by 5 seconds
                const embed = new MessageEmbed()
                  .setColor("#FF0000")
                  .setDescription("Ticket will be deleted in 5 seconds...");
                await interaction.followUp({
                  embeds: [embed],
                  ephemeral: false,
                });
                setTimeout(async () => {
                  const channel = interaction.channel;
                  await channel.delete();
                }, 4000);
              } else {
                // Deny the ticket deletion
                await interaction.followUp({
                  content: "You do not have permission to delete the ticket.",
                  ephemeral: true,
                });
              } 
              
            } else if (i.customId === "confirm_no") {
              await interaction.followUp({
                content: "Ticket deletion canceled.",
                ephemeral: true,
              }); 
              
            }
            collector.stop();
          }); */

  /*         collector.on("end", (collected) => {
            if (collected.size === 0) {
              interaction.followUp({
                content: "Ticket deletion confirmation timeout.",
                ephemeral: true,
              });
            }
          }); */
        }
        if (interaction.values[0] === "excluire") {
          // Refresh the select menu options
          const refreshedOptions = [
            {
              label: "🗑️ Delete Ticket",
              description: "Ticket admin Only",
              value: "excluir",
            },
            {
              label: "Refresh",
              description: "click to refresh the selection. Ticket admin Only",
              value: "excluire",
            },
            // Add other options here if needed
          ];

          const selectMenu = new MessageSelectMenu()
            .setCustomId("del")
            .setPlaceholder("Click to delete ticket")
            .addOptions(refreshedOptions);

          const row = new MessageActionRow().addComponents(selectMenu);

          await interaction.update({ components: [row] });
        }
      }

      if (interaction.customId == "select") {
        if (DejaUnChannel)
          return interaction.reply({
            content: "❌ You already have an open ticket on the server.",
            ephemeral: true,
          });
        if (interaction.values[0] == "mortrp") {
          interaction.guild.channels
            .create(`mortrp ${interaction.user.username}`, {
              type: "GUILD_TEXT",
              topic: `${interaction.user.id}`,
              parent: `${catégorie}`,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: interaction.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: roleStaff,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            })
            .then((c) => {
              const partenariat = new MessageEmbed()
                .setTitle("MORT RP") // Nome do seu servidor
                .setDescription(
                  `> Hi ${interaction.user} , your ticket has been created! Please complete the following:\n\n> Citizen's name :\n> Why are you interested in mort RP ? :`
                )
                .setFooter({
                    text: "© ULTIMATE X TICKET",
                    iconURL: "https://cdn.discordapp.com/attachments/1114203335654899803/1114593803811168318/Untitled-1.png"
                })
                .setColor("#0091FF")
                .setImage(
                  "https://cdn.discordapp.com/attachments/1135652445876404345/1144572811294277632/standard_4.gif"
                );
              c.send({
                embeds: [partenariat],
                content: `${roleStaff} | ${interaction.user}`,
                components: [row],
              });
              interaction.reply({
                content: `✅ Your ticket has been opened successfull. <#${c.id}>`,
                ephemeral: true,
              });
            });
        } else if (interaction.values[0] == "probleme") {
          interaction.guild.channels
            .create(`probleme ${interaction.user.username}`, {
              type: "GUILD_TEXT",
              topic: `${interaction.user.id}`,
              parent: `${catégorie}`,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: interaction.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: roleStaff,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            })
            .then((c) => {
              const plainte = new MessageEmbed()
                .setTitle("PROBLEME") // Nome do seu servidor
                .setDescription(
                  `> Hi ${interaction.user} , your ticket has been created ! \n\n> Please report your probleme so that support can help you.`
                )
                .setFooter({
                    text: "© ULTIMATE X TICKET",
                    iconURL: "https://cdn.discordapp.com/attachments/1114203335654899803/1114593803811168318/Untitled-1.png"
                })
                .setColor("#0091FF")
                .setImage(
                  "https://cdn.discordapp.com/attachments/1135652445876404345/1144570745532457020/standard_3.gif"
                );
              c.send({
                embeds: [plainte],
                content: `${roleStaff} | ${interaction.user}`,
                components: [row],
              });
              interaction.reply({
                content: `✅ Your ticket has been opened successfully. <#${c.id}>`,
                ephemeral: true,
              });
            });
        } else if (interaction.values[0] == "other") {
          interaction.guild.channels
            .create(`other ${interaction.user.username}`, {
              type: "GUILD_TEXT",
              topic: `${interaction.user.id}`,
              parent: `${catégorie}`,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: interaction.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: roleStaff,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            })
            .then((c) => {
              const embed = new MessageEmbed()
                .setTitle("OTHER") // Nome do seu servidor
                .setDescription(
                  `> Hi ${interaction.user} , your ticket has been created ! \n\n> Please report your other issue so that support can help you.`
                )
                .setFooter({
                    text: "© ULTIMATE X TICKET",
                    iconURL: "https://cdn.discordapp.com/attachments/1114203335654899803/1114593803811168318/Untitled-1.png"
                })
                .setColor("#0091FF");
              c.send({
                embeds: [embed],
                content: `${roleStaff} | ${interaction.user}`,
                components: [row],
              });
              interaction.reply({
                content: `✅ Your ticket has been opened successfully. <#${c.id}>`,
                ephemeral: true,
              });
            });
        } else if (interaction.values[0] == "report") {
          interaction.guild.channels
            .create(`report ${interaction.user.username}`, {
              type: "GUILD_TEXT",
              topic: `${interaction.user.id}`,
              parent: `${catégorie}`,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: interaction.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: roleStaff,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            })
            .then((c) => {
              const embed = new MessageEmbed()
                .setTitle("REPORT") // Nome do seu servidor
                .setDescription(
                  `> Hi ${interaction.user} , your ticket has been created ! \n\n> Please report your issue so that support can help you.`
                )
                .setFooter({
                    text: "© ULTIMATE X TICKET",
                    iconURL: "https://cdn.discordapp.com/attachments/1114203335654899803/1114593803811168318/Untitled-1.png"
                })
                .setColor("#0091FF")
                .setImage(
                  "https://cdn.discordapp.com/attachments/1135652445876404345/1144574580636274758/standard_5.gif"
                );
              c.send({
                embeds: [embed],
                content: `${roleStaff} | ${interaction.user}`,
                components: [row],
              });
              interaction.reply({
                content: `✅ Your ticket has been opened successfully. <#${c.id}>`,
                ephemeral: true,
              });
            });
        }

        if (interaction.values[0] === "other1") {
          // Refresh the select menu options
          const refreshedOptions = [
            {
              label: "Mort RP",
              description: "delete caractere or demande Mort rp",
              emoji: "🔪",
              value: "mortrp",
            },
            {
              label: "PROBLEME",
              description: "any Probleme",
              emoji: "⚙️",
              value: "probleme",
            },
            {
              label: "REPORT",
              description: "Report a user",
              emoji: "📑",
              value: "report",
            },
            {
              label: "OTHER",
              description: "Other",
              emoji: "❔",
              value: "other",
            },
            {
              label: "Refresh",
              description: "click to refresh the menu",
              emoji: "♻️",
              value: "other1",
            },
          ];

          const selectMenu = new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("Select an option...")
            .addOptions(refreshedOptions);

          const refreshedRow = new MessageActionRow().addComponents(selectMenu);

          await interaction.update({ components: [refreshedRow] });
        }
      }
    } else if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
    else if (interaction.isButton()) {
      if (interaction.customId === "confirm_yes") {
        if (
            interaction.member.roles.cache.some(
              (role) => role.name === "ticket"
            )
          ){
            if (interaction.channel.parentId !== catégorie) {
                return interaction.reply({
                  content: "This is not a ticket!",
                  ephemeral: true,
                });
              }
              const timeout = 5000;
      
              setTimeout(async () => {
                const channel = interaction.channel;
                await channel.delete();
              }, timeout);
      
              const embed = new MessageEmbed()
              .setColor("#FF0000")
              .setDescription("Ticket will be deleted in 5 seconds...");
            await interaction.reply({
              embeds: [embed],
              ephemeral: false,
            });
          } else {
            interaction.reply({
              content: "You do not have permission to delete the ticket.",
              ephemeral: true,
            });
          }

      }
        if (interaction.customId === "confirm_no") {
            interaction.reply({
                content: "Ticket deletion canceled.",
                ephemeral: true,
            });
            interaction.message.delete();
            }

    }
  },
};
