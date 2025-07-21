import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Anonymous",
    },
    contact: {
        type: String,
        default: "N/A",
    },
    email: {
        type: String,
        default: "N/A",
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Issue = mongoose.model("Issue", issueSchema);
