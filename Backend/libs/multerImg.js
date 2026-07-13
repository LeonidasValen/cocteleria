import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import {
    CLOUD_API_KEY,
    CLOUD_API_SECRET,
    CLOUD_NAME,
} from "../src/config.js";

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

// Configuración de Multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes JPG, JPEG, PNG o WEBP."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024, // 5MB
    },
}).single("file");

export const uploadImage = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                error: `Error al subir el archivo: ${err.message}`,
            });
        }

        if (err) {
            return res.status(400).json({
                error: err.message,
            });
        }

        // Si no enviaron imagen continúa normalmente
        if (!req.file) {
            return next();
        }

        try {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "cocteles",
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                stream.end(req.file.buffer);
            });

            // Información útil para el controlador
            req.file.cloudinaryUrl = result.secure_url;
            req.file.public_id = result.public_id;

            next();
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Error al subir la imagen a Cloudinary.",
            });
        }
    });
};