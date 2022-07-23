import { Client, GatewayIntentBits } from "discord.js"

import config from "../../config.json"
import init from './initalizer'
import { app } from '../api/index'

import { Logger } from "./utils/Logger"

export const botLogger = new Logger("[BOT]")
export const apiLogger = new Logger("[API]")


export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
})

client.once("ready", () => {
    init(client)

    botLogger.Info("Ready")
})

app.listen(5000, () => {
    botLogger.Debug(`Listening a port 5000`)
})
client.login(config.token)
