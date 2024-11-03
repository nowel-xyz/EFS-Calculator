import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class SoundCost extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "soundcost",
            description: "Calculate the golden eggs needed to upgrade sound to a specific level",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "current_level",
                    description: "Current level of the sound",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "target_level",
                    description: "Target level for the sound upgrade",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                }
            ],
            dev: false
        });
    }

    // Calculate the golden eggs needed for the upgrade
    calculateUpgradeCost(currentLevel: number, targetLevel: number): number {
        let totalCost = 0;
        for (let n = currentLevel; n < targetLevel; n++) {
            totalCost += (n + 1);
        }
        return totalCost;
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const currentLevel = interaction.options.getInteger("current_level");
            const targetLevel = interaction.options.getInteger("target_level");

            if (currentLevel !== null && targetLevel !== null) {
                if (currentLevel >= targetLevel) {
                    await interaction.reply({ content: "Target level must be higher than the current level." });
                    return;
                }

                await interaction.reply({ content: "Calculating... please wait." });

                const totalCost = this.calculateUpgradeCost(currentLevel, targetLevel);

                await interaction.editReply({
                    content: `To upgrade from level ${currentLevel} to level ${targetLevel}, you need ${totalCost} golden eggs.`
                });
            } else {
                await interaction.reply({ content: "Please provide both the current level and the target level." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
