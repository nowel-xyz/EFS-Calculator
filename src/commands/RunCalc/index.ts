import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import runFunction, { RunData } from "../../base/utils/HelperRuncalc";



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
                {
                    name: "output",
                    choices: [
                        { name: "normal", value: "normal" },
                        { name: "idle", value: "idle" },
                        { name: "idle + combo", value: "idle_combo" },
                    ],
                    type: ApplicationCommandOptionType.String,
                    description: 'Output type for the calculation (default is normal)',
                    required: false
                }
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const lghsInput    = interaction.options.getString('black_eggs', true);
        const ancientSouls = interaction.options.getNumber('gold_eggs', true);
        const chorLevel    = interaction.options.getNumber('water', true);
        const ponyLevel    = interaction.options.getNumber('earth', true);
        const borbLevel    = interaction.options.getNumber('sound', true);
        const outputType   = interaction.options.getString('output', false) || 'normal';

        const data: RunData[] | undefined = runFunction(lghsInput, ancientSouls, chorLevel, ponyLevel, borbLevel, outputType);
        if (!data) {
            return await interaction.reply({ content: "Black eggs cannot be less than 1e100" });
        }

        let response = "Progression data:\n";
        data.forEach((run: RunData, index: number) => {
            const blackEggs         = `e${Math.floor(Number(run.blackEggsStart))}`;
            const blackEggsIncrease = `e${Math.floor(Number(run.blackEggsIncrease))}`;
            const level             = this.formatNumber(Number(run.level));
            const farmerLevel       = this.formatNumber(Number(run.farmerLevel));
            const tlZone            = this.formatNumber(Number(run.timeSkipMaxLevel));
            const idleLevel         = this.formatNumber(Number(run.idleLevel));
            const idleComboLevel    = this.formatNumber(Number(run.idleComboLevel));

            const header = index === 0 ? '**Current Run:**' : `**Next Run (${run.runNumber}):**`;
            const lines = [
                `${header}`,
                `- Black Eggs: ${blackEggs}  (+${blackEggsIncrease})`,
                `- Farmer: ${run.farmer}  (lv ${farmerLevel})`,
                `- Time Skip To: ${tlZone}`,
                `- **Push Zones & Times:**`,
                `  - Active: ${level} - (${run.timeSkipDuration}h)`,
            ];
            if (outputType === 'idle' || outputType === 'normal')
                lines.push(`  - Idle: ${idleLevel} - (${run.idleRunDuration}h)`);
            if (outputType === 'idle_combo' || outputType === 'normal')
                lines.push(`  - Idle+Combo: ${idleComboLevel} - (${run.idleComboRunDuration}h)`);
            response += lines.join('\n') + '\n\n';
        });
        await interaction.reply({ content: response });
    }
    
    formatNumber(num: number): string {
        if (num >= 1e9) return (num / 1e9).toFixed(3) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(3) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return String(num);
    }
}


