import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import { calculateGoldenEggsForRP } from "../../base/utils/EFS";
import Decimal from 'decimal.js';

export default class CalcRP extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "calcrp",
            description: "Calculate the number of golden eggs needed to achieve a specified RP percentage",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "rp_percentage",
                    description: "Desired RP percentage (e.g., 2%)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const rpStr = interaction.options.getString("rp_percentage");

            if (rpStr) {
                await interaction.reply({ content: "Calculating... please wait." });

                const rpPercentage = parseFloat(rpStr.replace('%', ''));
                if (isNaN(rpPercentage) || rpPercentage <= 0 || rpPercentage > 25) {
                    await interaction.editReply({ content: "Invalid RP percentage. Please enter a value between 0 and 25%." });
                    return;
                }

                let goldenEggs: Decimal;
                try {
                    goldenEggs = calculateGoldenEggsForRP(rpPercentage);
                } catch (error) {
                    await interaction.editReply({ content: "An error occurred while executing the command." });
                    return;
                }

                await interaction.editReply({
                    content: `To achieve an RP of ${rpPercentage}%, you need ${goldenEggs.toFixed(0)} golden eggs.`
                });
            } else {
                await interaction.reply({ content: "Please provide the desired RP percentage." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
