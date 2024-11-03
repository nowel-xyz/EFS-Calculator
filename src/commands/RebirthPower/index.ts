import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import { parseInput, calculateRP } from "../../base/utils/EFS";
import Decimal from 'decimal.js';

export default class RebirthPower extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "rp",
            description: "Calculate your rebirth power percentage based on golden eggs",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "golden_eggs",
                    description: "Number of golden eggs (e.g., 100000)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const goldenEggsStr = interaction.options.getString("golden_eggs");

            if (goldenEggsStr) {
                await interaction.reply({ content: "Calculating... please wait." });

                let goldenEggs: Decimal;
                try {
                    goldenEggs = parseInput(goldenEggsStr);
                } catch (error) {
                    await interaction.editReply({ content: "Invalid number format. Please enter a valid number of golden eggs." });
                    return;
                }

                const rpPercentage = calculateRP(goldenEggs);

                await interaction.editReply({
                    content: `With ${goldenEggsStr.replace(/,/g, '')} golden eggs, your rebirth power percentage is ${rpPercentage.toFixed(2)}%.`
                });
            } else {
                await interaction.reply({ content: "Please provide the number of golden eggs." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
