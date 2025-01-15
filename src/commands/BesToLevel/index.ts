import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import runFunction from "../../base/utils/HelperRuncalc";

export default class bestolevel extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "bestolevel",
            description: "Returns the run level you can get to with the amount of black eggs you have",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "black_eggs",
                    description: "The amount of black eggs you have",
                    required: true,
                    type: ApplicationCommandOptionType.String
                }
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const blackEggs = interaction.options.getString("black_eggs");
        if (!blackEggs) return interaction.reply({ content: "Please provide the amount of black eggs you have" });

        const data: any = runFunction(blackEggs, 0, 0, 0, 0, 0);
        if (!data) {
            return await interaction.reply({ content: "Black eggs cannot be less than 1e100" });
        }

        // Extract relevant data for the response
        const level = this.formatNumber(data[0].level);
        const idleLevel = this.formatNumber(data[0].idleLevel);
        const idleComboLevel = this.formatNumber(data[0].idleComboLevel);

        // Build the response string
        const response =  `You can get to level ${level} with ${blackEggs} black eggs.\n` +
        `Max Idle Level: ${idleLevel}\n`+ 
        `Max Idle Combo Level: ${idleComboLevel}` 
        
        await interaction.reply({ content: response });
    }

    formatNumber(num: number): string {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(3) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(3) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else {
            return num.toString();
        }
    }
}
