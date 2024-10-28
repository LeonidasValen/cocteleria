import Coctels from "../models/Coctels.js";

export const postCoctel = async (req, res) => {
    const fileUrl = req.file?.path;
    const { name, categories, ingredients, garnish, glassType, typeMethod, hasAlcohol, difficulty, method, history, note } = req.body;
    try {

        const coctel = new Coctels({
            name,
            categories: Array.isArray(categories) ? categories : categories.split(','), // Asegúrate de convertir string a array si es necesario
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(','), // Verifica si ingredients es un array, o conviértelo
            garnish: Array.isArray(garnish) ? garnish : garnish.split(','),
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

        res.status(200).json({ message: "coctel creado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getAllCoctels = async (req, res) => {

    const { search, hasAlcohol, difficulty, typeMethod, categories, page = 1, limit = 10 } = req.query;
    console.log(search);
    try {

        const skip = (page - 1) * limit;

        const query = {}
        if (hasAlcohol !== undefined) {
            query.hasAlcohol = hasAlcohol === 'true';  // Convertimos el string a booleano
        }

        if (difficulty) {
            query.difficulty = difficulty;  // Suponemos que difficulty es un string
        }

        if (typeMethod) {
            query.typeMethod = typeMethod;  // Suponemos que typeMethod es un string
        }

        if (categories) {
            query.categories = { $in: categories.split(',') };  // Si llega como un array o separado por comas
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };  // Búsqueda por título insensible a mayúsculas
        }
        
        const coctel = await Coctels.find(query).skip(skip).limit(parseInt(limit));

        res.status(200).json(coctel);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getCoctel = async (req, res) => {
    try {
        const coctel = await Coctels.findById(req.params.id);
        if (!coctel) return res.status(404).json({ message: "hotel no encontrado" })
        res.status(200).json(coctel);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}