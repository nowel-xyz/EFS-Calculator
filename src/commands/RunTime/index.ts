import { ChatInputCommandInteraction, ApplicationCommandOptionType, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";

export default class BeFromBoss extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "run-time",
            description: "calculates how long it will take you to reach x lvl from your lvl",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "yourlvl",
                    description: "The starting level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "lvluwant",
                    description: "The ending level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "cpl",
                    description: "chicken per level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                }
            ],
            dev: false,
        });
    }

    async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        const startLevel = interaction.options.getInteger("yourlvl", true);
        const endLevel = interaction.options.getInteger("lvluwant", true);
        const cpl = interaction.options.getInteger("cpl", true);

        // Validate CPL range
        if (cpl < 2) {
            await interaction.editReply(`The number of chicken per level (cpl) cannot be lower then 2`);
            return;
        }

        // Validate that levels are non-negative
        if (startLevel < 0 || endLevel < 0) {
            await interaction.editReply(`Levels must be non-negative numbers.`);
            return;
        }

        // Validate that start level is less than end level
        if (startLevel >= endLevel) {
            await interaction.editReply(`The starting level must be lower than the ending level.`);
            return;
        }

        const timeRequired = this.calculateTime(startLevel, endLevel, cpl);

        await interaction.editReply(`The time to go from level ${startLevel} to ${endLevel} with ${cpl} chicken per level is: ${timeRequired}.`);
    }

    calculateTime(startLevel: number, endLevel: number, cpl: number): string {
        const baseTimePerThousand = 16; // Base time for 2cpl
        const additionalTimePerCPL = 5;  // Additional time per cpl per 1K levels
    
        // Calculate the base time increment per thousand levels for given cpl
        const timeIncrementPerThousand = baseTimePerThousand + (cpl - 2) * additionalTimePerCPL;
        
        // Total levels difference
        const levelDifference = endLevel - startLevel;
        
        // Calculate total time in minutes
        const totalTimeInMinutes = (levelDifference / 1000) * timeIncrementPerThousand;
    
        // Convert minutes to hours and minutes
        const hours = Math.floor(totalTimeInMinutes / 60);
        const minutes = Math.floor(totalTimeInMinutes % 60);
    
        return `${hours} Hours and ${minutes} Minutes`;
    }
}
