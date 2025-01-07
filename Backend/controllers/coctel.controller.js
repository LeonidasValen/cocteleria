import { Cocteles } from "../../Frontend/src/page/FormCoctel/category.js";
import Coctels from "../models/Coctels.js";
import { v2 as cloudinary } from "cloudinary";

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

export const updateCoctel = async (req, res) => {
    const { name, categories, ingredients, garnish, glassType, typeMethod, hasAlcohol, difficulty, method, history, note } = req.body;
    const coctelId = req.params.id;

    const newImg = req.file?.cloudinaryUrl;
    try {
        const coctel = await Coctels.findById(coctelId);
        if (!coctel) return res.status(404).json({ message: "Coctel no encontrado" });

        // Si hay una imagen anterior, eliminarla de Cloudinary
        if (coctel.img && coctel.img.includes("cloudinary")) {
            const oldPublicId = coctel.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`blog/${oldPublicId}`);
        }

        coctel.name = name || coctel.name;
        coctel.categories = Array.isArray(categories) ? categories : categories.split(',') || coctel.categories;
        coctel.ingredients = Array.isArray(ingredients) ? ingredients : ingredients.split(',') || coctel.ingredients;
        coctel.garnish = Array.isArray(garnish) ? garnish : garnish.split(',') || coctel.garnish;
        coctel.glassType = glassType || coctel.glassType;
        coctel.typeMethod = typeMethod || coctel.typeMethod;
        coctel.hasAlcohol = hasAlcohol || coctel.hasAlcohol;
        coctel.difficulty = difficulty || coctel.difficulty;
        coctel.method = method || coctel.method;
        coctel.history = history || coctel.history;
        coctel.note = note || coctel.note;

        await coctel.save();

        res.status(200).json({ message: "Coctel actualizado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el coctel" });
    }
}

export const deleteCoctel = async (req, res) => {
    try {
        const { id } = req.params;
        const coctel = await Cocteles.findById(id);

        if (!coctel) {
            return res.status(404).json({ message: "Coctel no encontrado" });
        }

        await coctel.remove();

        res.status(200).json({ message: "Coctel eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar el coctel" });
    }
}