import { Schema, model } from "mongoose"

interface IBannedUserConfig {
    userId: string,
    banned: boolean,
    bannedById: string
}

export default model<IBannedUserConfig>("BannedUsers", new Schema<IBannedUserConfig>({
    userId: String,
    banned: Boolean,
    bannedById: String,
}, {
    timestamps: true
}))