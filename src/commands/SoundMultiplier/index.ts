import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

export default class SoundMultiplier extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "sound",
            description: "Calculate what level you can get to with 2 chickens per lvl (cpl) with your sound level",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "level",
                    description: "The sound level u want to know",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            dev: false
        });
    }

    // Multiply the input number by 5000
    multiplyBy5000(input: string): Decimal {
        const number = new Decimal(input);
        return number.times(5000);
    }

    // Format the number for readability
    formatDecimal(decimal: Decimal): string {
        if (decimal.lessThan(100000000)) {
            return decimal.toFixed(0);
        } else {
            return decimal.toExponential(3).replace("e+", "e");
        }
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const numberStr = interaction.options.getString("level");

            if (numberStr) {
                await interaction.reply({ content: "Calculating... please wait." });

                let number: Decimal;
                try {
                    number = new Decimal(numberStr);
                } catch (error) {
                    await interaction.editReply({ content: "Invalid number format." });
                    return;
                }

                const result = this.multiplyBy5000(numberStr);

                await interaction.editReply({
                    content: `You can get to level ${this.formatDecimal(result)} with 2 cpl.`
                });
            } else {
                await interaction.reply({ content: "Please provide a level." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
