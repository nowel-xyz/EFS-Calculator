import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interface/ICustomClient";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import { IConfig } from "../interface/IConfig";
import mongoose, { connect } from "mongoose";


export default class CustomClient extends Client implements ICustomClient {

    handler: Handler
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    config: IConfig
    developmentMode: Boolean;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
            ]
        })
        this.handler = new Handler(this)
        this.commands = new Collection()
        this.subCommands = new Collection()
        this.cooldowns = new Collection()
        this.config = require(`${process.cwd()}/data/config.json`)
        this.developmentMode = (process.argv.slice(2).includes("--development"))
    }


    Init(): void {
        console.log(`Starting the bot in ${this.developmentMode ? "development" : "poriduction"}`)
        this.LoadHandlers()

        this.login(process.env.Token)
            .catch((err) => console.error(err))
        const mongooseUrl = process.env.MongooseUrl || "";

        connect(mongooseUrl)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.error("Failed to connect to MongoDB:", err);
            });

        mongoose.connection.on("connected", () => {
            console.log("[Mongoose] Connection established");
        });

        mongoose.connection.on("error", (err) => {
            console.error("[Mongoose] Connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("[Mongoose] Connection disconnected");
        });
    }

    LoadHandlers(): void {
        this.handler.LoadEvetns()
        this.handler.LoadCommands()
    }
}