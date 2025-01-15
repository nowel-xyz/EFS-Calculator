import { Collection, Events, REST, Routes } from "discord.js";
import Event from "../../base/classes/Event";
import CustomClient from "../../base/classes/CustomClient";
import Command from "../../base/classes/Command";

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Ready Event",
            once: true
        })
    }
    async Execute() {
        console.log(`${this.client.user?.tag} is now ready!`)

        const rest = new REST().setToken(process.env.Token || "")




        const formatCommandLog = (commands: any[], isDev: boolean) => {
            // Determine the maximum lengths for each field
            const maxNameLength = Math.max(...commands.map(command => command.name.length));
            const maxDescriptionLength = Math.max(...commands.map(command => command.description.length));
            const maxCategoryLength = Math.max(...commands.map(command => command.category.length));
            const maxCooldownLength = Math.max(...commands.map(command => command.cooldown.toString().length));
            
            const typeLabel = isDev ? '[DEV]' : '[GLOBAL]';
        
            console.log(`\nSetting ${commands.length} ${isDev ? 'development' : 'global'} (/) commands:`);
        
            commands.forEach((command: any) => {
                console.log(` - ${typeLabel} Command: ${command.name.padEnd(maxNameLength)} | Description: ${command.description.padEnd(maxDescriptionLength)} | Category: ${command.category.padEnd(maxCategoryLength)} | Cooldown: ${command.cooldown.toString().padEnd(maxCooldownLength)} ${`| Dev: ${command.dev}`} |`);
            });
        
            console.log(`\nSuccessfully set ${commands.length} ${isDev ? 'dev' : 'global'} application (/) commands`);
        };

        if (this.client.developmentMode) {
            const devCommands: any = await rest.put(
                Routes.applicationGuildCommands(this.client.user?.id || this.client.config.ClientId, this.client.config.DevGuildId),
                {
                    body: this.GetJson(this.client.commands.filter(command => command.dev))
                }
            );
        
            formatCommandLog(Array.from(this.client.commands.filter(command => command.dev).values()), true);
        } else {
            const globalCommands: any = await rest.put(
                Routes.applicationCommands(this.client.user?.id || this.client.config.ClientId),
                {
                    body: this.GetJson(this.client.commands.filter(command => !command.dev))
                }
            );
        
            formatCommandLog(Array.from(this.client.commands.filter(command => !command.dev).values()), false);
        }

        

    }


    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = []

        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.default_member_permissions.toString(),
                dm_permission: command.dm_permission,
            })
        })

        return data;
    }
}