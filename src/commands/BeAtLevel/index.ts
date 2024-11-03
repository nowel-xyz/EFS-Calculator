import { ChatInputCommandInteraction, ApplicationCommandOptionType, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class Beatlevel extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "beatlevel",
            description: "Calculate the number of Black Eggs at a specified level",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "level",
                    description: "The level to calculate the Black Eggs for",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "earthlevel",
                    description: "Your Earth Egg Level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "goldeneggs",
                    description: "Your total number of Golden Eggs for Rebirth Power calculation",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
            ],
            dev: false,
        });
    }

    async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        const level = interaction.options.getInteger("level", true);
        const earthEggLevel = interaction.options.getInteger("earthlevel", true);
        const goldenEggs = interaction.options.getInteger("goldeneggs", true);

        // Validate that levels are non-negative
        if (level < 0 || earthEggLevel < 0 || goldenEggs < 0) {
            await interaction.editReply(`Levels and Golden Eggs must be non-negative numbers.`);
            return;
        }

        const multiplier: Decimal = this.calculateMultiplier(goldenEggs);
        const blackEggs: Decimal = this.calculateBlackEggs(level, earthEggLevel, multiplier);

        await interaction.editReply(`At level ${level}, with Earth Egg Level ${earthEggLevel} and ${goldenEggs} Golden Eggs, you will get approximately ${this.formatDecimal(blackEggs)} black eggs.`);
    }

    calculateMultiplier(goldenEggs: number): Decimal {
        return new Decimal(1).div(100).times(new Decimal(25).minus(new Decimal(23).times(Decimal.exp(new Decimal(-0.0003).times(goldenEggs)))));
    }

    calculateBlackEggs(level: number, earthEggLevel: number, multiplier: Decimal): Decimal {
        const levelFactor: Decimal = new Decimal(level).minus(80).div(25).pow(1.3);
        const baseBlackEggs: Decimal = new Decimal(10).times(new Decimal(earthEggLevel).pow(2)).plus(1);
        const expMultiplier: Decimal = new Decimal(20).times(new Decimal(1).plus(multiplier).pow(Math.floor(level / 5) - 20)).plus(levelFactor);
        return baseBlackEggs.times(expMultiplier);
    }

    formatDecimal(decimal: Decimal): string {
        if (decimal.lessThan(1000000)) {
            return decimal.toFixed(0);
        } else {
            return decimal.toExponential(3).replace("e+", "e");
        }
    }
}
