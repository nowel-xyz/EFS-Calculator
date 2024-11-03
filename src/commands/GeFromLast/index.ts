import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import { parseInput, parseScientific } from "../../base/utils/EFS";
import Decimal from 'decimal.js';

export default class GeFromLast extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "gefromlast",
            description: "Calculate the number of golden eggs earned from the last retire",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "pending_be_now",
                    description: "Current pending black eggs",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "total_be_claimed",
                    description: "Total black eggs claimed before the last rebirth",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ],
            dev: false
        });
    }

    // Calculate the number of golden eggs earned
    calculateGoldenEggs(currentBE: Decimal, totalBE: Decimal): Decimal {
        if (currentBE.lessThan(totalBE)) {
            return new Decimal(0);
        }


        const totalBlackEggs = currentBE;
        const totalPreviousBlackEggs = totalBE;

        // Calculate the logarithm using Decimal
        const ratio = totalBlackEggs.dividedBy(totalPreviousBlackEggs);
        const totalGoldenEggs = new Decimal(5).times(ratio.logarithm(10));
        
        return totalGoldenEggs;
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const currentBEstr = interaction.options.getString("pending_be_now");
            const totalBEstr = interaction.options.getString("total_be_claimed");

            if (currentBEstr && totalBEstr) {
                await interaction.reply({ content: "Calculating... please wait." });

                let currentBE: Decimal;
                let totalBE: Decimal;
                try {
                    if (currentBEstr.toLowerCase().includes('e')) {
                        currentBE = parseScientific(currentBEstr);
                    } else {
                        currentBE = parseInput(currentBEstr);
                    }

                    if (totalBEstr.toLowerCase().includes('e')) {
                        totalBE = parseScientific(totalBEstr);
                    } else {
                        totalBE = parseInput(totalBEstr);
                    }
                } catch (error) {
                    await interaction.editReply({ content: "Invalid number format. Please enter valid numbers for pending black eggs." });
                    return;
                }

                const goldenEggs = this.calculateGoldenEggs(currentBE, totalBE);

                await interaction.editReply({
                    content: `With current pending black eggs of ${currentBEstr.replace(/,/g, '')} and total black eggs claimed of ${totalBEstr.replace(/,/g, '')}, you have earned ${goldenEggs} golden eggs.`
                });
            } else {
                await interaction.reply({ content: "Please provide both the current and previous pending black eggs." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
