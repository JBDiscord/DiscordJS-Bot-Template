import { Client, Interaction, ButtonBuilder, SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonComponent, MessageActionRowComponentBuilder, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import { ICommand } from "../types";

export const command: ICommand = {
    name: "Ping",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Test Command!"),
    run: function (interaction: Interaction, client: Client) {
        if (interaction.isChatInputCommand()) {
            const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents([
                new ButtonBuilder()
                    .setCustomId('test')
                    .setLabel("Test")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('modalOpen')
                    .setLabel("Open")
                    .setStyle(ButtonStyle.Secondary),
            ])

            const rowa = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents([
                new SelectMenuBuilder()
                    .setCustomId('testSelectMenu')
                    .setMinValues(1)
                    .setMaxValues(3)
                    .addOptions(
                        new SelectMenuOptionBuilder()
                            .setLabel("First")
                            .setValue("first"),
                        new SelectMenuOptionBuilder()
                            .setLabel("Second")
                            .setValue("second"),
                        new SelectMenuOptionBuilder()
                            .setLabel("Third")
                            .setValue("third"))
            ])

            interaction.reply({ content: "Test Command", components: [row, rowa]})
        }
    }
}