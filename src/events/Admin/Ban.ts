import { Events, Message } from "discord.js";
import Event from "../../base/classes/Event";
import CustomClient from "../../base/classes/CustomClient";
import BannedUsers from "../../base/schemas/BannedUsers";

export default class AdminBanUserFromBot extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: "AdminBanFromBot",
            once: false
        });
    }

    async Execute(message: Message) {
        if (this.client.config.AdminUserIds.includes(message.author.id)) {
            const args = message.content.trim().split(/ +/);
            const command = args.shift()?.toLowerCase();

            if (command === "!efsban") {
                const userId = args[0];
                const bans =  args[1]
                let status
                if(bans == "false") {
                    status = false
                } else {
                    status = true
                }
                console.log(`Command: ${command}, User ID: ${userId}, statis: ${status} `);
                let data = await BannedUsers.findOne({userId})
                if(!data) {
                    new BannedUsers({
                        userId,
                        bannedById: message.author.id,
                        banned: status
                    }).save();
                } else {
                    data.bannedById =  message.author.id,
                    data.banned = status
                    data.save();
                }

                message.reply({content: `${userId}: is now ${status ? "banned" : "unbanned" } form ${this.client.user?.username}`})
                
            }
        }
    }
}
