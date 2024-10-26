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
    ingredients: [String],
    garnish: [String],
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
    categories: [String],
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