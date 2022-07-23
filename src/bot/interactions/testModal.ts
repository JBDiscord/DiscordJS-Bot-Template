import { Client, Interaction, InteractionType, TextInputComponent } from "discord.js";
import { IInteraction } from "../types";

export const interaction: IInteraction = {
    id: "testModal",
    interactionType: "MODAL_SUBMIT",
    run: function (interaction: Interaction, client: Client) {
        if (interaction.type == InteractionType.ModalSubmit) {
            const favColor = interaction.fields.getTextInputValue('favoriteColorInput')
            const hobbies = interaction.fields.getTextInputValue('hobbiesInput')

            interaction.reply({ content: `Your hobbies ${hobbies}. Your favorite color ${favColor}`, ephemeral: true })
        }
    }
}