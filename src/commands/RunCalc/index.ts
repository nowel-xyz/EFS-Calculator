import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import runFunction from "../../base/utils/HelperRuncalc";



export default class RunCalc extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "runcalc",
            description: "Calculate your current and 4 next runs.",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: 'black_eggs',
                    type: ApplicationCommandOptionType.String,
                    description: 'Number of black_eggs in scientific notation (e.g., 1.234e100) ',
                    required: true
                },
                {
                    name: 'gold_eggs',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Number of gold_eggs',
                    required: true
                },
                {
                    name: 'water',
                    type: ApplicationCommandOptionType.Number,
                    description: 'water Level',
                    required: true
                },
                {
                    name: 'earth',
                    type: ApplicationCommandOptionType.Number,
                    description: 'earth Level',
                    required: true
                },
                {
                    name: 'sound',
                    type: ApplicationCommandOptionType.Number,
                    description: 'sound Level',
                    required: true
                },
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const ancientSouls = interaction.options.getNumber('gold_eggs');
        const lghsInput = interaction.options.getString('black_eggs');
        const chorLevel = interaction.options.getNumber('water');
        const ponyLevel = interaction.options.getNumber('earth');
        const borbLevel = interaction.options.getNumber('sound');
        const data: any = runFunction(lghsInput, ancientSouls, chorLevel, ponyLevel, borbLevel, 0);
        if (!data) {
            return await interaction.reply({ content: "Black eggs cannot be less than 1e100" });
        }
        let response = "Progression data:\n";
        let x = 0
        data.forEach((run: any) => {
            x++
            const formattedBlackEggs = `e${Math.floor(run.blackEggsStart)}`;
            const formattedBlackEggsIncrease = `e${Math.floor(run.blackEggsIncrease)}`;
            const formattedLevel = this.formatNumber(run.level);
            const formattedFarmerLevel = this.formatNumber(run.farmerLevel);
            const formattedTimeSkipMaxZone = this.formatNumber(run.timeSkipMaxLevel);
            const formattedIdleLevel = this.formatNumber(run.idleLevel);
            const formattedIdleComboLevel = this.formatNumber(run.idleComboLevel);
        
            if (x === 1) {
                response += `**Current Run:**\n` +
                    `- Black Eggs: ${formattedBlackEggs}\n` +
                    `- Level: ${formattedLevel}\n` +
                    `- Farmer: ${run.farmer}\n` +
                    `- Farmer Level: ${formattedFarmerLevel}\n` +
                    `- Black Eggs Increase: ${formattedBlackEggsIncrease}\n` +
                    `- Time Skip Max Level: ${formattedTimeSkipMaxZone}\n` +
                    `- Max Idle Level: ${formattedIdleLevel}\n` +
                    `- Max Idle Combo Level: ${formattedIdleComboLevel}\n\n`;
            } else {
                response += `**Next Run (${run.runNumber}):**\n` +
                    `- Black Eggs: ${formattedBlackEggs}\n` +
                    `- Level: ${formattedLevel}\n` +
                    `- Farmer: ${run.farmer}\n` +
                    `- Farmer Level: ${formattedFarmerLevel}\n` +
                    `- Black Eggs Increase: ${formattedBlackEggsIncrease}\n` +
                    `- Time Skip Max Level: ${formattedTimeSkipMaxZone}\n` +
                    `- Max Idle Level: ${formattedIdleLevel}\n` +
                    `- Max Idle Combo Level: ${formattedIdleComboLevel}\n\n`;
            }
        });
        await interaction.reply({ content: response });
    }
    
    formatNumber(num: any): string {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(3) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(3) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else {
            return num
        }
    }
}


