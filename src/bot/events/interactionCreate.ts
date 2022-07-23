import { Client, Interaction, InteractionType } from "discord.js";
import { ICommand, TypedEvent, IInteraction } from "../types";

import { commands, buttons, modals, selectMenus } from '../initalizer'
import { commandErrorEmbed, noPermsEmbed } from "../utils/embeds";

export const event = TypedEvent({
    eventName: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            if (!interaction.inCachedGuild()) return;

            const { commandName } = interaction
            const command = commands[commandName.toLowerCase()] as ICommand
            if (!command) return;

            //Permissions Checker
            if (command.perms && !interaction.member.permissions.has(command.perms)) {
                interaction.reply({ embeds: [noPermsEmbed], ephemeral: true })
            }

            try {
                await command.run(interaction, client)
            } catch (err) {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                    });
                } else {
                    await interaction.reply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                        ephemeral: true,
                    });
                }

                console.log(err)
            }
        }
        // For future uses, maybe
        if(interaction.isButton()) {
            if (!interaction.inCachedGuild()) return;

            const { customId } = interaction
            const button = buttons[customId.toLowerCase()] as IInteraction
            if (!button) return;

            //Permissions Checker
            if (button.perms && !interaction.member.permissions.has(button.perms)) {
                interaction.reply({ embeds: [noPermsEmbed], ephemeral: true })
            }

            try {
                await button.run(interaction, client)
            } catch (err) {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                    });
                } else {
                    await interaction.reply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                        ephemeral: true,
                    });
                }

                console.log(err)
            }
        }

        if (interaction.isSelectMenu()) {
            if (!interaction.inCachedGuild()) return;

            const { customId } = interaction
            const selectMenu = selectMenus[customId.toLowerCase()] as IInteraction
            if (!selectMenu) return;

            //Permissions Checker
            if (selectMenu.perms && !interaction.member.permissions.has(selectMenu.perms)) {
                interaction.reply({ embeds: [noPermsEmbed], ephemeral: true })
            }

            try {
                await selectMenu.run(interaction, client)
            } catch (err) {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                    });
                } else {
                    await interaction.reply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                        ephemeral: true,
                    });
                }

                console.log(err)
            }
        }

        if (interaction.type == InteractionType.ModalSubmit) {
            if (!interaction.inCachedGuild()) return;

            const { customId } = interaction
            const modal = modals[customId.toLowerCase()] as IInteraction
            if (!modal) return;

            //Permissions Checker
            if (modal.perms && !interaction.member.permissions.has(modal.perms)) {
                interaction.reply({ embeds: [noPermsEmbed], ephemeral: true })
            }

            try {
                await modal.run(interaction, client)
            } catch (err) {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                    });
                } else {
                    await interaction.reply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                        ephemeral: true,
                    });
                }

                console.log(err)
            }
        }
    }
})