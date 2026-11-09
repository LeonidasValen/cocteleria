import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream"; // Modificación: Necesario para procesar el buffer de Multer
import {
    CLOUD_API_KEY,
    CLOUD_API_SECRET,
    CLOUD_NAME,
    CLOUDINARY_URL
} from "../src/config.js";

console.log({ CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, CLOUDINARY_URL });

// Configuración de Cloudinary
cloudinary.config(CLOUDINARY_URL);

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
            // Adaptación de la API: Convertimos el buffer en un stream y lo enviamos
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "cocteles" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                // Creamos el stream legible a partir del buffer y lo conectamos a Cloudinary
                Readable.from(req.file.buffer).pipe(uploadStream);
            });

            // Información útil para el controlador
            req.file.cloudinaryUrl = result.secure_url;
            req.file.public_id = result.public_id;

            next();
        } catch (error) {
            console.error("Cloudinary Error:", error);

            return res.status(500).json({
                error: "Error al subir la imagen a Cloudinary.",
            });
        }
    });
};
