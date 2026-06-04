import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import runFunction from "../../base/utils/HelperRuncalc";

export default class RunCalcTime extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "runcalc-time",
            description: "Show active, idle, and idle+combo push times per run plus totals.",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: 'black_eggs',
                    type: ApplicationCommandOptionType.String,
                    description: 'Number of black eggs in scientific notation (e.g., 1.234e100)',
                    required: true
                },
                {
                    name: 'gold_eggs',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Number of gold eggs',
                    required: true
                },
                {
                    name: 'water',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Water level',
                    required: true
                },
                {
                    name: 'earth',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Earth level',
                    required: true
                },
                {
                    name: 'sound',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Sound level',
                    required: true
                },
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

        // Always use 'normal' so all three modes are calculated correctly
        const data = runFunction(lghsInput, ancientSouls, chorLevel, ponyLevel, borbLevel, 'normal');
        if (!data) {
            return await interaction.reply({ content: "Black eggs cannot be less than 1e100" });
        }

        let response = "**Run Time Summary:**\n";
        data.forEach((run, index) => {
            const runTotal = run.activeDurationRaw + run.idleDurationRaw + run.idleComboDurationRaw;

            const label = index === 0 ? 'Current' : `Run ${run.runNumber}`;
            response +=
                `**${label}:**\n` +
                `  Active: ${this.formatSeconds(run.activeDurationRaw)}\n` +
                `  Idle: ${this.formatSeconds(run.idleDurationRaw)}\n` +
                `  Idle+Combo: ${this.formatSeconds(run.idleComboDurationRaw)}\n` +
                `  **Total: ${this.formatSeconds(runTotal)}**\n\n`;
        });

        await interaction.reply({ content: response });
    }

    formatSeconds(seconds: number): string {
        if (seconds <= 0) return '00:00:00';
        if (seconds < 24 * 3600) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
        }
        let rem = seconds;
        const years = Math.floor(rem / 31_557_600); rem -= years * 31_557_600;
        const days  = Math.floor(rem / 86_400);      rem -= days * 86_400;
        const hours = rem / 3600;
        return (years > 0 ? `${years.toLocaleString()}y ` : '') + `${days}d ${hours.toFixed(2)}h`;
    }
}


