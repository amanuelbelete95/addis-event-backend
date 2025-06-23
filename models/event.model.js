import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: String,
    },
    {
        timestamps: true
    },
)

export const Event = mongoose.model("Event", eventSchema);
