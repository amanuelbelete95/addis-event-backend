import { User } from "../models/user.models";

export const createUser = async (req, res) => {
    const user = req.body;
    if (!user) {
        return res.status(404).json({
            message: "No user is found to be created!"
        })
    }
    try {
        const newUser = new User(user);
        await newUser.save();
        res.status(200).json({
            success: true, data: newUser, message: "User Created Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: "Server Error"
        })
    }
}