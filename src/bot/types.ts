import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
import { Client, Interaction, PermissionResolvable, ClientEvents } from "discord.js"

export interface ICommand {
    name: String,
    data: SlashCommandBuilder | ContextMenuCommandBuilder | any,
    perms?: PermissionResolvable,
    run: (interaction: Interaction, client: Client) => unknown
}

export interface InteractionTypes {
    BUTTON,
    SELECT_MENU,
    MODAL_SUBMIT
}

export type InteractionType = keyof InteractionTypes;

export interface IInteraction {
    id: String,
    interactionType: InteractionType,
    perms?: PermissionResolvable,
    run: (interaction: Interaction, client: Client) => unknown
}

// From https://github.com/conaticus/boolean/blob/master/src/structures/Bot.ts

export type EventName = keyof ClientEvents;

export type EventListener<T extends EventName> = (
    _client: Client,
    ...args: ClientEvents[T]
) => void;

export interface IBotEvent<T extends EventName> {
    eventName: T;
    once?: boolean;
    run: EventListener<T>;
}

export const TypedEvent = <T extends EventName>(event: IBotEvent<T>) => event;
