import mongoose from "mongoose";

const CoctelSchema = new mongoose.Schema({
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
    method: {
        type: String,
        required: true,
    },
    garnish: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    glassType: {
        type: String, // e.g., "Highball", "Martini"
    },
    category: {
        type: String, // e.g., "Clásico", "Moderno", "Sin alcohol"
    },
    isAlcoholic: {
        type: Boolean,
        required: true,
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