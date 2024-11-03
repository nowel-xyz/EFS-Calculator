import { 
    ChatInputCommandInteraction, 
    PermissionsBitField, 
    EmbedBuilder, 
    ActionRowBuilder, 
    SelectMenuBuilder 
} from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";

export default class HelpCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "help",
            description: "Displays a list of all available commands and how to use them.",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        // Create a select menu with all commands as options
        const selectMenu = new SelectMenuBuilder()
            .setCustomId('select-help')
            .setPlaceholder('Select a command to get help')
            .setMinValues(1)
            .setMaxValues(1);

            const commands = this.client.commands.map(cmd => cmd as Command)
            .map(cmd => {
                if(cmd.name === "emit") {
                    return null; // or undefined, doesn't matter here
                }
                return `**✩ ${cmd.name}** - ${cmd.description}`;
            })
            .filter(Boolean) // This filters out any null or undefined values
            .join('\n');
        
        
        

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Available Commands')
                .setDescription(commands);

        
        // Map all commands to menu options
        this.client.commands.forEach(command => {
            if(command.name == "emit") {
                return;
            }
            selectMenu.addOptions([
                {
                    label: command.name,
                    description: command.description.substring(0, 100), // Limit description length
                    value: command.name
                }
            ]);
        });

        // Create an action row to place our select menu in
        const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(selectMenu);

        // Reply with the menu
        await interaction.reply({ content: "Please select a command:", embeds: [embed], components: [row] });
    }
}

