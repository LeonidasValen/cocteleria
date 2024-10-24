import mongoose from "mongoose";

const CoctelSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            ingredient: { type: String, required: true },
            amount: { type: String, required: true }, // e.g., "50ml", "1 slice"
        }
    ],
    garnishs: [
        {
            garnish: { type: String, required: true },
        }
    ],
    glassType: {
        type: String, // e.g., "Highball", "Martini"
    },
    typeMethod: {
        type: String, // e.g., "Highball", "Martini"
    },
    category: {
        type: String, // e.g., "Clásico", "Moderno", "Sin alcohol"
    },
    isAlcoholic: {
        type: Boolean,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    history: {
        type: String,
    },
    notes: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Coctel", CoctelSchema);