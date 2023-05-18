import mongoose from "mongoose";
import config from "../config.js";

//A user should have a username, password, and email
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Missing: username is required"],
        unique: [true, "Username already exists"],
    },
    password: { type: String },
    email: { type: String, required: [true, "Missing: email is required"] },
}, {collection: config.CARS_COLLEXCTION});

export default mongoose.model('Users', UserSchema);