import { ChatInputCommandInteraction, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, ButtonInteraction, ButtonBuilder, ButtonStyle, ComponentType, Interaction } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import Category from "../../base/enums/Category";
import Decimal from 'decimal.js';

const characters = [
    { name: "Master Pai Mei", price: "10", level: "25", ability: "Tornado", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Tarzan", price: "100", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Beowulf", price: "500", level: "75", ability: "Battle Shout", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Robin Hood", price: "2000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Bacon Hair", price: "8000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Mozart", price: "40000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Spartacus", price: "200K", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Julius Caesar", price: "800K", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Joan of Arc", price: "5,000K", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Naruto Uzumaki", price: "30,000K", level: "100", ability: "Nine-Tails Chakra", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Wolverine", price: "200M", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Medusa", price: "1,600M", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Hercules", price: "13,000M", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Jack Sparrow", price: "100B", level: "100", ability: "Treasure Hunt", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Albert Einstein", price: "900B", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Old MacDonald", price: "8,000B", level: "100", ability: "Fertilizer", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "V", price: "72,000B", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Hacker", price: "640T", level: "75", ability: "Exploit", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "King Midas", price: "5,400T", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Queen Elizabeth II", price: "48,000T", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Goku", price: "600q", level: "100", ability: "Super Saiyan", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Superman", price: "18,000q", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Loki", price: "700q", level: "100", ability: "Decoy", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Gordon Ramsay", price: "28,000Q", level: "100", ability: "Hamburger", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Captain America", price: "8,300s", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Aang", price: "2,100S", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Mikasa Ackerman", price: "20,000U", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Michael Jordan", price: "2e55", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "James Bond", price: "2e70", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Thor", price: "2e85", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Donald Trump", price: "2e100", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Sherlock Holmes", price: "2e115", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Noob", price: "2e130", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Percy Jackson", price: "2e145", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Shrek", price: "2e160", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Astronaut", price: "2e175", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "The Flash", price: "2e190", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Indiana Jones", price: "2e205", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Private Ryan", price: "2e220", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Batman", price: "2e235", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Joker", price: "2e500", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Dracula", price: "2e1,000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Queen Elsa", price: "2e2,000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Santa Claus", price: "2e4,000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Antman", price: "2e8,000", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Bruce Lee", price: "2e14,000", level: "-", ability: "-", upgrades: ["Kung Fu", "Wing Chun", "Way of the Dragon", "Hollywood Walk of Fame", "Jeet Kune Do"], beRequired: ["6.891e18397", "1.864e19426", "1.364e21483", "3.691e22511", "1.663e23863"], levelForBE: ["150K", "185K", "255K", "290K", "336K"] },
    { name: "Annie", price: "2e25,500", level: "-", ability: "-", upgrades: ["Bite", "Maul", "Roar", "Enrage"], beRequired: ["3.394e27194", "2.247e30779", "2.416e35069", "1.744e40035"], levelForBE: ["58K", "180K", "326K", "495K"] },
    { name: "Tibbers", price: "2e25,500", level: "-", ability: "-", upgrades: ["Disintegrate", "Incinerate", "Molten Shield", "Pyromania"], beRequired: ["6.163e28898", "1.664e32836", "1.448e37464", "9.568e42767"], levelForBE: ["116K", "250K", "407.5K", "588K"] },
    { name: "Deadpool", price: "2e45,500", level: "-", ability: "-", upgrades: ["Experiments", "Immortality", "Magic Satchel", "Merc with a Mouth", "Friends with Death", "Breaking the fourth wall"], beRequired: ["7.429e48751", "1.205e52175", "3.924e55774", "5.216e59235", "6.846e63487", "3.667e67601"], levelForBE: ["111K", "227.5K", "350K", "478K", "612.5K", "752.5K"] },
    { name: "Cristiano Ronaldo", price: "2e72,000", level: "-", ability: "-", upgrades: ["Dribble", "Throw-In", "Diving", "Red Card", "Corner Kick", "Penalty Kick", "Wall Pass"], beRequired: ["1.646e76618", "2.912e81422", "2.102e86388", "3.046e91530", "8.862e96848", "1.052e102329", "2.507e107985"], levelForBE: ["157.5K", "321K", "490K", "665K", "846K", "1.0325M", "1.225M"] },
    { name: "Michael Jackson", price: "2e108,000", level: "-", ability: "-", upgrades: ["Anti-Gravity Lean"], beRequired: ["6.803e159978"], levelForBE: ["602K"] },
    { name: "Iron Man", price: "2e114,500", level: "-", ability: "-", upgrades: ["Arc Reactor"], beRequired: ["2.570e172977"], levelForBE: ["677.25K"] },
    { name: "D.Va", price: "2e127,500", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
    { name: "Developer", price: "2e142,200", level: "-", ability: "-", upgrades: [], beRequired: [], levelForBE: [] },
];


const ITEMS_PER_PAGE = 25;

export default class Characters extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "characters",
            description: "Get information about characters.",
            category: Category.EFS,
            default_member_permissions: PermissionsBitField.Flags.ViewChannel,
            dm_permission: false,
            cooldown: 3,
            options: [],
            dev: false,
        });
    }

    async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        let currentPage = 0;

        const generateMenu = (page: number) => {
            const start = page * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const menu = new StringSelectMenuBuilder()
                .setCustomId('select-character')
                .setPlaceholder('Select a character')
                .addOptions(characters.slice(start, end).map((char, index) => ({
                    label: char.name,
                    value: (start + index).toString(),
                })));
            return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
        };

        const generateButtons = (page: number) => {
            const row = new ActionRowBuilder<ButtonBuilder>();
            if (page > 0) {
                row.addComponents(new ButtonBuilder()
                    .setCustomId('prev-page')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary));
            }
            if ((page + 1) * ITEMS_PER_PAGE < characters.length) {
                row.addComponents(new ButtonBuilder()
                    .setCustomId('next-page')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary));
            }
            return row.components.length > 0 ? row : null;
        };

        const updateReply = async (page: number) => {
            const menuRow = generateMenu(page);
            const buttonRow: any = generateButtons(page);
            const components = [menuRow];
            if (buttonRow) components.push(buttonRow);

            await interaction.editReply({
                content: 'Choose a character to get information: (click next for more characters)',
                components
            });
        };

        await updateReply(currentPage);

        const filter = (i: Interaction): boolean => {
            return (i.isStringSelectMenu() || i.isButton()) && i.user.id === interaction.user.id;
        };

        const collector = interaction.channel?.createMessageComponentCollector({
            filter,
            time: 600000,
        });
        // this trigers when other buttens run need to check if it characters 
        collector?.on('collect', async (i) => {
            if (i.isStringSelectMenu()) {
                const selectedIndex = parseInt(i.values[0]);
                const character = characters[selectedIndex];
                let reply = `**Name:** ${character.name}\n**Hiring Price:** ${character.price}\n**Ability Given:** ${character.ability} ${character.level !== '-' ? `(Lvl ${character.level})` : ''}`;

                if (character.upgrades.length > 0) {
                    reply += `\n**Upgrades:**`;
                    for (let j = 0; j < character.upgrades.length; j++) {
                        reply += `\n${character.upgrades[j]} - White eggs: ${character.beRequired[j]} - Level: ${character.levelForBE[j]}`;
                    }
                }

                await i.reply({ content: reply, ephemeral: true });
            } else if (i.isButton()) {
                if (i.customId === 'prev-page') {
                    currentPage--;
                    await updateReply(currentPage);
                    await i.deferUpdate();
                } else if (i.customId === 'next-page') {
                    currentPage++;
                    await updateReply(currentPage);
                    await i.deferUpdate();
                }
            }
        });

        collector?.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: 'No character selected.', components: [] });
            }
        });
    }
}
