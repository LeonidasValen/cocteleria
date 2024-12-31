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

    const { search, hasAlcohol, difficulty, typeMethod, categories, page = 1, limit = 12 } = req.query;

    // Validar y convertir page y limit a enteros
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    try {
        const skip = (pageNum - 1) * limitNum;

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
            // Si 'categories' es un string, lo convertimos a un array usando split
            const categoryArray = Array.isArray(categories) ? categories : categories.split(',');
            query.categories = { $in: categoryArray };  // Filtrar por categorías
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };  // Búsqueda por título insensible a mayúsculas
        }

        // Obtener los cocteles con paginación
        const cocteles = await Coctels.find(query).skip(skip).limit(limitNum);

        // Obtener el número total de cocteles para la paginación
        const totalCoctels = await Coctels.countDocuments(query);

        const totalPages = Math.ceil(totalCoctels / limitNum);

        res.status(200).json(
            {
                cocteles,
                totalPages
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getCoctel = async (req, res) => {
    try {
        const coctel = await Coctels.findById(req.params.id);
        if (!coctel) return res.status(404).json({ message: "Coctel no encontrado" })
        res.status(200).json(coctel);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}