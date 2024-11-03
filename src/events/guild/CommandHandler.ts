import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";
import CommandConfig from "../../base/schemas/CommandConfig";
import BannedUsers from "../../base/schemas/BannedUsers";

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command Handler event",
            once: false
        })
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        if(!interaction.isChatInputCommand()) return;


        const command: Command = this.client.commands.get(interaction.commandName)!;

        
        if(!command) return await interaction.reply({ content: "This command dose not exit!", ephemeral: true }) && this.client.commands.delete(interaction.commandName)


            let BannedUserData = await BannedUsers.findOne({userId: interaction.user.id})
            if(BannedUserData?.banned) {
                return interaction.reply({ embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`You are banned form using commands in ${this.client.user?.username}\n Join https://discord.gg/EM9yaSBW74 and open a ticket for a unban request`)
            ], ephemeral: true});
            }

            const data = await CommandConfig.findOne({});

            
            if (!data) {
                const newConfig = new CommandConfig({
                    CommandUsed: 1
                });
                await newConfig.save();
            } else {
                await CommandConfig.findOneAndUpdate({}, { $inc: { CommandUsed: 1 } });
            }

        if(command.dev && !this.client.config.DeveloperUserIds.includes(interaction.user.id))
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ This command is only avilable for devlopers.`)
        ], ephemeral: true});

        const { cooldowns } = this.client
        if(!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection())

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if(timestamps?.has(interaction.user.id) && (now < (timestamps?.get(interaction.user.id) || 0) + cooldownAmount ))
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Please wait another \`${((((timestamps.get(interaction.user.id) || 0) + cooldownAmount) - now) / 1000).toFixed(1)}\` seconds to run this command!`)
            ], ephemeral: true})
        
        timestamps?.set(interaction.user.id, now)
        setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount)

        try {
            const subCommandGroup = interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`

            return this.client.subCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction);
        } catch (ex) {
            console.error(ex)
        }
    }
    
}