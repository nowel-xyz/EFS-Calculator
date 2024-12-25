import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import IBeInputsConfig from "../../base/schemas/BeHistory";

export default class BeHistory extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "behistory",
            description: "returns 10 old be inputs from the esteregg calculator",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [],
            dev: false
        });
    }


    async Execute(interaction: ChatInputCommandInteraction) {
        const beInputs = await IBeInputsConfig.findOne({ userId: interaction.user.id });
        if (!beInputs || !beInputs.inputs || beInputs.inputs.length === 0) {
            return interaction.reply("You don't have any BE inputs saved.");
        }

        const inputsList = beInputs.inputs
            .slice(-10)
            .reverse()
            .map((input: any, index) => {
                if (input.version === 2) {
                    return `**#${index + 1}: Command v2**\n` +
                        `- Black Eggs: ${input.blackEggs}\n` +
                        `- Water Level: ${input.waterLevel || "None"}\n` +
                        `- Last Run Black Eggs: ${input.lastRunBlackEggs || "N/A"}`;
                } else {
                    return `**#${index + 1}: Command v1**\n` +
                        `- Black Eggs: ${input.blackEggs}\n` +
                        `- Water Level: ${input.waterLevel || "None"}`;
                }
            })
            .join("\n\n");

        await interaction.reply({
            content: `Here are your last 10 BE inputs (newest first):\n\n${inputsList}`,
            ephemeral: false
        });
    }


}
