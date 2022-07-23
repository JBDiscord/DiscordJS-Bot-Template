import { ActionRowBuilder, Client, Interaction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { IInteraction } from "../types";

export const interaction: IInteraction = {
    id: "modalOpen",
    interactionType: "BUTTON",
    run: function (interaction: Interaction, client: Client) {
        if (interaction.isButton()) {
            const modal = new ModalBuilder()
                .setCustomId('testModal')
                .setTitle('Test Modal');
            const favoriteColorInput = new TextInputBuilder()
                .setCustomId('favoriteColorInput')
                .setLabel("What's your favorite color?")
                .setStyle(TextInputStyle.Short);

            const hobbiesInput = new TextInputBuilder()
                .setCustomId('hobbiesInput')
                .setLabel("What's some of your favorite hobbies?")
                .setStyle(TextInputStyle.Paragraph);


            const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(favoriteColorInput);
            const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(hobbiesInput);

            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow);

            // Show the modal to the user
            interaction.showModal(modal);
        }
    }
}