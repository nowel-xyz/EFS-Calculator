import { Schema, model } from "mongoose"

interface ICommandConfig {
    CommandUsed: number
}

export default model<ICommandConfig>("CommandUsed", new Schema<ICommandConfig>({
    CommandUsed: Number,
}, {
    timestamps: true
}))