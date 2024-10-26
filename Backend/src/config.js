import dotenv from "dotenv";

dotenv.config();

export const FRONTED_URL = process.env.FRONTED_URL;
export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME; 
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY; 
export const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET; 
