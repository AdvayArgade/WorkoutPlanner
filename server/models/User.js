//models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Routine'
            }
        ],
        entries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Entry'
            }
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Routine'
            }
        ],
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", UserSchema);
