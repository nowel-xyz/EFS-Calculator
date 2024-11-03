import { 
    ChatInputCommandInteraction, 
    EmbedBuilder, 
    Events, 
    SelectMenuInteraction, 
    ActionRowBuilder, 
    SelectMenuBuilder 
} from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command Help event",
            once: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        // First, check if the interaction is a string select menu interaction
        if (!interaction.isStringSelectMenu()) return;

        // Now that we know it's a select menu, we can cast it to the proper type
        const selectInteraction = interaction as SelectMenuInteraction;

        // Check for the specific custom ID
        if (selectInteraction.customId !== 'select-help') return;

        const selectedCommandName = selectInteraction.values[0];
        const command = this.client.commands.find(cmd => cmd.name === selectedCommandName);

        if (!command) {
            await selectInteraction.update({ content: "Command not found.", components: [] });
            return;
        }

        let commandUsage = `/${command.name}`;
        if (Array.isArray(command.options)) {
            command.options.forEach(opt => {
                if(opt.name == "emit") {
                    return;
                }
                commandUsage += ` <${opt.name}> `;
            });
        }

        const commandEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Command: ${command.name}`)
            .addFields(
                { name: 'Description', value: command.description },
                { name: 'Usage', value: commandUsage }
            );

        // Since we need to display the dropdown again after selecting a command
        const selectMenu = new SelectMenuBuilder()
            .setCustomId('select-help')
            .setPlaceholder('Select a command to get help')
            .setMinValues(1)
            .setMaxValues(1);

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

        await selectInteraction.update({ content: `Details for **/${command.name}** command:`, embeds: [commandEmbed], components: [row] });
    }
}
