import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class EasterEggs extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "eastereggs",
            description: "Calculate various Easter egg related costs",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "black_eggs",
                    description: "Number of black eggs in scientific notation (e.g., 1.234e100)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "water_level",
                    description: "Water level input for the calculation",
                    type: ApplicationCommandOptionType.Integer,
                    required: false,
                },
            ],
            dev: false
        });
    }

    // Percentage allocations
    static readonly GK_PERCENT = new Decimal(0.26);
    static readonly MAIN_EGGS_PERCENT = new Decimal(0.50);
    static readonly MISC_EGGS_PERCENT = new Decimal(0.14);
    static readonly TURTLE_EGGS_PERCENT = new Decimal(0.10);

    // Calculate the number of levels that can be bought for misc eggs
    calculateMiscEggLevels(blackEggs: Decimal): Decimal {
        return Decimal.log2(blackEggs.plus(1)).minus(1);
    }

    // Calculate the number of levels that can be bought for main eggs
    calculateMainEggLevels(blackEggs: Decimal): Decimal {
        return blackEggs.times(2).plus(0.25).sqrt().minus(0.5);
    }

    // Calculate the number of levels that can be bought for Good Knight eggs
    calculateGoodKnightLevels(blackEggs: Decimal): Decimal {
        return blackEggs;
    }

    // Calculate the number of levels that can be bought for turtle eggs
    calculateTurtleEggLevels(blackEggs: Decimal): Decimal {
        return blackEggs.times(5).div(2).pow(2 / 5);
    }

    // Calculate water level reduction multiplier using the given formula
    calculateWaterReduction(level: number): Decimal {
        if (level === 0) {
            return new Decimal(1);
        }
        return new Decimal(Math.pow(0.95, level));
    }

    // Format the number for readability
    formatDecimal(decimal: Decimal): string {
        if (decimal.lessThan(1000000)) {
            return decimal.toFixed(0);
        } else {
            return decimal.toExponential(3).replace("e+", "e");
        }
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const blackEggsStr = interaction.options.getString("black_eggs");
            let waterLevel = interaction.options.getInteger("water_level") || 0;

            if (blackEggsStr) {
                await interaction.reply({ content: "Calculating... please wait." });

                let blackEggs: Decimal;
                try {
                    blackEggs = new Decimal(blackEggsStr);
                    if (waterLevel > 150) { waterLevel = 150; }
                } catch (error) {
                    await interaction.editReply({ content: "Invalid scientific notation format." });
                    return;
                }

                // Calculation for water level reduction
                const waterReduction = this.calculateWaterReduction(waterLevel);
                const waterMultiplier = new Decimal(1).div(waterReduction);

                // Calculations for the number of levels that can be bought with and without water level reduction
                const goodKnightLevels = this.calculateGoodKnightLevels(blackEggs.times(EasterEggs.GK_PERCENT));
               
                const goodKnightLevelsWithWater = goodKnightLevels.div(waterReduction);
                const mainEggsLevelsWithWater = this.calculateMainEggLevels(blackEggs.times(EasterEggs.MAIN_EGGS_PERCENT).times(waterMultiplier).div(7));
                const miscEggsLevelsWithWater = this.calculateMiscEggLevels(blackEggs.times(EasterEggs.MISC_EGGS_PERCENT).times(waterMultiplier).div(13));
                const turtleEggLevelsWithWater = this.calculateTurtleEggLevels(blackEggs.times(EasterEggs.TURTLE_EGGS_PERCENT).times(waterMultiplier));

                // Calculation for the water level cost reduction percentage
                const waterLevelCostReduction = (1 - waterReduction.toNumber()) * 100;

                await interaction.editReply({
                    content: `Black Eggs: ${blackEggsStr.toUpperCase()}\n` +
                             `Your GK needs to be level ${this.formatDecimal(goodKnightLevelsWithWater)}\n` +
                             `Each of your main 7 eggs needs to be level ${this.formatDecimal(mainEggsLevelsWithWater)}\n` +
                             `Each of your misc 13 eggs needs to be level ${this.formatDecimal(miscEggsLevelsWithWater)}\n` +
                             `Your turtle needs to be level ${this.formatDecimal(turtleEggLevelsWithWater)}\n` +
                             `Water level cost reduction: ${waterLevelCostReduction.toFixed(2)}%`
                });
            } else {
                await interaction.reply({ content: "Please provide the number of black eggs in scientific notation." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
