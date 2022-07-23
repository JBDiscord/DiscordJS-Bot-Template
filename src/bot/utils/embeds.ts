import { EmbedBuilder } from "discord.js";

export const noPermsEmbed = new EmbedBuilder()
    .setTitle("Command Failed")
    .setColor(0xff0000)
    .setDescription("You do not have the permissions to run this command")

export const commandErrorEmbed = new EmbedBuilder()
    .setTitle("Command Failed")
    .setColor(0xff0000)
    .setDescription("Somehthing went wrong while running the command!")
