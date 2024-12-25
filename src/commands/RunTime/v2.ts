import { ChatInputCommandInteraction, ApplicationCommandOptionType, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";

// Note: This code isnt working yet, need to fix it 😂. 

export default class BeFromBoss extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "run-timev2",
            description: "Calculates how long it will take you to reach a certain level, adjusting for changes in CPL.",
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
                    name: "soundlvl",
                    description: "Sound Egg level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "idollvl",
                    description: "Idol Egg level",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                }
            ],
            dev: true,
        });
    }

    async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        const startLevel = interaction.options.getInteger("yourlvl", true);
        const endLevel = interaction.options.getInteger("lvluwant", true);
        const soundLevel = interaction.options.getInteger("soundlvl", true);
        const idolLevel = interaction.options.getInteger("idollvl", true);

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

        const totalTime = this.calculateCPL(soundLevel, idolLevel, endLevel);
        console.log(totalTime)

        //await interaction.editReply(`The estimated time to go from level ${startLevel} to ${endLevel} with dynamically adjusted CPL is approximately ${hours} hours and ${minutes} minutes.`);
    }


    calculateMaxLevel(startLevel: number, resources: number, cpl: number, soundLevel: number, idolLevel: number): number {
        // Implementing effective boost calculations
        const soundBoostBase = 0.125; // 12.5% per sound level
        let effectiveSoundBoost = soundBoostBase * soundLevel;
        const idolBoostBase = 0.015; // Base percentage increase per idol level
        let effectiveIdolBoost = 1 - Math.exp(-idolBoostBase * idolLevel);
    
        // Ensure total boost does not go negative
        let totalBoostFactor = 1 - effectiveSoundBoost - effectiveIdolBoost;
        if (totalBoostFactor < 0) {
            totalBoostFactor = 0;
        }
    
        // Calculate effective CPL with boosts
        let effectiveCPL = cpl / totalBoostFactor;
        if (totalBoostFactor === 0) {
            effectiveCPL = resources + 1; // This sets effectiveCPL high to avoid division by zero and suggests unlimited resources can't level up due to extremely high CPL
        }
    
        // Calculate maximum level achievable
        let maxLevel = startLevel + Math.floor(resources / effectiveCPL);
        return maxLevel;
    }

    calculateCPL(soundLevel: number, idolLevel: number, farmLevel: number): number {
        const baseChickens = 10;  // Initial base number of chickens
        const incrementPer500Levels = 0.1;  // Increment of chickens per 500 farm levels
        const idolReductionFactor = 0.025;
        const idolBaseReduction = 8;
        const soundEffectivenessIncrease = 0.125;  // 12.5% effectiveness increase per sound level
    
        // Calculate base chickens based on farm level
        let modifiedBaseChickens = baseChickens + (Math.floor(farmLevel / 500) * incrementPer500Levels);
    
        // Calculate reduction from Idol Egg, adjusted by Sound Egg effectiveness
        let idolReduction = idolBaseReduction * (1 - Math.exp(-idolReductionFactor * idolLevel));
        idolReduction *= (1 + soundLevel * soundEffectivenessIncrease);
    
        // Calculate total chickens required after applying reductions
        let totalChickensRequired = modifiedBaseChickens - idolReduction;
        
        // Ensure chickens do not fall below 2 if reductions are strong
        if (totalChickensRequired < 2) {
            totalChickensRequired = 2;
        }
        
        return totalChickensRequired;
    }
    

}