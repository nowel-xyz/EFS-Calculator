import IHandler from "../interface/IHandler";
import path from "path"
import { glob } from "glob";
import CustomClient from "./CustomClient";
import Event from "./Event";
import SubCommand from "./SubCommand";
import Command from "./Command";
import { ClientEvents } from "discord.js";

export default class Handler implements IHandler {
    client: CustomClient
    constructor(client: CustomClient) {
        this.client = client
    }
    
    async LoadEvetns() {
        
        const basePath = __dirname.includes("src") ? 'src' : 'dist';
        const files = (await glob(`${basePath}/events/**/*.{js,ts}`)).map(filePath => path.resolve(filePath));
        
        files.map(async (file: string) => {
            const event: Event = new(await import(file)).default(this.client)
            
            if(!event.name) return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop} does not have a name`)
            
            const execute = (...args: any) => event.Execute(...args)
            
            if(event.once) this.client.once(event.name as keyof ClientEvents, execute);
            else this.client.on(event.name as keyof ClientEvents, execute);
            
            return delete require.cache[require.resolve(file)]
        })
    }
    
    async LoadCommands() {
        const basePath = __dirname.includes("src") ? 'src' : 'dist';
        const files = (await glob(`${basePath}/commands/**/*.{js,ts}`)).map(filePath => path.resolve(filePath));
        
        files.map(async (file: string) => {          
            const command: Command | SubCommand = new(await import(file)).default(this.client)
            
            if(!command.name) return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop} does not have a name`)
            if (command instanceof SubCommand) 
                return this.client.subCommands.set(command.name, command)

            this.client.commands.set(command.name, command as Command)
            
            return delete require.cache[require.resolve(file)]
        })   
    }
}