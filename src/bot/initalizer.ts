// Discord imports
import { Client } from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"

import getfiles from './getfiles'
import config from '../../config.json'
import { botLogger } from '../bot/index'
import { IBotEvent, ICommand, IInteraction } from "./types"

export const commands = {} as {
    [key: string]: any
}

export const buttons = {} as {
    [key: string]: any
}

export const selectMenus = {} as {
    [key: string]: any
}

export const modals = {} as {
    [key: string]: any
}

export default (client: Client) => {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interactions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const interactionsFiles = getfiles("C:/Users/wayne/Desktop/Jakob2/JB Programs/bot-template/src/bot/interactions")

    for (const file of interactionsFiles) {
        const interaction = require(`${file}`).interaction as IInteraction

        if(interaction.interactionType == "BUTTON") {
            buttons[interaction.id.toLowerCase()] = interaction
        }
        if (interaction.interactionType == "MODAL_SUBMIT") {
            modals[interaction.id.toLowerCase()] = interaction
        }
        if (interaction.interactionType == "SELECT_MENU") {
            selectMenus[interaction.id.toLowerCase()] = interaction
        }

        botLogger.Info(`Loaded interaction ${interaction.id}`)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Events //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const eventFiles = getfiles(config.events_dir)

    for (const file of eventFiles) {
        const event = require(`${file}`).event as IBotEvent<any>

        if(!event) {
            console.error(`File at path ${file} seems to incorrectly be exporting an event.`)
        }
        else {
            if(event.once) {
                client.once(event.eventName, event.run.bind(null, this))
            } else {
                client.on(event.eventName, event.run.bind(null, this))
            }
        }

        botLogger.Info(`Registered event ${event.eventName}`)
    }

    botLogger.Info("Events registered ")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Commands ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const commandsBody = []
    const commandFiles = getfiles(config.command_dir)

    for (const file of commandFiles) {
        const command = require(`${file}`).command as ICommand
        commandsBody.push(command.data.toJSON())

        console.log(`Loaded ${command.name}`)

        commands[command.name.toLowerCase()] = command
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const rest = new REST({ version: '9' }).setToken(config.token);

    if (config.debug === true) {
        (async () => {
            try {
                botLogger.Debug('Started refreshing guild (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(config.client_id, config.debug_guild),
                    { body: commandsBody },
                );

                botLogger.Debug('Successfully reloaded application (/) commands.');
            } catch (error) {
                botLogger.Error(error);
            }
        })();
    } else {
        (async () => {
            try {
                botLogger.Debug('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(config.client_id),
                    { body: commandsBody },
                );

                botLogger.Debug('Successfully reloaded application (/) commands.');
            } catch (error) {
                botLogger.Debug(error);
            }
        })();
    }
}