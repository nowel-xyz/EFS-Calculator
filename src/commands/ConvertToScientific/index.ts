import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import { parseInput, convertToScientific } from "../../base/utils/EFS";

export default class ConvertToScientific extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "convert",
            description: "Convert a large number to scientific notation",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "number",
                    description: "Number to convert (e.g., 1M, 100000, 1B)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const numberStr = interaction.options.getString("number");

            if (numberStr) {
                await interaction.reply({ content: "Converting... please wait." });

                let number;
                try {
                    number = parseInput(numberStr);
                } catch (error) {
                    await interaction.editReply({ content: "Invalid number format. Please use formats like 1M, 100000, 1B, etc." });
                    return;
                }

                const scientificNotation = convertToScientific(number);

                await interaction.editReply({
                    content: `${scientificNotation}`
                });
            } else {
                await interaction.reply({ content: "Please provide a number to convert." });
            }
        } catch (error) {
            console.error("Error executing command:", error);
            await interaction.editReply({ content: "An error occurred while executing the command." });
        }
    }
}
