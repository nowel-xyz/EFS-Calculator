import { Schema, model } from "mongoose"

interface IBeHistoryConfig {
    userId: string,
    inputs: string[]
}

export default model<IBeHistoryConfig>("BeHistory", new Schema<IBeHistoryConfig>({
    userId: String,
    inputs: Array
}, {
    timestamps: true
}))