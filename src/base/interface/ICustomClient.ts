import { Collection } from "discord.js";
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";
import { IConfig } from "./IConfig";

export default interface ICustomClient {
    config: IConfig
    commands: Collection<string, Command>
    subCommands: Collection<string, SubCommand>
    cooldowns: Collection<string, Collection<string, number>>
    developmentMode: Boolean;

    Init(): void;
    LoadHandlers(): void;
}