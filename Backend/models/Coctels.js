import mongoose from "mongoose";

const CoctelSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    garnish: {
        type: [String],
        required: true
    },
    hasAlcohol: {
        type: Boolean,
        required: true,
    },
    difficulty: {
        type: String, // e.g., "Easy", "Medium", "Hard"
        required: true,
    },
    glassType: {
        type: String, // e.g., "Highball", "Martini"
        required: true,
    },
    typeMethod: {
        type: String, // e.g., "Highball", "Martini"
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    history: {
        type: String,
    },
    note: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Coctel", CoctelSchema);