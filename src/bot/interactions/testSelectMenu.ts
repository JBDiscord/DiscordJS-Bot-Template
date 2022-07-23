import { Client, Interaction, SlashCommandBuilder } from "discord.js";
import { IInteraction } from "../types";

export const interaction: IInteraction = {
    id: "testSelectMenu",
    interactionType: "SELECT_MENU",
    run: function (interaction: Interaction, client: Client) {
        if (interaction.isSelectMenu()) {
            interaction.reply(interaction.values.toString())
        }
    }
}