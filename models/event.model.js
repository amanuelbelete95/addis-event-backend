import mongoose from "mongoose";

// schema in which we provide the model;
 const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required"]
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
},
{ timestamps: true }
)

// module.exports = mongoose.model(
//     'Event', eventSchema, 'Events');

export const Event = mongoose.model("Event", eventSchema);
// export default Event;


// export const Message = mongoose.model("Message", MessageSchema);




