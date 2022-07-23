import { Client, Interaction, SlashCommandBuilder } from "discord.js";
import { ICommand, IInteraction } from "../types";

export const interaction: IInteraction = {
    id: "test",
    interactionType: "BUTTON",
    run: function (interaction: Interaction, client: Client) {
        if (interaction.isButton()) {
            interaction.reply({ content:"Hello World!", ephemeral: true})
        }
    }
}