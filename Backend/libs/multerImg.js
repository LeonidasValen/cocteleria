import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Asegúrate de importar esto
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
export const upload = multer({ storage, limits: { files: 1 } }).single("file");
