import Coctels from "../models/Coctels.js";

export const postCoctel = async (req, res) => {
    const fileUrl = req.file?.path;
    const { name, categories, ingredients, garnish, glassType, typeMethod, hasAlcohol, difficulty, method, history, note } = req.body;
    try {
        console.log({name, categories, ingredients, garnish, glassType, typeMethod, method, history, note});

        const coctel = new Coctels({
            name,
            categories,
            ingredients,
            garnish,
            glassType,
            typeMethod,
            hasAlcohol,
            difficulty,
            method,
            history,
            note,
            fileUrl
        });
        await coctel.save();

        res.status(200).json({message: "coctel creado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getAllCoctels = async (req, res) => {
    try {
        const coctel = await Coctels.find().limit(10);
        res.status(200).json(coctel);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}