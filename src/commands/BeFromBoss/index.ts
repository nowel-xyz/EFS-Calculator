import { ChatInputCommandInteraction, ApplicationCommandOptionType, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class BeFromBoss extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "befromboss",
            description: "Calculate the level needed for a specified number of Black Eggs",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "blackeggs",
                    description: "The desired number of Black Eggs (e.g., 100000 or 1e10)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "earthlevel",
                    description: "Your Earth Egg Level",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "goldeneggs",
                    description: "Your total number of Golden Eggs for Rebirth Power calculation",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            dev: false,
        });
    }

    async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        const desiredBeInput: string = interaction.options.getString("blackeggs", true);
        let desiredBe: Decimal;

        try {
            desiredBe = new Decimal(desiredBeInput);
        } catch (error) {
            await interaction.editReply("Invalid number format for Black Eggs.");
            return;
        }

        const earthEggLevel: number = parseInt(interaction.options.getString("earthlevel", true));
        const goldenEggs: number = parseInt(interaction.options.getString("goldeneggs", true));
        const multiplier: Decimal = this.calculateMultiplier(goldenEggs);

        let low: number = 100;
        let high: number = 5000000;
        let level: number = low;
        let blackEggs: Decimal = new Decimal(0);

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            blackEggs = this.calculateBlackEggs(mid, earthEggLevel, multiplier);
    
            console.log(`Checking level ${mid}: ${blackEggs.toString()}`); // Log for debugging
    
            if (blackEggs.lessThan(desiredBe)) {
                low = mid + 1;
            } else {
                high = mid - 1;
                level = mid;
            }
        }
        console.log(`*****************************************************************`); // Log for debugging

        if (blackEggs.greaterThanOrEqualTo(desiredBe)) {
            await interaction.editReply(`To achieve ${this.formatDecimal(desiredBe)} black eggs, you need to reach level ${level}.`);
        } else {
            await interaction.editReply(`It's not feasible to achieve exactly ${this.formatDecimal(desiredBe)} black eggs. The closest achievable number at level ${level} is ${this.formatDecimal(blackEggs)}.`);
        }
        
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
