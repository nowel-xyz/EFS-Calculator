import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class EasterEggsv2 extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "eastereggsv2",
            description: "Calculate various Easter egg related costs version 2",
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
                    name: "last_run_black_eggs",
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

    calculateLevelDifference(newLevels: Decimal, oldLevels: Decimal): Decimal {
        console.log(`Old Levels: ${oldLevels.toString()}, New Levels: ${newLevels.toString()}`);
        return newLevels.minus(oldLevels);
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const blackEggsStr = interaction.options.getString("black_eggs");
            const lastRunBlackEggsStr = interaction.options.getString("last_run_black_eggs");
            let waterLevel = interaction.options.getInteger("water_level") || 0;

            if (blackEggsStr && lastRunBlackEggsStr) {
                await interaction.reply({ content: "Calculating... please wait." });

                let blackEggs: Decimal;
                let lastRunBlackEggs: Decimal;
                try {

                    
                    if (waterLevel > 150) { waterLevel = 150; }
                    blackEggs = new Decimal(blackEggsStr);
                    lastRunBlackEggs = new Decimal(lastRunBlackEggsStr);

                    if (lastRunBlackEggs.greaterThanOrEqualTo(blackEggs)) {
                        await interaction.editReply(`Your black eggs from the last run cannot be lower than your current run.`);
                        return;
                    }
                } catch (error) {
                    await interaction.editReply({ content: "Invalid scientific notation format." });
                    return;
                }

                // Calculation for water level reduction
                const waterReduction = this.calculateWaterReduction(waterLevel);
                const waterMultiplier = new Decimal(1).div(waterReduction);

                // Calculations for the number of levels that can be bought with and without water level reduction
                const goodKnightLevels = this.calculateGoodKnightLevels(blackEggs.times(EasterEggsv2.GK_PERCENT));
               
                const goodKnightLevelsWithWater = goodKnightLevels.div(waterReduction);
                const mainEggsLevelsWithWater = this.calculateMainEggLevels(blackEggs.times(EasterEggsv2.MAIN_EGGS_PERCENT).times(waterMultiplier).div(7));
                const miscEggsLevelsWithWater = this.calculateMiscEggLevels(blackEggs.times(EasterEggsv2.MISC_EGGS_PERCENT).times(waterMultiplier).div(13));
                const turtleEggLevelsWithWater = this.calculateTurtleEggLevels(blackEggs.times(EasterEggsv2.TURTLE_EGGS_PERCENT).times(waterMultiplier));



                const oldgoodKnightLevels = this.calculateGoodKnightLevels(lastRunBlackEggs.times(EasterEggsv2.GK_PERCENT));
               
                const oldgoodKnightLevelsWithWater = oldgoodKnightLevels.div(waterReduction);
                const oldmainEggsLevelsWithWater = this.calculateMainEggLevels(lastRunBlackEggs.times(EasterEggsv2.MAIN_EGGS_PERCENT).times(waterMultiplier).div(7));
                const oldmiscEggsLevelsWithWater = this.calculateMiscEggLevels(lastRunBlackEggs.times(EasterEggsv2.MISC_EGGS_PERCENT).times(waterMultiplier).div(13));
                const oldturtleEggLevelsWithWater = this.calculateTurtleEggLevels(lastRunBlackEggs.times(EasterEggsv2.TURTLE_EGGS_PERCENT).times(waterMultiplier));


                const goodKnightLevelDiff = this.calculateLevelDifference(goodKnightLevelsWithWater, oldgoodKnightLevelsWithWater);
                const mainEggsLevelDiff = this.calculateLevelDifference(mainEggsLevelsWithWater, oldmainEggsLevelsWithWater);
                const miscEggsLevelDiff = this.calculateLevelDifference(miscEggsLevelsWithWater, oldmiscEggsLevelsWithWater);
                const turtleEggLevelDiff = this.calculateLevelDifference(turtleEggLevelsWithWater, oldturtleEggLevelsWithWater); 

               
                // Calculation for the water level cost reduction percentage
                const waterLevelCostReduction = (1 - waterReduction.toNumber()) * 100;

                await interaction.editReply({
                    content: `**Important this only works if you used EasterEgg command for your black eggs set up last retirement**\n` + 
                             `Black Eggs: ${blackEggsStr.toUpperCase()}\n` +
                             `Upgrade GK by: ${this.formatDecimal(goodKnightLevelDiff)} levels (GK level should be: ${this.formatDecimal(goodKnightLevelsWithWater)} after upgrade)\n` +
                             `Upgrade each of your main 7 eggs by: ${this.formatDecimal(mainEggsLevelDiff)} levels (Main eggs level should be: ${this.formatDecimal(mainEggsLevelsWithWater)} after upgrade)\n` +
                             `Upgrade each of your misc 13 eggs by: ${this.formatDecimal(miscEggsLevelDiff)} levels (Misc eggs level should be: ${this.formatDecimal(miscEggsLevelsWithWater)} after upgrade)\n` +
                             `Upgrade your turtle by: ${this.formatDecimal(turtleEggLevelDiff)} levels (Turtle level should be: ${this.formatDecimal(turtleEggLevelsWithWater)} after upgrade)\n` +
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
