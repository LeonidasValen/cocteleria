import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../src/config.js";
import multer from "multer";

// Configuración de Cloudinary con tus credenciales
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

// Configuración de multer para subir a Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cocteles',  // Carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
    },
});

// Middleware de multer para subir una imagen
export const upload = multer({ 
    storage, 
    limits: { files: 1, fileSize: 5 * 1024 * 1024 }, // Limita el tamaño de la imagen a 5MB
}).single("file");

// Middleware para manejar la subida de la imagen
export const uploadImage = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Error específico de Multer (por ejemplo, límite de tamaño de archivo alcanzado)
            console.error("Multer error:", err);
            return res.status(400).json({ error: `Error en la carga del archivo: ${err.message}` });
        } else if (err) {
            // Otro tipo de error (conexión a Cloudinary, etc.)
            console.error("Error general:", err);
            return res.status(500).json({ error: "Error al procesar la imagen. Intenta nuevamente." });
        }

        try {
            // Si la imagen se sube correctamente, continuamos con la carga a Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            req.file.cloudinaryUrl = cloudinaryResponse.secure_url;
            next();
        } catch (cloudinaryErr) {
            // Error en la conexión o en la carga a Cloudinary
            console.error("Error al subir a Cloudinary:", cloudinaryErr);
            return res.status(500).json({ error: "Error al conectar con Cloudinary. Intenta nuevamente." });
        }
    });
};
