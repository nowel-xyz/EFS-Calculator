import { ChatInputCommandInteraction, CacheType } from "discord.js";
import ISubCommand from "../interface/ISubCommand";
import CustomClient from "./CustomClient";
import ISubCommandOptions from "../interface/ISubCommandsOptions";

export default class SubCommand implements ISubCommand {
    client: CustomClient;
    name: string;

    constructor(client: CustomClient, options: ISubCommandOptions) {
        this.client = client
        this.name = options.name
    }

    Execute(interaction: ChatInputCommandInteraction): void {
    }
    
} 