import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class geToSound extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "getosound",
            description: "Calculate how many levels you can buy with a given amount of golden eggs",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "golden_eggs",
                    description: "Amount of golden eggs available",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                }
            ],
            dev: false
        });
    }

    // Calculate how many levels can be bought with a given amount of golden eggs
    calculateLevelsFromGold(goldenEggs: number): number {
        let levels = 0;
        let totalCost = 0;

        while (totalCost <= goldenEggs) {
            levels++;
            totalCost += levels; // The cost for the next level is levels+1
        }

        return levels - 1; // Return the maximum level you can afford
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const goldenEggs = interaction.options.getInteger("golden_eggs");

            if (goldenEggs !== null) {
                if (goldenEggs <= 0) {
                    await interaction.reply({ content: "You must have a positive number of golden eggs." });
                    return;
                }

                await interaction.reply({ content: "Calculating... please wait." });

                const levels = this.calculateLevelsFromGold(goldenEggs);

                await interaction.editReply({
                    content: `With ${goldenEggs} golden eggs, you can upgrade up to level ${levels}.`
                });
            } else {
                await interaction.reply({ content: "Please provide the amount of golden eggs." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
