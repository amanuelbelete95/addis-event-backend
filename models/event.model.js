import mongoose from "mongoose";
const Schema = mongoose.Schema;

// const locationSchema = new Schema({
//     name: String,
//     address: String,
// })

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: String,
        image: String,
        participant: String,
        description: String


    },
    {
        timestamps: true
    }
)

export const Event = mongoose.model("Event", eventSchema);
