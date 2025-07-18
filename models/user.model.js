import mongoose from "mongoose";


const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },

    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    }
},
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)